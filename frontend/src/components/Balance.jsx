import React from 'react'

const Balance = ({label}) => {
  return (
    <div className='text-white text-center text-3xl mt-10'>
        <span className='font-bold'>Your Balance </span>
         ₹{label}
    </div>
  )
}

export default Balance