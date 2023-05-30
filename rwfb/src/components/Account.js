import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from "../config/firebase";
import { UserAuthenication } from '../LoginContext';

import tailw from "../config/styles";

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

  const goToRoom = () => {
    navigate('/room/');
  }

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/display', {
      'method' : 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(resp => resp.json())
  .then(resp => setDatas(resp))
  .then(resp => console.log(datas))
  .catch(error => alert(error))
}, [])

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>Welcome User: {user?.email} </p>

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>

      <button onClick={goToRoom} className='border px-6 py-2 my-4'>
        Go to Room
      </button>

      <div>
      {datas.map(datas => {
        return <h2>{datas.name}</h2>
      })}
      </div>
      

    </div>
  );
};

export default Account;
