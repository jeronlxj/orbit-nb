import React, { useEffect } from 'react';
import axios from 'axios';

import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";
import {ListDisplay, CalenderDisplay} from "../config/booking_display";

axios.defaults.withCredentials = true;

const Home = () => {

  const { user } = UserAuthentication();

  return (
    <div className='w-full h-[1200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"Home"}/>
      <ListDisplay name={user?.email}/> 
      <CalenderDisplay/>     
    </div>
    </div>
  );
};

export default Home;


