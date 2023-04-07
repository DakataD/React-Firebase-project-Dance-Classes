import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import AnimatedRoutes from './components/AnimatedRoutes/AnimateRoutes'
import Footer from './components/Footer/Footer';
import { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import {auth} from "../src/firebase/firebase-config";
import { AuthProvider } from "./contexts/AuthContext";



function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        setUser(authUser)
      }else {
        setUser("")
      }
    });  
  }, [user]);


  const logout = () => {
      signOut(auth).then(() => {
        localStorage.clear()
        setIsAuth(false)
        window.location.pathname = "/";
        
      })
    }
  return (
    <AuthProvider>   
  <Router>
    <header>
    <nav className='nav-bar'>
      <Link to="/" id='logo'>
      <img style={{ height: "100px" }} src="/dance-logo.png" alt="" />
      </Link>
      <Link to="/catalog">Classes</Link>     
      {!user ?<> 
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <span>Hello, Guest</span>
      </>
      :
      <>
      <button className='logout-btn' onClick={logout}>Logout</button>
      <Link to="/create">Create Class</Link>
      <span>Hello, {user.email}</span>
      </> }    
    </nav>
    </header>
    	<AnimatedRoutes />
        <Footer/>
  </Router>
  </AuthProvider>
  );
}

export default App;
