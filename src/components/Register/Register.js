import React, { useState } from "react";
import styles from "./Register.module.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";


const Register = ({ setIsAuth }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    // validate password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // validate repeat password
    if (!repeatPassword) {
      newErrors.repeatPassword = "Repeat password is required.";
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = "Repeat password must match password.";
    }

    // update errors state
    setErrors(newErrors);

    // if there are no errors, create the user
    if (Object.keys(newErrors).length === 0) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          localStorage.setItem("isAuth", true)
          setIsAuth(true);
          navigate("/");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrors({ email: 'This email is already in use.' });
          }
        });
    }
  }

  return (
    <motion.div
     className={styles.background}
     >
      <form onSubmit={onRegisterSubmitHandler}
      className={styles.login_form}>
        <p>Register</p>
        <input type="email" name="email" id="email" placeholder="email" />
        {errors.email && <span className="error">{errors.email}</span>}
        <input type="password" name="password" id="password" autoComplete="on" placeholder="Password" />
        {errors.password && <span className="error">{errors.password}</span>}
        <input type="password" name="repeatPassword" id="repeatPassword" autoComplete="on" placeholder="Repeat Password" />
        {errors.repeatPassword && <span className="error">{errors.repeatPassword}</span>}
        <input className="submitButton" type="submit" value="Register" />
      </form>
    </motion.div>
  );
}

export default Register;
