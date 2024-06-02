import React from 'react'
import User from './User'

const AppBar = () => {
  return (
    <div className='flex justify-between text-white bg-gray-900 rounded shadow-md shadow-gray-800'>
        <div className=' tracking-widest px-3 py-4'> WALLETORA</div>
        <div className='flex text-white py-2 px-2'>
            <div className="px-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
            <div className='py-2 px-3 text-white'>
                {"John"} {"Doe"}
            </div>
        </div>
    </div>
  )
}

export default AppBar