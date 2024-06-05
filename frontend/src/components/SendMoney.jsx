import React, { useEffect, useState } from 'react'
import CardHeading from './CardHeading'
import InputField from './InputField'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const SendMoney = () => {
  const [params] =useSearchParams();
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const toId = params.get("toId");

  const [amount,setAmount] = useState();
  const [doneTransaction,setDoneTransaction] = useState(null);
  const [transactionMessage, setTransactionMessage] = useState('');
  const navigate = useNavigate();


  async function doTransaction(e){
    e.preventDefault();

    try{
      const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                  amount: amount,
                  toUserId: toId
                }, {
                  headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                  }
                });
      setDoneTransaction(true);
      setTransactionMessage('Transaction successful');
      console.log(res);

      setTimeout(()=>{
        navigate("/dashboard");
      },5000);
    }
    catch(error){
      setDoneTransaction(false);
      setTransactionMessage('Transaction failed');
      console.log(error);
    }
  }

  return (
    <div>
        <div className='bg-gray-900 rounded text-white flex flex-col p-4 w-64 md:w-80 lg:w-96'>
        <CardHeading label={"Send Money"}/>
        <div className='text-white text-xl mt-3 mb-3'>
            {firstName} {lastName}
        </div>
        <form onSubmit={doTransaction}>
          <InputField type={"number"} label={"Amount"} placeholder={"Enter amount in ₹"} onChange={(e)=>{
            setAmount(e.target.value);
          }} />
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send</button>
          </div>
        </form>
        <div className='min-h-16'>
            {
              transactionMessage!==null && (<div className={ `rounded mt-5 text-center ${doneTransaction? 'bg-green-500':'bg-red-500'}`}>
                {transactionMessage}
              </div>)
            }
          </div>

          <div>
            {
              doneTransaction && (
                <Redirection/>
              )
            }
          </div>
    </div>
    </div>
  )
}


function Redirection(){
  const [counter,setCounter] = useState(5);
  
  useEffect(()=>{
    const timer = setInterval(()=>{
      if(counter>0) setCounter(counter-1);
      else clearInterval(timer);
    },1000);

  },[counter]);
  return <div className='text-green-500 text-center'>
    Redirecting to dashboard in {counter}s
  </div>
}

export default SendMoney