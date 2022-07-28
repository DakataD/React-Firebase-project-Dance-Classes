import React from "react";

import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import {useNavigate} from "react-router-dom";


const Register = ({setIsAuth}) => {

    let navigate = useNavigate();

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;

        createUserWithEmailAndPassword(auth, username, password,email)
            .then(userCredential => {
                 localStorage.setItem("isAuth" , true)
                setIsAuth(true);
                navigate("/");
            });
    }
    
    return (
        <section className="register">
            <form onSubmit={onRegisterSubmitHandler}>
                <fieldset>
                
                    <legend>Register</legend>

                    <p className="field">
                        <label htmlFor="username">Username</label>
                        <span className="input">
                            <input type="text" name="username" id="username" placeholder="Username" />
                            <span className="actions"></span>
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                            <span className="actions"></span>
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                    
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" autoComplete="on" placeholder="Password" />
                            <span className="actions"></span>
                            <i className="fas fa-key"></i>
                        </span>
                    </p>
                    <input className="button submit" type="submit"  value="Register" />
                </fieldset>
            </form>
        </section>
    );
}

export default Register;