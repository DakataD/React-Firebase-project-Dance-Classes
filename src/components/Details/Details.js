import styles from "./Details.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, deleteDoc, updateDoc, arrayUnion, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { motion } from "framer-motion";

const Details = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [interestedUsers, setInterestedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const postDoc = doc(db, "comments", id);
      const postSnapshot = await getDoc(postDoc);
      if (postSnapshot && postSnapshot.exists()) {
        setPost(postSnapshot.data());
        setInterestedUsers(postSnapshot.data().interested || []);
      } else {
        console.log("No such document!");
      }
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "comments", id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleInterest = async () => {
    try {
      const postDoc = doc(db, "comments", id);
      const interestedArray = arrayUnion(user.email);
      await Promise.all([
        updateDoc(postDoc, { interested: interestedArray }),
        setInterestedUsers((prevState) => [...prevState, user.email]),
        // Add the interested field to the interested collection
        addDoc(collection(db, "interested"), {
          postId: id,
          interested: interestedArray,
        }),
      ]);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const isInterested = interestedUsers.includes(user.email);

  return (
    <motion.div
      className={styles.background}
      initial={{ rotateX: 90, rotateY: -90, scale: 0 }}
      animate={{ rotateX: 0, rotateY: 0, scale: 1 }}
      exit={{ rotateX: -90, rotateY: 90, scale: 0, transition: { duration: 0.15 } }}
    >
      <div className={styles.detailWrapper}>
        <div className={styles.imageWrapper}>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className={styles.detailsImage} />
          )}
        </div>
        <div className={styles.textWrapper}>
          <h1>{post.title}</h1>
          <p>Class Schedule: {post.time}</p>
          <p>Dance Teacher: {post.teacher}</p>
          <p>Info: {post.info}</p>
          <p>Posted by: {post.email}</p>
          {user && post.email !== user.email && (
            <div className={styles.buttons}>
              {!isInterested && (
                <button 
                className={styles.interestButton}
                onClick={handleInterest}>
                  Have interest 
                </button>
              )}
              {isInterested && <p className={styles.interestetText}>You and {interestedUsers.length} more people are interested!</p>}
            </div>
          )}
          {user && post.email === user.email && (
            <div className={styles.buttons}>
              <button onClick={handleDelete}>Delete</button>
              <Link to={`/${id}/edit`} className={styles.editButton}>
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Details;
