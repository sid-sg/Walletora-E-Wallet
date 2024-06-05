import React, { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Singnup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transfer from './pages/Transfer'
import Home from './pages/Home'
import axios from 'axios'


const App = () => {
  // const [userInfo,setUserInfo] =useState({});

  // const fetchData = async()=>{
  //   const res = await axios.get("http://localhost:3000/api/v1/user/me",{
  //       headers:{
  //           'Authorization': "Bearer "+localStorage.getItem("token")
  //       }
  //   });
  //   setUserInfo(res.data);
  //   }
  //   useEffect(()=>{
  //       fetchData();
  //   },[]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/transfer" element={<Transfer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App