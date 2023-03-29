import React from "react";
import styles from "./Create.module.css";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { motion } from "framer-motion";

const Create = ({ user }) => {
  const [title, setTitle] = useState("");
  const [comments, setComment] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  

  const postCollectionRef = collection(db, "comments");

  const validateForm = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required.";
    }

    if (!comments) {
      newErrors.comments = "Comments are required.";
    }

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      setErrors(newErrors);
      return false;
    }
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => setImageUrl(url));
    });
  };

  const createDanceClass = async () => {
    if (!validateForm()) {
      return;
    }

    await uploadImage();

    if (imageUpload) {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      }

    await addDoc(postCollectionRef, {
      title,
      comments,
      imageUrl,
      email: auth.currentUser.email,
      personId: auth.currentUser.uid,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <motion.div
      initial={{ width: 0, scale: 0 }}
      animate={{ width: window.innerWidth, scale: 1 }}
      exit={{ y: window.innerHeight, transition: { duration: 0.3 }, scale: 0 }}
    >
      <h1>Create post</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formControl}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Enter comments"
            value={comments}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {errors.comments && <span className={styles.error}>{errors.comments}</span>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="imageUpload">Image:</label>
          <input
          
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
          />
        </div>
        <button onClick={() => createDanceClass()}>Submit</button>
        </form>
</motion.div>
);
};

export default Create;