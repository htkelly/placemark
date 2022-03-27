import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_authDomain,
  databaseURL: process.env.firebase_databaseURL,
  projectId: "placemark-86120",
  storageBucket: process.env.firebase_storageBucket,
  messagingSenderId: process.env.firebase_messagingSenderId,
  appId: process.env.firebase_appId,
  measurementId: process.env.firebase_measurementId,
});

export const firebaseDb = getDatabase(app);
