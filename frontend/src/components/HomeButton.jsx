import React from 'react'
import { Link } from 'react-router-dom'

const HomeButton = ({label,to}) => {

  return (
    <Link to={to}>
        <button type="button" className="text-gray-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-5xl px-5 py-4 me-10 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{label}</button>
    </Link>
    
  )
}

export default HomeButton