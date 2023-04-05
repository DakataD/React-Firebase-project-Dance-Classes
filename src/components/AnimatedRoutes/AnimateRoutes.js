import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link,useLocation,useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Catalog from '../Catalog/Catalog';
import Create from '../Create/Create';
import Register from '../Register/Register';
import {auth} from "../../firebase/firebase-config";
import {AnimatePresence} from 'framer-motion'
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

function AnimatedRoutes() {

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


    const location = useLocation();
    return(
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
        <Route path='/' element = {<Home  isAuth={isAuth}/>} />
        <Route path='/login' element = {<Login  setIsAuth={setIsAuth}/>} />
        <Route path='/register' element = {<Register  setIsAuth={setIsAuth}/>} />
        <Route path='/catalog' element = {<Catalog  isAuth={isAuth}/>} />
        <Route path='/create' element = {<Create user={user} />} />
        <Route path="/:id/details" element={<Details user={user} />} />
        <Route path='/:id/edit' element = {<Edit user={user} />} />



      </Routes>
      </AnimatePresence>
    )
}

export default AnimatedRoutes;
