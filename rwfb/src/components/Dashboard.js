import React, { useEffect, useState } from 'react';
import { UserAuthentication } from '../LoginContext';
import Navbar from "../config/navbar";
import { Stacked, Pie, SparkLine, LineChart } from '../components';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { MdOutlineSupervisorAccount, MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';
import { HiOutlineRefresh } from 'react-icons/hi';
import { db } from "../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const Dashboard = () => {
    const { user } = UserAuthentication();

    // selected location
    const [location, setLocation] = useState("");
    // selected facility
    const [facName, setFacName] = useState("");

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const bookingCollectionRef = collection(db, "bookings");
    // useEffect(() => {
    //     // async function
    //     const getBookings = async () => {
    //         // get the collection itself
    //         const data = await getDocs(bookingCollectionRef);
    //         // take out the data part only & set it
    //         setbDatas(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getBookings();
    // }, [])

    // /* END OF HACK WAY */

    // handling display of data from backend
    const [udatas, setuDatas] = useState([]);
    // gets booking data from firebase -> django and sets state for booking data
    useEffect(() => {
        fetch('api/usersGET', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setuDatas(resp))
    .catch(error => console.log(error));
    }, [])

    // handling display of data from backend
    const [ldatas, setlDatas] = useState([]);
    // gets booking data from firebase -> django and sets state for booking data
    useEffect(() => {
        fetch('api/locationsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setlDatas(resp))
    .catch(error => console.log(error));
    }, [])

    // handling display of data from backend
    const [fdatas, setfDatas] = useState([]);
    // gets booking data from firebase -> django and sets state for booking data
    useEffect(() => {
        fetch('api/facilityGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setfDatas(resp))
    .catch(error => console.log(error));
    }, [])
    
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

    function filterByStatus(data, status) {
        return data.status === status;
    }   

    function filterByLocation(data, location) {
        if (location === "Select location" || location === null || location === "") {
            return true;
        }
        return data.Location === location;
    }

    function filterByFacility(data, facName) {
        if (facName === "Select facility" || facName === null || facName === "" ) {
            return true;
        }
        return data.Facility === facName;
    }

    //get 1st day of x mths ago
    function getMthDate(x) {
        return new Date(Date.now()).setMonth((new Date(Date.now()).getMonth()-x) % 12,1)
    }

    //get mth name of x mths ago
    function getMthName(x) {
        const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        const monthNumber = (new Date(Date.now()).getMonth() - x) % 12;

        if (monthNumber >= 0 && monthNumber <= 11) {
        return months[monthNumber];
        } else {
        return 'Invalid month number';
        }
    } 

    function calculateDuration(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');
      
        const startDate = new Date();
        startDate.setHours(startHour, startMinute, 0);
      
        const endDate = new Date();
        endDate.setHours(endHour, endMinute, 0);
      
        const durationInMillis = endDate.getTime() - startDate.getTime();
      
        const hours = durationInMillis / (1000 * 60 * 60);
      
        return hours;
    }

    function filterTotalDuration(data, location, facName) {
        if (facName === "Select facility" || facName === null || facName === "") {
            return filterByLocation(data, location);
        }
        return data.Name === facName && filterByLocation(data, location);
    }

  return (
    <div className='w-full h-[2200px] bg-center bg-cover bg-utown'>
    <div className='max-w-[800px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"Dashboard"}/>
      <div className="mt-3">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-1920 p-8 pt-9 m-3 bg-erc bg-no-repeat bg-cover bg-center">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-white-400">Total Bookings</p>
                        <p className="text-2xl">{bdatas.length}</p>
                    </div>
                </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
            
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl h-44">
                    <button type="button" style={{ color:'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><MdOutlineSupervisorAccount/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">{udatas.length}</span>
                        {/* <span className={`text-sm text-red-600 ml-2`}>-4%</span>  */}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Users</p>
                </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color:'#03C9D7', backgroundColor: '#E5FAFB'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><MdLocationPin/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">{ldatas.length}</span>
                        {/* <span className={`text-sm text-green-600 ml-2`}>+33%</span>  */}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Locations</p>
                </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color:'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"><MdMeetingRoom/></button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">{fdatas.length}</span>
                        {/* <span className={`text-sm text-green-600 ml-2`}>+10%</span>  */}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Facilities</p>
                </div>
            </div>
        </div>

        <div class="w-full mb-2 "> 
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
            <select onChange={(e) => setLocation(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option class="text-sm text-gray-900 hover:bg-red-800">Select location</option>
                { // display all locations
                ldatas.map( data => {
                    return (<option class="text-sm text-gray-900 hover:bg-red-800" value={data.Name}>{data.Name}</option>)})
                }
            </select>
        </div>

        <div class="w-full mb-2">
            <label for="cars" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facility:</label>
            <select onChange={(e) => setFacName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option class="text-sm text-gray-900 hover:bg-red-800">Select facility</option>
                { // display all facilities for selected location
                fdatas.filter(data => data.Location === location)
                .map( data => {
                        return(<option class="text-sm text-gray-900 hover:bg-red-800" value={data.Name}>{data.Name}</option>)
                    })}
            </select>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-1920">
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
                <div class="mt-10 flex flex-row gap-10 flex-wrap justify-center">
                    {/* <div className="border-r-1 border-color m-4 pr-10">
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
                        
                    </div> */}
                    <div className="flex flex-col mt-5">
                            <h1></h1>
                            <LineChart data={[
    { x: getMthDate(4), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 4)).length },
    { x: getMthDate(3), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 3)).length },
    { x: getMthDate(2), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 2)).length },
    { x: getMthDate(1), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 1)).length },
    { x: getMthDate(0), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).length }
                            ]} />
                    </div>
                    
                    {/* <div className="flex flex-col mt-5">
                        <h1></h1>
                        <Stacked dataPending={[
    { x: getMthName(2), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"pending")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 2)).length },
    { x: getMthName(1), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"pending")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 1)).length },
    { x: getMthName(0), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"pending")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).length }
                        ]} dataReviewed={[
    { x: getMthName(2), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"reviewed")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 2)).length },
    { x: getMthName(1), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"reviewed")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 1)).length },
    { x: getMthName(0), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"reviewed")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).length }
                        ]} dataApproved={[
    { x: getMthName(2), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"approved")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 2)).length },
    { x: getMthName(1), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"approved")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() - 1)).length },
    { x: getMthName(0), y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName)).filter(data => filterByStatus(data,"approved")).filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).length }
                        ]}/>
                    </div> */}

                    <div className="flex flex-col mt-5 justify-center">
                        <h1></h1>
                        <Pie data={[
    { x: 'Used', y: bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName))
    .filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).filter(data => filterByStatus(data,"approved"))
    .map(data => calculateDuration(data.startTime,data.endTime)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)/(16*31*fdatas.filter(data => filterTotalDuration(data, location, facName)).length)*100},
    { x: 'Unused', y: 100-(bdatas.filter(data => filterByLocation(data,location)).filter(data => filterByFacility(data,facName))
    .filter(data => filterByMonth(data, new Date(Date.now()).getMonth() )).filter(data => filterByStatus(data,"approved"))
    .map(data => calculateDuration(data.startTime,data.endTime)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)/(16*31*fdatas.filter(data => filterTotalDuration(data, location, facName)).length)*100)}
                        ]}/>
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