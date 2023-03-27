import React from "react";
import styles from "./Register.module.scss"
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import {useNavigate} from "react-router-dom";


const Register = ({setIsAuth}) => {

    let navigate = useNavigate();

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                 localStorage.setItem("isAuth" , true)
                setIsAuth(true);
                console.log(auth, password,email)
                navigate("/");
            });
    }
    
    return (
        <div className={styles.container}>
            <form onSubmit={onRegisterSubmitHandler}>
            <p>Register</p>                                                                 
                <input type="email" name="email" id="email" placeholder="email" />                    
                 <input type="password" name="password" id="password" autoComplete="on" placeholder="Password" />        
                <input className="button submit" type="submit"  value="Register" />                
            </form>
        </div>
    );
}

export default Register;