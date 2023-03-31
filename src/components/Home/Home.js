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
          initial={{rotateX: 90, rotateY: -90, scale: 0}}
          animate={{rotateX: 0, rotateY: 0, scale: 1 }}
          exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.4}}}
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