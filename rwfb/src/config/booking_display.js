import { useState, useEffect } from 'react';

import { UserAuthentication } from '../LoginContext';

import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import './calenderStyle.css';

export function ListDisplay() {
    // handling user navigation
    const { user} = UserAuthentication();

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

    // handling display of data from backend
    const [datas, setDatas] = useState([]);

    // filter datas by users - show user booking
    function filterByUser(data) {
        return data.host.toLowerCase() === name.toLowerCase();
    }

    // gets booking data from django and sets state for booking data
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
                        name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        location
                    </th>
                    <th scope="col" class="px-6 py-3">
                        total_pax
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    datas.filter(data => filterByUser(data)).map(data => {
                    return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data.name}
                        </th>
                        <td class="px-6 py-4">
                            {data.location}
                        </td>
                        <td class="px-6 py-4">
                            {data.total_pax}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="/Book" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
          
        </div>
         )
} 