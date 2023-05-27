import React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from "../config/firebase";
import { UserAuthenication } from '../LoginContext';

const Account = () => {
  const { user, logout } = UserAuthenication();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
        e.preventDefault();  
        await logout(auth);
        navigate('/');
    } catch (e) {
        alert(e);
    }
  }; 

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>Welcome User: {user?.email} </p>

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>
    </div>
  );
};

export default Account;