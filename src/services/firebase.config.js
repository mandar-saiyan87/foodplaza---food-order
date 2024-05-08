// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW-e5VeqssOtjG7h8NXwPAqYggZDGs37M",
  authDomain: "foodplaza-4f4b7.firebaseapp.com",
  projectId: "foodplaza-4f4b7",
  storageBucket: "foodplaza-4f4b7.appspot.com",
  messagingSenderId: "391542024560",
  appId: "1:391542024560:web:81350614281f69a7f2c7b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)