import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Balance = ({userInfo}) => {
  const [balance,setBalance] = useState(0);
  const fetchData = async()=>{
    try{
      const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
        "headers": {
          "Authorization": "Bearer "+ localStorage.getItem("token")
        }
      });
      setBalance(res.data.balance);
    }
    
    catch(e){
      console.log("error: ",e);
    }

  }

  useEffect(()=>{
      fetchData();    
  },[]);

  return (
    <div className='text-white text-center text-3xl mt-10'>
        <span className='font-bold'>Your Balance </span>
         ₹{balance}
    </div>
  )
}

export default Balance