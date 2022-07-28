// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUuZkHhfTRiiNb8jh8btZ9_9bGV7RR6CU",
  authDomain: "softuni-project-50db8.firebaseapp.com",
  projectId: "softuni-project-50db8",
  storageBucket: "softuni-project-50db8.appspot.com",
  messagingSenderId: "605160933732",
  appId: "1:605160933732:web:d99bb28c77454050919271",
  measurementId: "G-JVG3JCQJJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

