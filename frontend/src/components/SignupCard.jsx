import React, { useState } from 'react'
import CardHeading from './CardHeading'
import CardSubHeading from '../components/CardSubHeading'
import InputField from './InputField'
import { Link } from 'react-router-dom'
import axios from 'axios'
const SignupCard = () => {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [plainPassword,setPlainPassword] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
        username,
        firstName,
        lastName,
        plainPassword
      });
      console.log("response: ",res.data);
      localStorage.setItem("token",res.data.token);

    }
    catch(error){
      console.error("error: ",error);
    }
    console.table([firstName,lastName,username,plainPassword]);

  }
  return (
    <div className='bg-gray-900 rounded text-white flex flex-col p-4 w-64 md:w-80 lg:w-96'>
        <CardHeading label={"Sign Up"}/>
        <CardSubHeading label={"Enter your information"}/>
        <form onSubmit={handleSubmit}>
          <InputField type={"text"} label={"Fist Name"} placeholder={"John"} onChange={e=>{
            setFirstName(e.target.value);
          }}/>
          <InputField type={"text"} label={"Last Name"} placeholder={"Doe"} onChange={e=>{
            setLastName(e.target.value);
          }}/>
          <InputField type={"email"} label={"Username"} placeholder={"johndoe@gmail.com"} onChange={e=>{
            setUsername(e.target.value);
          }}/>
          <InputField type={"password"} label={"Password"} placeholder={"•••••••••"} onChange={e=>{
            setPlainPassword(e.target.value);
          }}/>
          {/* <InputField type={"password"} label={"Confirm Password"} placeholder={"•••••••••"} /> */}
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"                  
            >Sign Up</button>
          </div>
          <div className='text-white mt-2'>
            <p>Already have an account ?  <span className='underline'><Link to="/login">Log in</Link></span></p>
          </div>
          
        </form>
    </div>
  )
}

export default SignupCard