import React, { useEffect, useState } from 'react';
import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";
import { Stacked, Pie, SparkLine } from '../components';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';
import { HiOutlineRefresh } from 'react-icons/hi';
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const Dashboard = () => {
    const { user } = UserAuthentication();

    // handling display of data from backend
    const [bdatas, setbDatas] = useState([]);
    // gets booking data from firebase -> django and sets state for booking data
    useEffect(() => {
        fetch('api/bookingsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setbDatas(resp))
    .catch(error => console.log(error));
    }, [])

    /* HACK WAY */

    // get the collection ref itself
    const bookingCollectionRef = collection(db, "bookings");
    useEffect(() => {
        // async function
        const getBookings = async () => {
            // get the collection itself
            const data = await getDocs(bookingCollectionRef);
            // take out the data part only & set it
            setbDatas(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getBookings();
    }, [])

    /* END OF HACK WAY */

    function filterByMonth(data, month) {
        // get the month of the booking
        const dataMonth = new Date(data.bookingDate).getMonth();
        // if it matches required month return true
        if(dataMonth === month) {
            return true;
        } else {
            return false;
        }
    }
    
    function getMonthName(monthNumber) {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        if (monthNumber >= 0 && monthNumber <= 11) {
          return months[monthNumber];
        } else {
          return 'Invalid month number';
        }
      }    

  return (
    <div className='w-full h-[1200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"Dashboard"}/>
      <div className="mt-3">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-1920 p-8 pt-9 m-3 bg-erc bg-no-repeat bg-cover bg-center">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-white-400">Total Bookings</p>
                        <p className="text-2xl">2100,000</p>
                    </div>
                </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
            
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl h-44">
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
                    <button type="button" style={{ color:'#03C9D7', backgroundColor: '#E5FAFB'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><BsBoxSeam/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">6</span>
                        <span className={`text-sm text-green-600 ml-2`}>+33%</span> 
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Locations</p>
                </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color:'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><FiBarChart/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">14</span>
                        <span className={`text-sm text-green-600 ml-2`}>+10%</span> 
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
                        <p className="flex items-center gap-2 text-pink-600 hover:drop-shadow-xl">
                            <span><GoPrimitiveDot/></span>
                            <span>Reviewed</span>
                        </p>
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
                        <div className="mt-5">
                            <h1></h1>
                            <SparkLine currentColor="blue" id="line-sparkline" type="Line" height="80px" width="250px" data={[
    { x: getMonthName(new Date(Date.now()).getMonth() - 4), y: bdatas.filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 4)).length },
    { x: getMonthName(new Date(Date.now()).getMonth() - 3), y: bdatas.filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 3)).length },
    { x: getMonthName(new Date(Date.now()).getMonth() - 2), y: bdatas.filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 2)).length },
    { x: getMonthName(new Date(Date.now()).getMonth() - 1), y: bdatas.filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 1)).length },
    { x: getMonthName(new Date(Date.now()).getMonth()), y: bdatas.filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).length }]} color="blue"/>
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
    </div>
  )
};

export default Dashboard;