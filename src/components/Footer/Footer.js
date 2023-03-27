import React from "react";
import styles from "./Footer.module.css"
const Footer = () => {
    return(      
        <div className={styles.footer_wrapper}>
    <a href="https://github.com/DakataD/softuni-project" >Project Source Code</a>
    <span> Daniel Dimitrov 2023 &copy;</span>
        </div>
 
      
       
    );
}

export default Footer;