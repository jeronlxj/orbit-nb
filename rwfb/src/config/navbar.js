import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { UserAuthentication } from '../LoginContext';

import { db } from "./firebase";
import { collection, getDocs } from 'firebase/firestore';

axios.defaults.withCredentials = true;

export default function Navbar(props) {

    // handling user navigation
    const { logout, user } = UserAuthentication();
    const navigate = useNavigate();

    // check if you are in the current page or not
    const currentPage = "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500";
    const otherPage = "block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

    function checkCurrentPage(thisButton) {
        if (String(props.current) === thisButton) {
            return currentPage;
        } else {
            return otherPage;
        }
    };

    // check if current user is an Admin, if so set bool to true
    let checker = "Student";

    // gets user table data from firebase -> django and sets state for booking data
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch('api/usersGET', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setStudents(resp))
    .catch(error => console.log(error));
    }, []);

    // /* HACK WAY */

    // // get the collection ref itself
    // const userCollectionRef = collection(db, "Users");
    // useEffect(() => {
    //     // async function
    //     const getUsers = async () => {
    //         // get the collection itself
    //         const data = await getDocs(userCollectionRef);
    //         // take out the data part only & set it
    //         setStudents(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //         console.log(students);
    //     }

    //     // call the async function
    //     getUsers();
    // }, [])

    // /* END OF HACK WAY */

    try {
        students.map( student => {
            // get the current user
            if(String(student.Email) === user?.email) {
                // check if current user is an Admin or not
                if(String(student.Tier) === "Admin") {
                    checker = "Admin";
                } else if(String(student.Tier) === "Staff") {
                    checker = "Staff";
                }
            }
        })
    } catch {
        console.log("oops cannot check admin or not");
    }

    // handle logout
    const handleLogout = async (e) => {
        try {
            e.preventDefault();  
            await logout(auth);
            navigate('/');
        } catch (e) {
            alert("hey logout issue");
        }
      }; 

    return (  
        <div> 
        <nav class="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">NuNme.</span>
        
        <div class="flex md:order-2">
            <button type="button" onClick={handleLogout} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>

            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <a href="/Home" class={checkCurrentPage("Home")}>Home</a>
            </li>
            <li>
                <a href="/dashboard" class={checkCurrentPage("Dashboard")}>Stats</a>
            </li>
            <li>
                <a href="/profile" class={checkCurrentPage("profile")}>Profile</a>
            </li>
            <li>
                <a href="/book_dropdown" class={checkCurrentPage("book_dropdown")}>Book</a>
            </li>
            <li>
                <a href="/chatHome" class={checkCurrentPage("chatHome")}>Chat</a>
            </li>

            {
                (checker === "Admin") && 
                <li>
                    <a href="/approve" class={checkCurrentPage("approve")}>Approve</a>
                </li>
            }

            {
                (checker === "Staff") && 
                <li>
                    <a href="/staffapprove" class={checkCurrentPage("approve")}>Approve</a>
                </li>
            }

            {
                (checker === "Staff") && 
                <li>
                    <a href="/StaffHome" class={checkCurrentPage("StaffHome")}>Staff</a>
                </li>
            }

            </ul>
        </div>
        </div>
        </nav> 
        </div>  
    )};