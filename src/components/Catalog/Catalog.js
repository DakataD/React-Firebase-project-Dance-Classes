import styles from "./Catalog.module.css"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { v4 } from "uuid";
import {motion} from "framer-motion";



const Catalog = (isAuth) => {
  const [refresh,setRefresh] = useState(false)
  const [danceList, setDanceList] = useState([]);
  const postCollectionRef = collection(db, "comments");



  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(postCollectionRef);
      setDanceList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };
    getComments();
  },[refresh])

  const deleteComment = async (id) => {    
    const commentDoc=doc(db,"comments", id)
    await deleteDoc(commentDoc);
    setRefresh(true)
  }
    	
  const currentUserId = 'asdsadsad@abv.bg'

  return (

      <motion.div
        className={styles.background}
        initial={{rotateX: 90, rotateY: -90, scale: 0}}
          animate={{rotateX: 0, rotateY: 0, scale: 1 }}
          exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.15}}}
      >
        <div className={styles.card_wrapper}>
          {danceList.map((post) => {
            return (
              <div className={styles.card} key={v4() + post.id}>
                <h1>{post.title}</h1>
                {post && post.id && post.email === currentUserId && isAuth &&
                  <button onClick={() => {
                    deleteComment(post.id)
                    setRefresh(false)
                  }}>Delete</button>
                }
                <img src={post.imageUrl} alt="dance" />
                <p>{post.name}</p>
                <p>Teacher: {post.teacher}</p>                     
                <p>{post.time}</p>
                <Link className={styles.detailsBtn} to={`/${post.id}/details`}>Details</Link>
              </div>
            )
          })}
        </div>
      </motion.div>
  );
}

export default Catalog;
