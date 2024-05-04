// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ab33c.firebaseapp.com",
  projectId: "mern-estate-ab33c",
  storageBucket: "mern-estate-ab33c.appspot.com",
  messagingSenderId: "650630520591",
  appId: "1:650630520591:web:19b989cc413e7e5344a87a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);