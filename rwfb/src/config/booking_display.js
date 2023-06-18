import { useState, useEffect, useReducer } from 'react';

import { UserAuthentication } from '../LoginContext';

import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import './calenderStyle.css';

export function ListDisplay(props) {

    const name = props.name; 
    
    // handling user navigation
    const { Bookings, setBookings } = UserAuthentication();

    // handling display of data from backend
    const [datas, setDatas] = useState([]);

    // filter datas by users - show user booking
    function filterByUser(data) {
        return data?.studentId === 1;
    }

    // gets booking data from django and sets state for booking data
    /*
    useEffect(() => {
        fetch('api/display', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setDatas(resp))
    .catch(error => console.log(error))
    }, [])
    */
    

    return(      

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {name}'s Bookings
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list display of your bookings and edit if needed</p>
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
                    Bookings?.filter(data => filterByUser(data))
                    ?.map(data => {
                    return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.date}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.facilityId}
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
                            <a href="/Book" class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</a>
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

    // handling user navigation
    const { user, Bookings } = UserAuthentication();

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
    
    const date = props.date.toDateString().substring(3);


    // filter datas by users - show user booking
    function filterByUser(data) {
        return data?.studentId === 1;
    }

    // filter datas by selected Date - show bookings only for the selected date
    function filterByDate(data) {
        // checks the respective day,month & year
        return (
            props.date.getDate() === new Date(data.date).getDate() &&
            props.date.getMonth() === new Date(data.date).getMonth() &&
            props.date.getFullYear() === new Date(data.date).getFullYear() 
        );
    }

    // handling user navigation
    const { Bookings } = UserAuthentication();

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {date}'s Bookings
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list display of the bookings for the selected Date</p>
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
                    Bookings
                    ?.filter(data => filterByUser(data))
                    ?.filter(data => filterByDate(data))
                    ?.map(data => {
                    return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.date}
                        </th>

                        <td class="px-6 py-4">
                            {data?.bookingTitle}
                        </td>

                        <td class="px-6 py-4">
                            {data?.facilityId}
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
                            <a href="/Book" class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</a>
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