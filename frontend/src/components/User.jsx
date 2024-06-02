import React from 'react'

const User = ({user}) => {
  return (
    <div className='flex justify-between'>
        <div className='flex text-white py-2 px-2'>
            <div className="px-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
            <div className='py-2 px-3 text-white'>
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div>
        <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 mt-2 text-center">Transfer</button>
        </div>
        {/* <div className='divide-x-2  bg-white'>

        </div> */}
    </div>
    
  )
}

export default User