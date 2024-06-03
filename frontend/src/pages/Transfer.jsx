import React from 'react'
import SendMoney from '../components/SendMoney'
import AppBar from '../components/AppBar'

const Transfer = ({userInfo}) => {
  return (
    <div>
        <AppBar userInfo={userInfo}/>
        <div className='flex justify-center h-screen items-center'>
          <SendMoney userInfo={userInfo}/>
        </div>
    </div>
    
  )
}

export default Transfer