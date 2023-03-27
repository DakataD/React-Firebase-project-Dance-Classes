// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword, } from "firebase/auth";

  import {
    getFirestore,
    query,
    getDocs,
    deleteDoc,
    getDoc,
    doc,
    collection,
    where,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
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

const createSalonInDB = async (salon) => {
  try {
    console.log("INSIDE CREATE SALON");
    await addDoc(collection(db, "salons"), salon);
    console.log("inside create salon");
  } catch (err) {
    console.log("CATCHING ERR");
    console.log(err);
    let errMessage = err.message;
    let errCode = err.code;

    if (errCode == "auth/network-request-failed") {
      errMessage =
        "Error connecting to the server. Please check your network connection and try again.";
    }
    return errMessage;
  }
};

const uploadFiles = (files) => {
  const imageIds = [];

  for (let i = 0; i < files.length; i++) {
    let currId = uuidv4();
    const storageRef = ref(storage, `salonsImages/${currId}`);
    uploadBytes(storageRef, files[i]);
    imageIds.push(currId);
  }
  return imageIds;
};

const getImageUrls = (imageIds) => {
  const urlPromises = imageIds.map((id) =>
    getDownloadURL(ref(storage, `salonsImages/${id}`))
  );
  return Promise.all(urlPromises);
};
const getAllSalons = async () => {
  return await getDocs(collection(db, "salons"));
};

const getOneSalon = async (salonId) => {
  const docRef = doc(db, "salons", salonId);
  const res = await getDoc(docRef);

  if (res.exists()) {
    return res.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const editSalonInDB = async (salonId, salonData) => {
  const docRef = doc(db, "salons", salonId);
  const res = await getDoc(docRef);

  if (res.exists()) {
    await updateDoc(docRef, salonData);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const addNewServiceInDB = async (salonId, service) => {
  const docRef = doc(db, "salons", salonId);
  await updateDoc(docRef, {
    services: arrayUnion(service),
  });
};

const deleteServiceInDB = async (salonId, service) => {
  const docRef = doc(db, "salons", salonId);

  await updateDoc(docRef, {
    services: arrayRemove(service),
  });
};

const createBookingInDB = async (booking) => {
  try {
    console.log(db);
    await addDoc(collection(db, "bookings"), booking);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getSalonBookings = async (salonId, service) => {
  const salonBookinfRef = collection(db, "bookings");

  const q = query(
    salonBookinfRef,
    where("salonId", "==", salonId),
    where("service", "==", service.service)
  );
  const salonBookings = await getDocs(q);
  const result = [];
  salonBookings.forEach((doc) => {
    result.push(doc.data());
  });
  return result;
};

const deleteSalon = async (salonId) => {
  try {
    await deleteDoc(doc(db, "salons", salonId));
  } catch (err) {
    console.log(err);
    return "Failed to delete salon.";
  }
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  createSalonInDB,
  storage,
  uploadFiles,
  getAllSalons,
  getImageUrls,
  getOneSalon,
  editSalonInDB,
  addNewServiceInDB,
  deleteServiceInDB,
  createBookingInDB,
  getSalonBookings,
  deleteSalon,
};