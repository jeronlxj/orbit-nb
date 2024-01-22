import { useState, useEffect, useReducer } from 'react';

import { UserAuthentication } from '../LoginContext';

import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import './calenderStyle.css';
import { useNavigate } from "react-router-dom";

import { db } from "../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export function ListDisplay(props) {

    const name = props.name; 
    const { user, setBookingEdit } = UserAuthentication();
    const navigate = useNavigate();

    // handling display of data from backend
    const [bdatas, setbDatas] = useState([]);

    // filter datas by users - shows specific user booking
    function filterByUser(data) {
        return data?.UserEmail === user?.email;
    }

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

    return(      

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-white bg-gray-800 dark:text-white dark:bg-gray-800">
                {user?.email}'s Bookings
                <p class="mt-1 text-sm font-normal text-gray-400 dark:text-gray-400">Browse a list display of your bookings and edit</p>
            </caption>

            <thead class="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    Facility
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Start
                    </th>
                    <th scope="col" class="px-6 py-3">
                    End
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
                    
                    bdatas?.filter(data => filterByUser(data))
                    ?.map(data => {
                    return (
                    <tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                            {data?.Location} - {data?.Facility}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.bookingDate}
                        </td>

                        <td class="px-6 py-4">
                            {data?.startTime}
                        </td>

                        <td class="px-6 py-4">
                            {data?.endTime}
                        </td>

                        { <td class="px-6 py-4">
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
                        </td> }

                        <td class="px-6 py-4 text-right">
                            <button onClick={() => {
                                setBookingEdit(data?.id);
                                navigate('/book_edit');}} 
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</button>
                        </td>
                    </tr>
                    )
                })
                }
                
            </tbody>

        </table>
        </div>

    )
}

export function CalenderDisplay() {
    const [date, setDate] = useState(new Date())

    return (
        <div class="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">

          <div>
            <Calendar onChange={setDate} value={date}/>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg text-center font-semibold bg-gray-800 text-white">
             Selected date: {date.toDateString()}
          </div>

          <div class="mx-auto my-5">
            <SpecificDisplay date={date}/>
          </div>
          
        </div>
         )
} 

export function SpecificDisplay(props) {

    const navigate = useNavigate();
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
    
    const date = props.date.toDateString().substring(3);

    // filter datas by users - show specific user booking
    const { user, setBookingEdit } = UserAuthentication();
    function filterByUser(data) {
        return data?.UserEmail === user?.email;
    }

    // filter datas by selected Date - show bookings only for the selected date
    function filterByDate(data) {
        // checks the respective day,month & year
        return (
            props.date.getDate() === new Date(data.bookingDate).getDate() &&
            props.date.getMonth() === new Date(data.bookingDate).getMonth() &&
            props.date.getFullYear() === new Date(data.bookingDate).getFullYear() 
        );
    }

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-white bg-gray-800 dark:text-white dark:bg-gray-800">
                {date}'s Bookings
                <p class="mt-1 text-sm font-normal text-gray-400 dark:text-gray-400">Browse a list display of the bookings for the selected Date</p>
            </caption>

            <thead class="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    Facility
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Start
                    </th>
                    <th scope="col" class="px-6 py-3">
                    End
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
                    bdatas
                    ?.filter(data => filterByUser(data))
                    ?.filter(data => filterByDate(data))
                    ?.map(data => {
                    return (
                        <tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                            {data?.Location} - {data?.Facility}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.bookingDate}
                        </td>

                        { <td class="px-6 py-4">
                        {data?.status == "pending" && <span class="inline-flex items-center bg-blue-800 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-800 dark:text-white">
                            <span class="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "approved" && <span class="inline-flex items-center bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "rejected" && <span class="inline-flex items-center bg-red-800 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        {data?.status == "reviewed" && <span class="inline-flex items-center bg-pink-800 text-pink-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            <span class="w-2 h-2 mr-1 bg-pink-500 rounded-full"></span>
                            {data?.status}
                        </span>}
                        </td> }

                        <td class="px-6 py-4">
                            {data?.startTime}
                        </td>

                        <td class="px-6 py-4">
                            {data?.endTime}
                        </td>

                        <td class="px-6 py-4 text-right">
                            <button onClick={() => {
                                setBookingEdit(data?.id);
                                navigate('/book_edit');}}
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</button>
                        </td>
                        </tr>
                    )
                })
                }
                
            </tbody>

        </table>
        </div>
         )
} 
