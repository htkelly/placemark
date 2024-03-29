import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(categoryId, place) {
    await db.read();
    place._id = v4();
    place.categoryId = categoryId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCategoryId(id) {
    await db.read();
    return db.data.places.filter((place) => place.categoryId === id);
  },

  async getPlaceById(id) {
    await db.read();
    return db.data.places.find((place) => place._id === id);
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.description = updatedPlace.description;
    place.location.latitude = updatedPlace.location.latitude;
    place.location.longitude = updatedPlace.location.longitude;
    await db.write();
  },
};
