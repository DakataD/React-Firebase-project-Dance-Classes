import styles from "./Catalog.module.css"
import React from "react";
import { useEffect,useContext } from "react";
import { useState } from "react";
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { v4 } from "uuid";
import { BackgroundContext } from "../../contexts/BackgroundContext";
import Layout from "./../Layout/Layout";
import {motion} from "framer-motion";


const Catalog = (isAuth) => {
  const [refresh,setRefresh] = useState(false)
  const [danceList, setDanceList] = useState([]);
  const { setBackgroundImage } = useContext(BackgroundContext);
  const postCollectionRef = collection(db, "comments");

  useEffect(() => {
    setBackgroundImage("https://images.pexels.com/photos/7974876/pexels-photo-7974876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  }, [setBackgroundImage]);

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
    <Layout>
      <motion.div
        className={styles.container}
        initial={{width: 0}}
        animate={{width: window.innerWidth}}
        exit={{y: window.innerWidth, transition: {duration: 0.5}}}
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
                <img src={post.imageURL} alt="dance" />
                <p>{post.name}</p>
                <p>{post.comments}</p>                     
                <p>{post.email}</p>
                <Link to="/edit">Edit</Link>
              </div>
            )
          })}
        </div>
      </motion.div>
    </Layout>
  );
}

export default Catalog;
