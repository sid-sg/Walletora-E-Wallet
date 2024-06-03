import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import User from './User';
import axios from 'axios';

const Users = () => {
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const fetchData = async()=>{
        const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        });
        setUsers(res.data.users);
    }
    useEffect(()=>{
        fetchData();
    },[filter])

  return (
    <div className='mt-28'>
        <div className='text-white ml-28 text-2xl'>
            Users
        </div>
        <SearchBar onChange={(e)=>{
            setFilter(e.target.value);
        }}/>
        <div className='mt-14 ml-8 mr-8 md:ml-20 md:mr-20 lg:ml-28 lg:mr-28  divide-y divide-gray-600'>
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