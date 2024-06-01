import React from 'react'
import CardHeading from './CardHeading'
import CardSubHeading from '../components/CardSubHeading'
import InputField from './InputField'

const LoginCard = () => {
  return (
    <div className='bg-gray-900 rounded text-white flex flex-col p-4 w-64 md:w-80 lg:w-96'>
        <CardHeading label={"Log in"}/>
        <CardSubHeading label={"Enter your information"}/>
        <form>
          <InputField type={"email"} label={"Username"} placeholder={"johndoe@gmail.com"} />
          <InputField type={"password"} label={"Password"} placeholder={"•••••••••"} />
          <div className='flex justify-center'>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
          {/* <div>
            Error:
          </div> */}
          
        </form>
    </div>
  )
}

export default LoginCard