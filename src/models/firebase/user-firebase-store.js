import { v4 } from "uuid";
import { push, ref, set, child, get } from "firebase/database";
import { firebaseDb } from "./connect.js";

await set(ref(firebaseDb, "users/"), []);

export const userFirebaseStore = {
  async addUser(user) {
    await push(ref(firebaseDb, "users/"), {
      _id: v4(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      scope: ["user"],
    });
  },
};
