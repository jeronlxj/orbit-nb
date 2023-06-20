import { useState, useEffect } from "react";
import Navbar from "../config/navbar";
import { UserAuthentication } from '../LoginContext';

const EditProfile = () => {

    const [currentUser,setCurrentUser] = useState([]);
    useEffect(() => {
        fetch('api/usersGET', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setCurrentUser(resp))
    .catch(error => console.log(error));
    }, []);

    const { user } = UserAuthentication();

    function filterByUser(data) {
        return data?.Email === user?.email;
    }

    return (
        
        <div className='w-full h-screen bg-center bg-cover bg-utown'>
        <Navbar name={"ramanenb"} current={"edit_profile"}/>
        <div className='flex items-center justify-center max-w-[1000px] mx-auto my-16 p-4 '>
        
        {currentUser?.filter(data => filterByUser(data))?.map(data => {
            return (
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 bg-gray-800">
            
            <label class="flex items-center justify-center p-5 text-lg font-semibold text-left text-white ">
                    {data?.Name}'s profile
            </label>

            <div class="bg-gray-100 rounded shadow p-6">
                <div class="pb-4">
                <label for="name" class="font-semibold text-gray-700 block pb-1">{data?.Name}</label>
                <input disabled class="bg-gray-200 border-1 rounded-r px-4 py-2 w-full" value="ramanen" />
                </div>

                <div class="pb-4">
                <label for="about" class="font-semibold text-gray-700 block pb-1">{data?.Email}</label>
                <input disabled class="bg-gray-200 border-1 rounded-r px-4 py-2 w-full" value="ramanen@gmail.com" />
                </div>

                <div class="pb-4">
                <label for="about" class="font-semibold text-gray-700 block pb-2">Tier</label>
                    <div class="mx-1.5 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{data.Tier}</span>
                </div>

                <div class="pb-4">
                    <h2 class="mb-2 font-semibold text-gray-700">Permissions:</h2>
                    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                             Make, Edit & Delete Bookings
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            Approve Bookings
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                            Change status of users
                        </li>
                    </ul>
                </div>

                <div class="pb-4">
                <label for="name" class="font-semibold text-gray-700 block pb-1">Location</label>
                <input disabled class="bg-gray-200 border-1 rounded-r px-4 py-2 w-full" value="CAPT" />
                </div>

                <div class="flex flex-col items-center">
                <button  
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Edit Profile
                </button>
                </div>

            </div>
   
            </div>
                
            )
        })}

        

        </div>
        </div>
    )
}

export default EditProfile;