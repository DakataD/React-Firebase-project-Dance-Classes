import styles from "./Home.module.css";
import {motion} from "framer-motion";



const Home = () => {
    return(
        
          <motion.div 
          className={styles.background}
          initial={{rotateX: 90, rotateY: -90, scale: 0}}
          animate={{rotateX: 0, rotateY: 0, scale: 1 }}
          exit={{rotateX: -90, rotateY: 90, scale: 0,transition:{duration: 0.15}}}
          >     
                <article className={styles.info_text_container}>
                <h1>Hello, Future Dancers</h1> 
                <h3>Welcome To Our Dancing Classes Platform</h3>   
                 </article> 
        </motion.div>
        
       
       
    );
}

export default Home;