// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f2672.firebaseapp.com",
  projectId: "mern-auth-f2672",
  storageBucket: "mern-auth-f2672.appspot.com",
  messagingSenderId: "544607890387",
  appId: "1:544607890387:web:bdb981bf71f48d5e9edd26",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


