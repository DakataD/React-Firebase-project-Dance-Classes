import React from "react";
import styles from "./Create.module.css"
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid";

const Create = ({user}) => {

    const [title, setTitle] = useState("");
    const [comments, setComment] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUpload, setImageUpload] = useState(null);

    const postCollectionRef = collection(db, "comments");
    let navigate = useNavigate();

    const uploadImage = () => {
        if (imageUpload ==  null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then (() => {
            alert('image has send')
        })
    };

        const createDanceClass = async () => {
            await addDoc(postCollectionRef, {
                title,
                comments,
                imageUrl,
                email: auth.currentUser.email,
                 personId :auth.currentUser.uid
            });
            navigate("/");
        }
    
        useEffect(() => {
            if(!user){
                navigate("/");
                
            }else {
                
            }
        })

    return(
        <div>
            <h1>Create things</h1>
            {/* replace whit form */}
            <label>Title:</label>
            <input placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}}/>
            <label>Comments:</label>
            <textarea placeholder="Text...." onChange={(e) => {setComment(e.target.value)}}></textarea>
            <input type="text" name="imageURL" id="image" placeholder="Image" onChange={(e) => {setImageUrl(e.target.value)}} />
            <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}}/>
            <button onClick={() => { createDanceClass(); uploadImage();}}>submit post</button>
           
        </div>     
    );
}

export default Create;