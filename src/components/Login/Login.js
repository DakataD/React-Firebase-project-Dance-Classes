import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";
import {motion} from "framer-motion";

const Login = () => {
  const { userLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setErr((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          const pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
          if (!value) {
            stateObj[name] = "Please enter your Email.";
          } else {
            const result = pattern.test(value);
            if (result === false) {
              stateObj[name] = "Invalid Email";
            } else {
              stateObj[name] = "";
            }
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter your Password.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();

    let valid = true;
    Object.values(err).forEach((e) => {
      if (e.length !== 0) {
        valid = false;
      }
    });
    if (!valid) {
      return;
    } else {
      userLogin(input.email, input.password).catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("Wrong password. Please try again.");
        }
      });
    }
  };


  return (
    <motion.div 
    className={styles.container}
    >

      <form onSubmit={login}>
        <p>Welcome</p>
        <input
          required
          id="emails"
          type="text"
          name="email"
          className={styles["login__textBox"]}
          value={input.email}
          placeholder="E-mail Address"
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {err.email && <span className={styles.err}>{err.email}</span>}

        <input
          required
          id="password"
          type="password"
          name="password"
          className={styles["login__textBox"]}
          value={input.password}
          placeholder="Password"
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {err.password && <span className={styles.err}>{err.password}</span>}
        {errorMessage && (
          <span className={styles.err}>{errorMessage}</span>
        )}
        <input type="submit" className="submitButton" value="Sing In" />
        <div>
          Don't have an account? <Link to="/register">Register</Link>


            </div>                          
            </form>
            
        </motion.div>
    );
}

export default Login;