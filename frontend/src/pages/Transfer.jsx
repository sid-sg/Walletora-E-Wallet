import React, { useState,useEffect } from 'react'
import SendMoney from '../components/SendMoney'
import AppBar from '../components/AppBar'
import axios from 'axios'





const Transfer = () => {

  return (
    <div>
        <div className='flex justify-center h-screen items-center'>
          <SendMoney/>
        </div>
    </div>
    
  )
}

export default Transfer