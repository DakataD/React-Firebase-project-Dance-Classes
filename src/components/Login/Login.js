import React, {  useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.scss"


const Login = () => {
    const { userLogin, user } = useContext(AuthContext);
  
    useEffect(() => {
        if (user) {
          return navigate("/catalog");
        }
      }, [user]);

      const [input, setInput] = useState({
        email: "",
        password: "",
      });
    
      const [err, setErr] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate();

      const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateInput(e);
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
                }
              }
    
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

    const login = (e) => {
        e.preventDefault();

                let valid = true;
                Object.values(err).forEach((e) => {
                if (e.length !== 0) {
                valid = false;
            }
            });
            if (!valid) {
            } else {
            userLogin(input.email, input.password);
            }
            };
    return(     
        <div className={styles.container}>
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

            <label htmlFor="password" className={styles.label}>
              Password
            </label>
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
                    <input  type="submit" className="submitButton" value="Sing In" />                             
            </form>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
    );
}

export default Login;