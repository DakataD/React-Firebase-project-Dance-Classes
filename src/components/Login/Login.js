import React from "react";
import { auth, provider } from "../../firebase/firebase-config";
import { signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Login = ({ setIsAuth  }) => {

    let navigate = useNavigate();

    const signInWhitGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth" , true)
            setIsAuth(true);
            navigate("/");
        })
    };

    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                console.log(userCredential)
                localStorage.setItem("isAuth" , true)
                setIsAuth(true);
                navigate("/")
            });
    };
    return(     
        <section className="login">
            <form onSubmit={onLoginFormSubmitHandler}>
                <fieldset>
                    <legend>Login</legend>
                    <p className="field">
                        <label htmlFor="username">Username</label>
                        <span className="input">
                            <input type="text" name="username" id="username" placeholder="Username" />
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
                    <input  type="submit" className="submit button" value="Login" />
                    
                </fieldset>
            </form>
            <button className="login-whit-google-btn" onClick={signInWhitGoogle}>Sign in whit Google</button>
        </section>
    );
}

export default Login;