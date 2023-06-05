import React from 'react';
import axios from 'axios'
import { UserAuthenication } from '../LoginContext';

import Navbar from "../config/navbar";
import {ListDisplay, CalenderDisplay} from "../config/booking_display";

axios.defaults.withCredentials = true;

const Account = () => {
  const { user, logout } = UserAuthenication();

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar/>
      <ListDisplay/> 
      <CalenderDisplay/>    
    </div>
  );
};

export default Account;