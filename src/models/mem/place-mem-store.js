import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(categoryId, place) {
    place._id = v4();
    place.categoryId = categoryId;
    places.push(place);
    return place;
  },

  async getPlacesByCategoryId(id) {
    return places.filter((place) => place.categoryId === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getCategoryPlaces(categoryId) {
    return places.filter((place) => place.categoryId === categoryId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.description = updatedPlace.description;
    place.location.latitude = updatedPlace.location.latitude;
    place.location.longitude = updatedPlace.location.longitude;
  },
};
