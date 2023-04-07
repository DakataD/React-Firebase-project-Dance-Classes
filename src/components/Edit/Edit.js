import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { motion } from "framer-motion";

const Edit = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [teacher, setTeacher] = useState("");
  const [info, setInfo] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadPost = async () => {
      const postDocRef = doc(db, "comments", id);
      const postDocSnap = await getDoc(postDocRef);

      if (!postDocSnap.exists()) {
        navigate("/404");
        return;
      }

      const post = postDocSnap.data();
      setTitle(post.title);
      setTime(post.time);
      setTeacher(post.teacher);
      setInfo(post.info);
      setImageUrl(post.imageUrl);
    };

    loadPost();
  }, [id, navigate]);

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

  const updateDanceClass = async () => {
    if (!validateForm()) {
      return;
    }

    let newImageUrl = imageUrl;
    if (imageUpload) {
      newImageUrl = await uploadImage();
    }

    const postDocRef = doc(db, "comments", id);
    await updateDoc(postDocRef, {
      title,
      info,
      imageUrl: newImageUrl,
      teacher,
      time,
    });

    navigate(`/catalog`);
  };

  const uploadImage = () => {
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

  return (
    <motion.div
    className={styles.background}
    initial={{rotateX: 90, rotateY: -90, scale: 0}}
    animate={{rotateX: 0, rotateY: 0, scale: 1 }}
    exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.15}}}
    >
       <div className={styles.wrapper}>
      <h1>Edit post</h1>
      <form onSubmit={(e) => e.preventDefault()}>
       
    <div>
      <label htmlFor="title">Class Name:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className={styles.formControl}>
      <label htmlFor="time">Class Time:</label>
      <input
        type="text"
        id="time"
        name="time"
        placeholder="Enter time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
    <div className={styles.formControl}>
      <label htmlFor="teacher">Class Teacher:</label>
      <input
        type="text"
        id="teacher"
        name="teacher"
        placeholder="Enter teacher"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
      />
    </div>
    <div className={styles.formControl}>
      <label htmlFor="info">Class Info:</label>
      <textarea
        id="info"
        name="info"
        placeholder="Enter info"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
      {errors.info && <p className={styles.error}>{errors.info}</p>}
    </div>
    <div className={styles.formControl}>
      <label htmlFor="image">Class Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={(e) => setImageUpload(e.target.files[0])}
      />
     
    </div>
    <button className={styles.button} onClick={updateDanceClass}>
      Update
    </button>
  </form>
  </div>
</motion.div>
);
};

export default Edit;