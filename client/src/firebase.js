// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "christmas-card-545ce.firebaseapp.com",
  projectId: "christmas-card-545ce",
  storageBucket: "christmas-card-545ce.appspot.com",
  messagingSenderId: "407401825436",
  appId: "1:407401825436:web:dfcc95bec2e53378511959",
  measurementId: "G-DTSVKPYTZX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
