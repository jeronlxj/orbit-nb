import { useState, useEffect } from 'react';

import { UserAuthentication } from '../LoginContext';
import Navbar from '../config/navbar';
// tailwind css object file
import { tailw } from "../config/styles";


const Approve = () => {

    // handling user navigation
    const { user,  forceUpdate} = UserAuthentication();

    // tempState management for sorting
    const [tempState, setTempState] = useState(Bookings);

    // remove the @... from the email 
    function extractNameFromEmail(email) {
        return email.split('@')[0];
    }
    let name = "temp"
    try {
        name = extractNameFromEmail(user?.email)
    } catch {
        console.log("failed extraction of name f")
    }
    
    // filter datas by users - show user booking
    function filterByPending(data) {
        return data?.status === "pending";
    }

    // gets booking data from firebase -> django and sets state for booking data
    const [Bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('api/bookingsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setBookings(resp))
    .catch(error => console.log(error));
    }, []);

    // once the Admin approves of the Booking
    function onReview(bookingId) {
        const c = Bookings.filter( obj => {
            if(obj.id === bookingId) {
                return true;
            }
        });

        const t = Bookings.map( obj => {
            if(obj.id === bookingId) {
                return {...obj, status: "approved"};
            }

            return obj;
        });
        // update
        setBookings([...t]);

        console.log(c[0]);

        // update
        fetch(`api/bookingsUpdate/${bookingId}`, {
            'method' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "Facility": c[0].Facility,
              "Location": c[0].Location,
              "Name": c[0].Name,
              "UserEmail": c[0].UserEmail,
              "bookingDate": c[0].bookingDate,
              "bookingTitle": c[0].bookingTitle,
              "startTime": c[0].startTime,
              "endTime": c[0].endTime,
              "status": "approved",
            })
        });

    }
    
    // useEffect( () => {
    // }, [Bookings]);

    // useEffect( () => {
    // }, [tempState]);

    //const [datechecker,setdateChecker] = useState(false);
    //const [facilitychecker, setfacilityChecker] = useState(false);

    // if admin wants to sort by date-ascending
    const dateClickHandler = (e) => {
        // if(e.target.checked) {
        //     setdateChecker(true);
        //     // if facility sorting is not enabled        
        //     setBookings([...Bookings].sort( (a,b) => {
        //         if(b.date < a.date) {
        //             return 1;
        //         } else if(b.date > a.date) {
        //             return -1;
        //         } else {
        //             return 0;
        //         }
        //     }));

        // } else {
        //     setdateChecker(false);
        //     setBookings(tempState);
        // }
    }

    // if admin wants to sort by location
    const FacilityClickHandler = (e) => {
        // if(e.target.checked) {
        //     setBookings([...Bookings].sort( (a,b) => {
        //         if(b.facilityId < a.facilityId) {
        //             return 1;
        //         } else if(b.facilityId > a.facilityId) {
        //             return -1;
        //         } else {
        //             return 0;
        //         }
        //     }));
            
        // }
    }

    return(      
        
        <div className='w-full h-screen bg-center bg-cover bg-utown'>
        <div className='max-w-[1000px] mx-auto my-16 p-4 '>
        <Navbar name={name} current={"approve"}/>

        {/* Approve Booking table*/}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Pending Bookings
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Bookings for {name} to Review </p>
            </caption>

             {/* Sort Dropdown part*/}
            <caption>
                <ul class="p-2 space-y-1 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label class="relative inline-flex items-center w-full cursor-pointer">
                        <input onClick={dateClickHandler} type="checkbox" value="" class="sr-only peer"/>
                        <div class="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-red-500"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sort by Date</span>
                    </label>
                    </div>
                </li>
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label class="relative inline-flex items-center w-full cursor-pointer">
                        <input onClick={FacilityClickHandler} type="checkbox" value="" class="sr-only peer"/>
                        <div class="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-red-500"></div>
                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sort by Facility</span>
                    </label>
                    </div>
                </li>
                </ul>
            </caption>
        
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    date
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                    facilityId
                    </th>
                    <th scope="col" class="px-6 py-3">
                    status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    Bookings?.filter(data => filterByPending(data))
                    ?.map(data => {
                    return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.bookingDate}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.Facility}
                        </td>

                        <td class="px-6 py-4">
                        {data?.status == "pending" && <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "approved" && <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        </td>

                        <td class="px-6 py-4 text-right">
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:dark:text-blue-300"
                            onClick={() => onReview(data?.id)}>
                                Reviewed
                            </button>
                        </td>
                    </tr>
                    )
                })
                }
                
            </tbody>

        </table>
        </div>
        </div>
        </div>
    )
}

export default Approve;

