import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppBar = ({ userInfo }) => {
  const [dropdownOpen,setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = ()=>{
    localStorage.removeItem("token");
    navigate("/signup");
  }

  return (
    <div className='flex justify-between text-white bg-gray-900 rounded shadow-md shadow-gray-800'>
        <div className=' tracking-widest px-3 py-4'> WALLETORA</div>
        <div className='relative'>
          <div className='flex text-white py-2 px-2 cursor-pointer' onClick={()=>{
            setDropdownOpen(!dropdownOpen);
          }}>
              <div className="px-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
          </div>

          {dropdownOpen && (
          <div className="absolute right-2 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-sm text-white">
              <div>{userInfo.firstName} {userInfo.lastName}</div>
              <div className="font-medium truncate">{userInfo.username}</div>
            </div>
            <ul className="py-2 text-sm text-gray-200">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Settings</a>
              </li>
            </ul>
            <div className="py-1">
              <div onClick={logOut} className=" cursor-pointer block px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white">
                Log out
              </div>
            </div>
          </div>
        )}
        </div>
        

    </div>
  );
};

export default AppBar;