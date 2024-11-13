// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
  authDomain: "foodplaza-1bc0f.firebaseapp.com",
  projectId: "foodplaza-1bc0f",
  storageBucket: "foodplaza-1bc0f.firebasestorage.app",
  messagingSenderId: "720736610072",
  appId: "1:720736610072:web:68e4e427e1f48ef9c1606d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
