import { db } from "../models/db.js";
import { PlaceFormInputSpec, PlaceSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: category.name,
        category: category,
        user: loggedInUser,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceFormInputSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const currentCategory = await db.categoryStore.getCategoryById(request.params.id);
        return h.view("category-view", { title: "Add place error", category: currentCategory, user: loggedInUser, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlace = {
        name: request.payload.name,
        description: request.payload.description,
        location: { latitude: Number(request.payload.latitude), longitude: Number(request.payload.longitude) },
      };
      await db.placeStore.addPlace(category._id, newPlace);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const place = await db.placeStore.getPlaceById(request.params.placeid);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          place.img = url;
          await db.placeStore.updatePlace(place);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${category._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
