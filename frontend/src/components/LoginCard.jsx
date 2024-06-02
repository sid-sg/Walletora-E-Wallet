import React, { useState } from 'react'
import CardHeading from './CardHeading'
import CardSubHeading from '../components/CardSubHeading'
import InputField from './InputField'
import axios from 'axios'

const LoginCard = () => {

  const [username,setUsername] = useState("");
  const [plainPassword,setPlainPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/api/v1/user/login",{
        username,
        plainPassword
      });
      console.log("response: ",res);
      localStorage.setItem("token",res.data.token);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className='bg-gray-900 rounded text-white flex flex-col p-4 w-64 md:w-80 lg:w-96'>
        <CardHeading label={"Log in"}/>
        <CardSubHeading label={"Enter your information"}/>
        <form onSubmit={handleSubmit}>
          <InputField type={"email"} label={"Username"} placeholder={"johndoe@gmail.com"} onChange={e=>{
            setUsername(e.target.value);
          }}/>
          <InputField type={"password"} label={"Password"} placeholder={"•••••••••"} onChange={e=>{
            setPlainPassword(e.target.value);
          }}/>
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
          </div>
          {/* <div>
            Error:
          </div> */}
          
        </form>
    </div>
  )
}

export default LoginCard