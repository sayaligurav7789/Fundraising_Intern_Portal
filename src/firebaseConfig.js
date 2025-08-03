// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp0jZVJsZjgTEs0UY9AltVsV4FzeWasmI",
  authDomain: "intern-portal-ae603.firebaseapp.com",
  projectId: "intern-portal-ae603",
  storageBucket: "intern-portal-ae603.firebasestorage.app",
  messagingSenderId: "57332269973",
  appId: "1:57332269973:web:27bc65b4da811f61ccec9c",
  measurementId: "G-XC85RZ6C1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);