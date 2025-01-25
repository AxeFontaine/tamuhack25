// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: "tamuhack25-d1f72.firebaseapp.com",
  projectId: "tamuhack25-d1f72",
  storageBucket: "tamuhack25-d1f72.firebasestorage.app",
  messagingSenderId: "166745261479",
  appId: "1:166745261479:web:68da5a33eeb203947a2282",
  measurementId: "G-0WYM50KK1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };