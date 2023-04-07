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
  const [time, setTime] = useState("");
  const [teacher, setTeacher] = useState("");
  const [info, setInfo] = useState("");
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

    if (!info) {
      newErrors.info = "Info is required.";
    }

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      setErrors(newErrors);
      return false;
    }
  };

  const createDanceClass = async () => {
    if (!validateForm()) {
      return;
    }
  
    const imageUrl = await uploadImage();
  
    await addDoc(postCollectionRef, {
      title,
      info,
      imageUrl,
      teacher,
      time,
      email: auth.currentUser.email,
      personId: auth.currentUser.uid,
    });
  
    navigate("/catalog");
  };
  
  const uploadImage = () => {
    if (imageUpload == null) return Promise.resolve("");
  
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  
    return uploadBytes(imageRef, imageUpload)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        setImageUrl(url);
        return url;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <motion.div
    className={styles.background}
    initial={{rotateX: 90, rotateY: -90, scale: 0}}
          animate={{rotateX: 0, rotateY: 0, scale: 1 }}
          exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.15}}}
    > 
    <div className={styles.wrapper}>
      <h1>Create post</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.createForm}>
          <label htmlFor="title">Class Name:</label>
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
          <label htmlFor="info">More Info:</label>
          <textarea
            id="info"
            name="info"
            placeholder="Enter info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          {errors.info && <span className={styles.error}>{errors.info}</span>}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="schedule">Class Schedule:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            placeholder="Enter schedule"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="teacher">Dance Teacher:</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            placeholder="Enter Teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
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
        </div>
</motion.div>
);
};

export default Create;