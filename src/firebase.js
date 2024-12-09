// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-

const apiKey = process.env.REACT_APP_FIREBASE_APIKEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "foodplaza-c7922.firebaseapp.com",
  projectId: "foodplaza-c7922",
  storageBucket: "foodplaza-c7922.firebasestorage.app",
  messagingSenderId: "26168922645",
  appId: "1:26168922645:web:24f731cf4b329326caf41c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutFromGoogle = () => signOut(auth);
