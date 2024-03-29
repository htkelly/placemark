import { Place } from "./place.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async addPlace(categoryId, place) {
    place.categoryid = categoryId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByCategoryId(id) {
    const places = await Place.find({ categoryid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(updatedPlace) {
    const place = await Place.findOne({ _id: updatedPlace._id });
    place.name = updatedPlace.name;
    place.description = updatedPlace.description;
    place.img = updatedPlace.img;
    place.location.latitude = updatedPlace.location.latitude;
    place.location.longitude = updatedPlace.location.longitude;
    await place.save();
    return Place.findOne({ _id: updatedPlace._id });
  },
};
