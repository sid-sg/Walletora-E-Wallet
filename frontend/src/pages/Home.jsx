import React from 'react'
import HomeButton from '../components/HomeButton'

const Home = () => {
  return (
    <div  >
        <div className='flex flex-col items-center'>
            <h1 className='text-gray-300 text-4xl sm:text-7xl p-5 tracking-widest '>WALLETORA</h1>

            <div className='text-gray-400 md:text-3xl '>
                Your Secure & Seamless E-Wallet Solution
            </div>
        </div>
       
        <div className='flex  justify-center mt-20'>
            <div className='flex'>
                <HomeButton label={"Sign Up"} to={"/signup"}/>
                <HomeButton label={"Log In"} to={"/login"}/>
            </div>
        </div>
        
    </div>
  )
}

export default Home