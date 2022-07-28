import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Catalog from './components/Catalog/Catalog';
import Create from './components/Create/Create';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import {auth} from "../src/firebase/firebase-config";



function App() {
  // redux or context maybe?
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
    
  }, []);


  const signUserOut = () => {
      signOut(auth).then(() => {
        localStorage.clear()
        setIsAuth(false)
        window.location.pathname = "/";
        
      })
    }
  return (
  <Router>
    <nav className='nav-bar'>
      <Link to="/">Home</Link>
      {!user  ?<> <Link to="/login">Login</Link> <Link to="/register">Register</Link></>:
      <>
      <button className='logout-btn' onClick={signUserOut}>Logout</button>
      <Link to="/create">Create</Link>
      <span>Hello, {user.email}</span>
      </> }  
      <Link to="/catalog">Catalog</Link>
      
    </nav>
    	<Routes>
        <Route path='/' element = {<Home  isAuth={isAuth}/>} />
        <Route path='/login' element = {<Login  setIsAuth={setIsAuth}/>} />
        <Route path='/register' element = {<Register  setIsAuth={setIsAuth}/>} />
        <Route path='/catalog' element = {<Catalog />} />
        <Route path='/create' element = {<Create isAuth={isAuth} />} />

      </Routes>
  </Router>
  );
}

export default App;
