import { db } from "../models/db.js";

export async function analytics() {
  const users = await db.userStore.getAllUsers();
  const categories = await db.categoryStore.getAllCategories();
  const places = await db.placeStore.getAllPlaces();
  return {
    userCount: users.length,
    categoryCount: categories.length,
    placeCount: places.length,
  };
}
