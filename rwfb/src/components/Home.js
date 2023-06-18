import React, { useEffect } from 'react';
import axios from 'axios';

import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";
import {ListDisplay, CalenderDisplay} from "../config/booking_display";

axios.defaults.withCredentials = true;

const Home = () => {

  const { user } = UserAuthentication();

  // remove the @... from the email 
  function extractNameFromEmail(email) {
    return email.split('@')[0];
  }
  let name = "temp"
  try {
      console.log(user?.email);
      name = extractNameFromEmail(user?.email);
  } catch {
      console.log("failed extraction of name f")
  }

  return (
    <div className='w-full h-[1200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={name} current={"Home"}/>
      <ListDisplay name={name}/> 
      <CalenderDisplay/>     
    </div>
    </div>
  );
};

export default Home;


