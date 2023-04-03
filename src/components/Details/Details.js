import styles from "./Details.module.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { BackgroundContext } from "../../contexts/BackgroundContext";
import Layout from "./../Layout/Layout";
import { motion } from "framer-motion";

const Details = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { setBackgroundImage } = useContext(BackgroundContext);

  useEffect(() => {
    setBackgroundImage("");
    const getPost = async () => {
        const postDoc = doc(db, "comments", id);
        const postSnapshot = await getDoc(postDoc);
        if (postSnapshot && postSnapshot.exists()) {
          setPost(postSnapshot.data());
        } else {
          console.log("No such document!");
        }
      };
    getPost();
  }, [id, setBackgroundImage]);

  return (
    <Layout>
      <motion.div
        initial={{rotateX: 90, rotateY: -90, scale: 0}}
        animate={{rotateX: 0, rotateY: 0, scale: 1 }}
        exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.4}}}
      >
        <div className={styles.container}>
          <div className={styles.post}>
            <h1>{post.title}</h1>
            <p>Class Schedule: {post.time}</p>
            <p>Dance Teacher: {post.teacher}</p>
            <p>Info: {post.info}</p>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className={styles.image} />
            )}
            <p>Posted by: {post.email}</p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Details;
