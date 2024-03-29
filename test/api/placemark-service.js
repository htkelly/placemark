import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },
  async createCategory(category) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.placemarkUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.placemarkUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.placemarkUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/places/${id}`);
    return res.data;
  },
};
