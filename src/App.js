import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Catalog from './components/Catalog/Catalog';
import Create from './components/Create/Create';
import Register from './components/Register/Register';
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
        console.log(user)
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
      <img style={{ width: "80px" }} src="/dance-logo.png" alt="" />
      <Link to="/">Home</Link>
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
    
    	<Routes>
        <Route path='/' element = {<Home  isAuth={isAuth}/>} />
        <Route path='/login' element = {<Login  setIsAuth={setIsAuth}/>} />
        <Route path='/register' element = {<Register  setIsAuth={setIsAuth}/>} />
        <Route path='/catalog' element = {<Catalog  isAuth={isAuth}/>} />
        <Route path='/create' element = {<Create user={user} />} />
      </Routes>
      
        <Footer/>
  </Router>
  </AuthProvider>
  );
}

export default App;
