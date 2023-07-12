import React, { useEffect } from 'react';
import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";
import { Stacked, Pie, SparkLine } from '../components';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';
import { HiOutlineRefresh } from 'react-icons/hi';

const Dashboard = () => {
const { user } = UserAuthentication();
  return (
    <div className='w-full h-[1200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"Dashboard"}/>
      <div className="mt-12">
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-400">Total Bookings</p>
                        <p className="text-2xl">2000,000</p>
                    </div>
                </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color:'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><MdOutlineSupervisorAccount/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">2965</span>
                        <span className={`text-sm text-red-600 ml-2`}>-4%</span> 
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Users</p>
                </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color:'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><FiBarChart/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">6</span>
                        <span className={`text-sm text-green-600 ml-2`}>+33%</span> 
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Facilities</p>
                </div>
            </div>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">Booking Status</p>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                            <span><GoPrimitiveDot/></span>
                            <span>Pending</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-pink-600 hover:drop-shadow-xl">
                            <span><GoPrimitiveDot/></span>
                            <span>Reviewed</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-green-600 hover:drop-shadow-xl">
                            <span><GoPrimitiveDot/></span>
                            <span>Approved</span>
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex gap-10 flex-wrap justify-center">
                    <div className="border-r-1 border-color m-4 pr-10">
                        <div>
                            <p>
                                <span className="text-3xl font-semibold">15</span>
                                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-1 text-xs">+40%</span>
                            </p>
                            <p className="text-gray-500 mt-1">Pending</p>
                        </div>
                        <div className="mt-8">
                            <p>
                                <span className="text-3xl font-semibold">3</span>
                                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-1 text-xs">+10%</span>
                            </p>
                            <p className="text-gray-500 mt-1">Reviewed</p>
                        </div>
                        <div className="mt-8">
                            <p>
                                <span className="text-3xl font-semibold">20</span>
                                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-1 text-xs">+10%</span>
                            </p>
                            <p className="text-gray-500 mt-1">Approved</p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <SparkLine currentColor="blue" id="line-sparkline" type="Line" height="80px" width="250px" data={[
  { x: 1, y: 2 },
  { x: 2, y: 6 },
  { x: 3, y: 8 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },

]} color="blue"/>
                    </div>
                </div>
                <div>
                    <Stacked width="320px" height="360px"/>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default Dashboard;