import { useState, useEffect } from 'react';

import { UserAuthentication } from '../LoginContext';
import Navbar from '../config/navbar';
// tailwind css object file
import { tailw } from "../config/styles";

import { db } from "../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import emailjs from "emailjs-com";

const StaffApprove = () => {

    // handling user navigation
    const { user,  forceUpdate} = UserAuthentication();

    // select status
    const [bookingStatus,setbookingStatus] = useState("");
    
    // filter datas by users - show user booking
    function filterByPending(data) {
        return data?.status === bookingStatus;
    }

    // filter datas by users - show user booking
    function filterByLocation(data) {
        return data?.Location === location;
    }

    /* TO ALLOW FILTERING BY LOCATION */

    const [location, setLocation] = useState("");
    // get location function
    const [listLocations, setListLocations] = useState([]);
    useEffect(() => {
        fetch('api/locationsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setListLocations(resp))
    .catch(error => console.log(error));
    }, [])

    // /* HACK WAY */

    // // get the collection ref itself
    // const locationCollectionRef = collection(db, "Locations");
    // useEffect(() => {
    //     // async function
    //     const getLocations = async () => {
    //         // get the collection itself
    //         const data = await getDocs(locationCollectionRef);
    //         // take out the data part only & set it
    //         setListLocations(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getLocations();
    // }, [])

    // /* END OF HACK WAY */

    // set Location function
    function handleSelect(e) {
        setLocation(e.target.value);
    }

    // if no location is selected, do not filter else filter the exact location
    function locationfilterer(data) {
        if(location === "") {
            return true;
        } else {
            if(data.Location === location) {
                return true;
            } else {
                return false;
            }
        }
    }

    /* END OF FILTERING BY LOCATION */

    /* TO ALLOW FILTERING BY Facility */

    const [fac, setFac] = useState("");
    // get facility function
    const [facilities, setfacilities] = useState([]);
    useEffect(() => {
        fetch('api/facilityGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setfacilities(resp))
    .catch(error => console.log(error));
    }, [])

    // /* HACK WAY */

    // // get the collection ref itself
    // const facilityCollectionRef = collection(db, "Facilities");
    // useEffect(() => {
    //     // async function
    //     const getF = async () => {
    //         // get the collection itself
    //         const data = await getDocs(facilityCollectionRef);
    //         // take out the data part only & set it
    //         setfacilities(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getF();
    // }, [])

    // /* END OF HACK WAY */

    // set facility function
    function handlefacSelect(e) {
        setFac(e.target.value);
    }

    // if no location is selected, do not filter the bookings else filter the exact facility
    function facilityfilterer(data) {
        if(location === "") {
            return true;
        } else {
            if(data.Location === location) {
                // if same location, check is the booking in the same facility as selected
                if(fac === "") {
                    return true;
                } else if(data.Facility === fac) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    // facility filtering function for the facility dropdown
    // filters facilities, the above filters bookings
    function dropFacilityFilterer(data) {
        if(location === "") {
            return false;
        } else {
            if(data.Location === location) {
                return true;
            } else {
                return false;
            }
        }
    }

    /* END OF FILTERING BY facility */

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const bookingCollectionRef = collection(db, "bookings");
    // useEffect(() => {
    //     // async function
    //     const getBookings = async () => {
    //         // get the collection itself
    //         const data = await getDocs(bookingCollectionRef);
    //         // take out the data part only & set it
    //         setBookings(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getBookings();
    // }, [])

    // /* END OF HACK WAY */

    function statfilterer(newStat) {
        setbookingStatus(newStat);

        fetch('api/bookingsGet', {
            'method' : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(resp => setBookings(resp))
        .catch(error => console.log(error));

        // /* HACK WAY */

        // // get the collection ref itself
        // const getBookings = async () => {
        //     // get the collection itself
        //     const data = await getDocs(bookingCollectionRef);
        //     // take out the data part only & set it
        //     setBookings(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        // }
        // // call the async function
        // getBookings();

        // /* END OF HACK WAY */

        setBookings(Bookings.filter(data => filterByPending(newStat)));       
    }

    // once the Admin approves of the Booking
    function onReview(bookingId, newStat) {
        const c = Bookings.filter( obj => {
            if(obj.id === bookingId) {
                return true;
            }
        });

        const t = Bookings.map( obj => {
            if(obj.id === bookingId) {
                return {...obj, status: newStat};
            }

            return obj;
        });
        // update
        setBookings([...t]);

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
              "status": newStat,
            })
        });

        // /* HACK WAY */

        // //update via firebase
        // const bookingDoc = doc(db, "bookings", bookingId);
        // const newFields = {
        //     Facility: c[0].Facility,
        //     Location: c[0].Location,
        //     Name: c[0].Name,
        //     UserEmail: c[0].UserEmail,
        //     bookingDate: c[0].bookingDate,
        //     bookingTitle: c[0].bookingTitle,
        //     startTime: c[0].startTime,
        //     endTime: c[0].endTime,
        //     status: newStat,
        //   };
        // updateDoc(bookingDoc, newFields);

        // /* END OF HACK WAY */

        /* email service */

        var data = {
            service_id: 'service_hlzn1xg',
            template_id: 'template_5rtb4zp',
            user_id: 'nd-f7LGc0b4WtqZpz',
            template_params: {
                'location':String(c[0].Location),
                'Facility':String(c[0].Facility),
                'bookingDate':String(c[0].bookingDate),
                'startTime': String(c[0].startTime),
                'endTime': String(c[0].endTime),
                'status':String(newStat),
                'receiver':String(c[0].UserEmail),
                'sender':String(user?.email),
                'username': String(c[0].Name),
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
            }
        };

        fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
            'method' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.log(err));

        /* end of email service */


    }

    const [datechecker,setdateChecker] = useState(false);
    const [facilitychecker, setfacilityChecker] = useState(false);

    // if admin wants to sort by date-ascending
    const dateClickHandler = (e) => {
        if(e.target.checked) {
            setdateChecker(true);
            // if facility sorting is not enabled        
            setBookings([...Bookings].sort( (a,b) => {
                if(b.bookingDate < a.bookingDate) {
                    return 1;
                } else if(b.bookingDate > a.bookingDate) {
                    return -1;
                } else {
                    return 0;
                }
            }));

        } else {
            setdateChecker(false);
        }
    }

    return(      
        
        <div className='w-full h-screen bg-center bg-cover bg-utown'>
        <div className='max-w-[1000px] mx-auto my-16 p-4 '>
        <Navbar name={user?.Email} current={"approve"}/>

        {/* Approve Booking table*/}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-white bg-gray-800 dark:text-white dark:bg-gray-800">
                Pending Bookings
                <p class="mt-1 text-sm font-normal text-gray-400 dark:text-gray-400">Bookings to Review </p>

                <p class="mt-1 text-sm font-semibold text-left text-white bg-gray-800 dark:text-white dark:bg-gray-800">Filter by Booking Status </p>

                <ul class="items-center w-full text-sm font-medium border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input type="radio" name="list-radio" onChange={() => statfilterer("pending")}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label class="w-full py-3 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">pending</label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input type="radio" name="list-radio" onChange={() => statfilterer("reviewed")}
                            class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label class="w-full py-3 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">reviewed</label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input type="radio" name="list-radio" onChange={() => statfilterer("rejected")}
                            class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-red-800 focus:ring-2 dark:bg-red-700 dark:border-red-600"/>
                            <label class="w-full py-3 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">rejected</label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input type="radio" name="list-radio" onChange={() => statfilterer("approved")}
                            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-green-800 focus:ring-2 dark:bg-green-700 dark:border-green-600"/>
                            <label class="w-full py-3 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">approved</label>
                        </div>
                    </li>
                </ul>

            </caption>

             {/* Sort Dropdown part*/}
            <caption>
                <ul class="p-2 space-y-1 text-xs text-gray-400 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-400">
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                    <label class="relative inline-flex items-center w-full cursor-pointer">
                        <input onClick={dateClickHandler} type="checkbox" value="" class="sr-only peer"/>
                        <div class="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-red-500"></div>
                        <span class="ml-3 text-sm font-medium text-white dark:text-gray-300">Sort by Date</span>
                    </label>
                    </div>
                </li>

                <li>
                    <div class="flex rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                        <label for="cars" class="block mb-2 text-sm font-medium text-white dark:text-white">Your Location:</label>
                        <select onChange={handleSelect} name="cars" id="cars" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        <option class="text-sm text-gray-900 hover:bg-red-800" >Select Location</option>
                        {listLocations?.map(loc => {
                            return (
                                <option class="text-sm text-gray-900 hover:bg-red-800" value={loc?.Name}>{loc?.Name}</option>
                            )
                        })}
                        </select>
                    </div>
                </li>

                <li>
                    <div class="flex rounded hover:bg-gray-600 dark:hover:bg-gray-600">
                        <label for="cars" class="block mb-2 text-sm font-medium text-white dark:text-white">Your Facility:</label>
                        <select onChange={handlefacSelect} name="cars" id="cars" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        <option class="text-sm text-gray-900 hover:bg-red-800" >Select Facility</option>
                        {facilities?.filter(data => dropFacilityFilterer(data))?.map(f => {
                            return (
                                <option class="text-sm text-gray-900 hover:bg-red-800" value={f?.Name}>{f?.Name}</option>
                            )
                        })}
                        </select>
                    </div>
                </li>
                </ul>
            </caption>
        
            <thead class="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                        <span class="sr-only">Review</span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Reject</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    // filter by status
                    Bookings?.filter(data => filterByPending(data))
                    // filter by location
                    ?.filter(data => locationfilterer(data))
                    // filter by facility
                    ?.filter(data => facilityfilterer(data))
                    ?.map(data => {
                    return (
                    <tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                            {data?.bookingDate}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.Facility}
                        </td>

                        <td class="px-6 py-4">
                        {data?.status == "pending" && <span class="inline-flex items-center bg-blue-800 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-800 dark:text-white">
                            <span class="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "approved" && <span class="inline-flex items-center bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "rejected" && <span class="inline-flex items-center bg-red-900 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "reviewed" && <span class="inline-flex items-center bg-pink-900 text-pink-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            <span class="w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        </td>

                        <td class="px-6 py-4 text-right">

                            { // if user is a Staff and booking status is rejected or pending -> give option to approve
                             (bookingStatus === "rejected" || bookingStatus === "pending" || bookingStatus === "reviewed") &&
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300 hover:dark:text-blue-300"
                            onClick={() => onReview(data?.id,"approved")}>
                                Approve
                            </button>
                            }
                            { // if user is a Staff and booking status is rejected or pending -> give option to approve
                             (bookingStatus === "approved") &&
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300 hover:dark:text-blue-300"
                            onClick={() => onReview(data?.id,"rejected")}>
                                Reject
                            </button>
                            }
                            
                        </td>

                        <td class="px-6 py-4 text-right">
                            { (bookingStatus === "pending" || bookingStatus === "reviewed") &&
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300 hover:dark:text-blue-300"
                            onClick={() => onReview(data?.id,"rejected")}>
                                Reject
                            </button>
                            }
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

export default StaffApprove;

