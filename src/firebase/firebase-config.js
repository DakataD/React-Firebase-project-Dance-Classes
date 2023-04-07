// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getAuth,
  createUserWithEmailAndPassword,
    signOut,
  signInWithEmailAndPassword, } from "firebase/auth";

  import {
    getFirestore,
    collection,
    addDoc,
  } from "firebase/firestore";

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
 const storage = getStorage(app)

 const db = getFirestore(app);
 const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    let errMessage = err.message;
    let errCode = err.code;

    console.log("err message" + errMessage);
    console.log("err code" + errCode);

    if (errCode == "auth/wrong-password") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/user-not-found") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/network-request-failed") {
      errMessage =
        "Error connecting to the server. Please check your network connection and try again.";
    }

    return errMessage;
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    let errMessage = err.message;
    let errCode = err.code;

    if (errCode == "auth/email-already-in-use") {
      errMessage = "The email already exist.";
    } else if (errCode == "auth/user-not-found") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/network-request-failed") {
      errMessage =
        "Error connecting to the server. Please check your network connection and try again.";
    }

    return errMessage;
  }
};

const logout = () => {
  signOut(auth);
};


















export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  storage,
};