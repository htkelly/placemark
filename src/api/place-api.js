import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaceSpec, PlaceSpecPlus, PlaceArraySpec, PlaceResponseSpec, PlaceResponseArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import {weatherService} from "../services/weather-service.js";

export const placeApi = {
  find: {
    auth: {
      strategy: "jwt",
      scope: "user",
    },
    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        for (const place of places) {
          const weatherDetails = await weatherService.weatherRequest(place.location.latitude, place.location.longitude);
          place.weatherDescription = weatherDetails.description;
          place.temperature = weatherDetails.temperature;
        }
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceResponseArraySpec, failAction: validationError },
    description: "Get all places",
    notes: "Returns all places",
  },

  findOne: {
    auth: {
      strategy: "jwt",
      scope: "user",
    },
    async handler(request) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No place with this id");
        }
        const weatherDetails = await weatherService.weatherRequest(place.location.latitude, place.location.longitude);
        place.weatherDescription = weatherDetails.description;
        place.temperature = weatherDetails.temperature;
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No place with this id");
      }
    },
    tags: ["api"],
    description: "Find place",
    notes: "Returns one place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceResponseSpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
      scope: "user",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.addPlace(request.params.id, request.payload);
        if (place) {
          return h.response(place).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a place",
    notes: "Returns newly created place",
    validate: { params: { id: IdSpec }, payload: PlaceSpec },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
      scope: "user",
    },
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all places",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
      scope: "user",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlace(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
  },
  tags: ["api"],
  description: "Delete a place",
  validate: { params: { id: IdSpec }, failAction: validationError },
};
