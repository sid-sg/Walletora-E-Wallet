import React from 'react'
import CardHeading from './CardHeading'
import InputField from './InputField'
import { useSearchParams } from 'react-router-dom'

const SendMoney = ({userInfo}) => {
  const [params] =useSearchParams();
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const toId = params.toId;


  return (
    <div>
        <div className='bg-gray-900 rounded text-white flex flex-col p-4 w-64 md:w-80 lg:w-96'>
        <CardHeading label={"Send Money"}/>
        <div className='text-white text-xl mt-3 mb-3'>
            {firstName} {lastName}
        </div>
        <form>
          <InputField type={"number"} label={"Amount"} placeholder={"Enter amount in ₹"} />
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
          </div>
          {/* <div>
            Error:
          </div> */}
          
        </form>
    </div>
    </div>
  )
}

export default SendMoney