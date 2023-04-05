import styles from "./Details.module.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { motion } from "framer-motion";

const Details = ({ user }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  
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
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "comments", id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
      <motion.div
      className="backround"
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
              <img
                src={post.imageUrl}
                alt={post.title}
                className={styles.detailsImage}
              />
            )}
            <p>Posted by: {post.email}</p>
            {user && post.email === user.email && (
              <div>
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
