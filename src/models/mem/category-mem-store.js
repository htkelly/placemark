import { v4 } from "uuid";
import { placeMemStore } from "./place-mem-store.js";

let categories = [];

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategory(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id) {
    const cat = categories.find((category) => category._id === id);
    if (cat) {
      cat.places = await placeMemStore.getPlacesByCategoryId(cat._id);
      return cat;
    }
    return null;
  },

  async getUserCategories(userid) {
    return categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    const index = categories.findIndex((category) => category._id === id);
    if (index !== -1) categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },
};
