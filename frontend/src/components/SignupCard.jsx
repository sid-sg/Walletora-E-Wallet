import React, { useEffect, useState } from 'react';
import CardHeading from './CardHeading';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupCard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
        username,
        firstName,
        lastName,
        plainPassword,
      });
      console.log('response:', res.data);
      localStorage.setItem("token",res.data.token);
      
      navigate('/dashboard');
    } 
    catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400 && error.response.data.errors){ //zod error
        const newErrors = {};
        error.response.data.errors.forEach(err => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
      } 
      else if(error.response){ //user exists error
        setErrors({
          "other": error.response.data.message
        })
        console.log(errors.other);
        console.error('error:', error);
      }
      else{ //server error
        setErrors({
          "other": "Server Error"
        })
        console.error('error:', error);
      }
    }
  };

  return (
    <div className='bg-gray-900 rounded text-white flex flex-col pt-2 pb-3 px-4 w-64 md:w-80 lg:w-96'>
      <CardHeading label='Sign Up' />
      {/* <CardSubHeading label='Enter your information' /> */}
      <form onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='First Name'
          placeholder='John'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          type='text'
          label='Last Name'
          placeholder='Doe'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <InputField
          type='email'
          label='Username'
          placeholder='johndoe@gmail.com'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <InputField
          type='password'
          label='Password'
          placeholder='•••••••••'
          value={plainPassword}
          onChange={(e) => setPlainPassword(e.target.value)}
          error={errors.plainPassword}
        />
        <div className='flex justify-center'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Sign Up
          </button>
        </div>
        <div className='text-white mt-2 text-sm text-center'>
          <p >
            Already have an account?{' '}
            <span className='underline'>
              <Link to='/login'>Log in</Link>
            </span>
          </p>
        </div>

        <div className="text-sm min-h-0" >
          {errors.other?<p className="text-red-500 text-center font-bold">{errors.other}</p> : <p className="invisible">Error placeholder</p>}
        </div>
        
      </form>
    </div>
  );
};

export default SignupCard;
