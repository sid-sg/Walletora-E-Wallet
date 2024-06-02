import React from 'react'
import SendMoney from '../components/SendMoney'
import AppBar from '../components/AppBar'

const Transfer = () => {
  return (
    <div>
        <AppBar/>
        <div className='flex justify-center h-screen items-center'>
          <SendMoney label={"Jane Doe"}/>
        </div>
    </div>
    
  )
}

export default Transfer