import React, { useState,useEffect } from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

const Dashboard = ({userInfo}) => {
  // const [userInfo,setUserInfo] =useState({});

  // const fetchData = async()=>{
  //   const res = await axios.get("http://localhost:3000/api/v1/user/me",{
  //       headers:{
  //           'Authorization': "Bearer "+localStorage.getItem("token")
  //       }
  //   });
  //   setUserInfo(res.data);
  //   console.log(res.data);
  //   }
  //   useEffect(()=>{
  //       fetchData();
  //   },[]);

  return (
    <div>
      <AppBar userInfo={userInfo}/>
      <Balance userInfo={userInfo} />
      <Users/>
      
    </div>
  )
}

export default Dashboard