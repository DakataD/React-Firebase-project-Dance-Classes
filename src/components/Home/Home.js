import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getDocs,collection,deleteDoc,doc } from "firebase/firestore"
import { db } from "../../firebase/firebase-config"

const Home = (isAuth) => {
   const [refresh,setRefresh] = useState(false)
    const [commentList, setCommentList] = useState([]);
    const postCollectionRef = collection(db, "comments");    

    useEffect(() => {
            const getComments = async () => {
                const data = await getDocs(postCollectionRef);
                setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

            };
            getComments();


    },[refresh])

        const deleteComment = async (id) => {    
            const commentDoc=doc(db,"comments", id)
            await deleteDoc(commentDoc);
            setRefresh(true)
        }
    	
    return(
        <div>
            <p>Home</p>
            {commentList.map((comment) => {
                console.log(comment)
                return (
                    <div key={comment.comments + comment.title}>
                        <h1>{comment.title}</h1>
                        {isAuth &&
                        (<button onClick={() => {
                            deleteComment(comment.id)
                            setRefresh(false)
                        }}>Delete</button>)
                    }
                        <p>{comment.comments}</p>
                        <p>{comment.name}</p>
                        <img src={comment.imageUrl} alt="shoe" />
                    </div>

                    
                )
            })}
        </div>
    );
}

export default Home;