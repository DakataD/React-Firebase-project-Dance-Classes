import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Create = ({isAuth}) => {

    const [title, setTitle] = useState("");
    const [comments, setComment] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const onCreatePetSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e)
        const { title, comments, imageUrl } = e.target;
    }


    const postCollectionRef = collection(db, "comments");
    let navigate = useNavigate()

        const createThink = async () => {
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
            if(!isAuth){
                navigate("/");
            }
        },[])

    return(<>
        <div>
            <h1>Create things</h1>
            {/* replace whit form */}
            <label>Title:</label>
            <input placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}}/>
            <label>Comments:</label>
            <textarea placeholder="Text...." onChange={(e) => {setComment(e.target.value)}}></textarea>
            <input type="text" name="imageURL" id="image" placeholder="Image" onChange={(e) => {setImageUrl(e.target.value)}} />
            <button onClick={createThink}>submit post</button>
        </div>
        <section className="create">
            <form onSubmit={onCreatePetSubmitHandler}>
                <fieldset>
                    <legend>Add new Pet</legend>
                    <p className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input">
                            <input type="text" name="name" id="name" placeholder="Name" />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea rows="4" cols="45" type="text" name="description" id="description"
                                placeholder="Description"></textarea>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input type="text" name="imageURL" id="image" placeholder="Image" />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="category">Category</label>
                        <span className="input">
                            <select type="text" name="category">
                                <option value="Cat">Cat</option>
                                <option value="Dog">Dog</option>
                                <option value="Parrot">Parrot</option>
                                <option value="Reptile">Reptile</option>
                                <option value="Other">Other</option>
                            </select>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Add Pet" />
                </fieldset>
            </form>
        </section>
        </>
    );
}

export default Create;