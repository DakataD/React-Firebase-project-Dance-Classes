import styles from "./Catalog.module.css"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { v4 } from "uuid";



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
    return(
        <div className={styles.catalog_bg}>
        <div className={styles.container}>
        <div className={styles.card_wrapper}>
            {danceList.map((post) => {
                return (
                    <div className={styles.card} key={v4 + post.id}>
                        <h1>{post.title}</h1>
                        {post && post.id && post.email === currentUserId && isAuth&&
                        (<button onClick={() => {
                            deleteComment(post.id)
                            setRefresh(false)
                        }}>Delete</button>)
                    }
                     <img src={post.imageUrl} alt="dance" />
                     <p>{post.name}</p>
                        <p>{post.comments}</p>                     
                        <p>{post.email}</p>
                        <Link to="/edit">Edit</Link>
                    </div>

                    
                )
            })}
        </div>
        </div>
        </div>
    );
}

export default Catalog;