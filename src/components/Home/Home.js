import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import Layout from "./../Layout/Layout";
import { BackgroundContext } from "./../../contexts/BackgroundContext";
import {motion} from "framer-motion";



const Home = () => {

const { setBackgroundImage } = useContext(BackgroundContext);

useEffect(() => {
    setBackgroundImage("https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg");
  }, [setBackgroundImage]);
    return(
        <Layout>  
          <motion.div 
          className={styles.image}
          initial={{width: 0}}
          animate={{width: window.innerWidth}}
          exit={{y: window.innerWidth, transition: {duration: 0.5}}}
          >     
                <article className={styles.info_text_container}>
                <h1>Hello, Future Dancers</h1> 
                <h3>Welcome To Our Dancing Classes Platform</h3>   
                 </article> 
        </motion.div>
        
        </Layout>
       
    );
}

export default Home;