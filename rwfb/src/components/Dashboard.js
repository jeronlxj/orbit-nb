import React, { useEffect } from 'react';
import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";

const Dashboard = () => {
const { user } = UserAuthentication();
  return (
    <div className='w-full h-[1200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"Dashboard"}/>
      
    </div>
    </div>
  )
};

export default Dashboard;