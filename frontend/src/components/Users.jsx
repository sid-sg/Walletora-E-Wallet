import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import User from './User';

const Users = () => {
    const [users,setUsers] = useState([{
        firstName: "Jane",
        lastName: "Doe",
        _id: 1
    },
    {
        firstName: "Siddharth",
        lastName: "Sengupta",
        _id: 2
    },
    {
        firstName: "Marshall",
        lastName: "Mathers",
        _id: 2
    }
    ]);
    const print = ()=>{
        console.log(users);
    }

    print();
  return (
    <div className='mt-28'>
        <div className='text-white ml-28 text-2xl'>
            Users
        </div>
        <SearchBar/>
        <div className='ml-28 mt-14 mr-28  divide-y divide-gray-600'>
            {
                 users.map(user => (
                    <div key={user._id} className="w-full">
                        <User user={user} />
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default Users