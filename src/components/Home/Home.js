import React from "react";
import styles from "./Home.module.css"
const Home = () => {
    return(
        <>  
          <div className={styles.image}>     
                <article className={styles.info_text_container}>
                <h1>Hello, Future Dancers</h1> 
                <h3>Welcome To Our Dancing Classes Platform</h3>   
                 </article> 
        </div>
        
        </>
       
    );
}

export default Home;