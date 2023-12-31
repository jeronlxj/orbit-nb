import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../config/navbar";
import { UserAuthentication } from '../../LoginContext';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

axios.defaults.withCredentials = true;

const UserStatusEditor = () => {
    const [inputValue, setInputValue] = useState("");
    const [stud, setStud] = useState("");
    const [open, setOpen] = useState(false);
  
    const { user } = UserAuthentication();

    // setting all current students
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
    // const UserCollectionRef = collection(db, "Users");
    // useEffect(() => {
    //     // async function
    //     const getUser = async () => {
    //         // get the collection itself
    //         const data = await getDocs(UserCollectionRef);
    //         // take out the data part only & set it
    //         setStudents(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getUser();
    // }, [])

    // /* END OF HACK WAY */

    return (
        <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
        <Navbar name={user?.email} current={"StaffHome"}/>
        
        <div className="mx-1 flex h-screen items-center justify-center">


          {/* START OF SEARCH BAR */}
          <div className="w-80 font-medium h-4/6">
              
          {/* Selecting the Student */}
  
          {/* setOpen - checks if its clicked or not */}
          <div
              onClick={() => setOpen(!open)}
              className="bg-white w-full p-2 flex items-center justify-between rounded text-gray-700">

              {stud ? stud : "Select Student"}
  
              {/* Selecting the Location's symbol */}
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </div>
  
          <ul
              className={`bg-white mt-2 overflow-y-auto ${
              open ? "max-h-60" : "max-h-0"
              } `}
          >
  
              {/* Search Bar */}
              <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} className="text-gray-700" />
  
              <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder="Enter Student Name"
                  className="placeholder:text-gray-700 p-2 outline-none"
              />
              </div>

              {/* Displaying the input */}
              {students?.map((data) => (
                <li
                key={data?.Name}
                className={`p-2 text-sm hover:bg-red-700 hover:text-white
                ${
                data?.Name?.toUpperCase() === stud?.toUpperCase() &&
                "bg-red-700 text-white"
                }
                ${
                data?.Name?.toUpperCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => {
                if (data?.Name?.toUpperCase() !== stud.toUpperCase()) {
                    setStud(data?.Name);
                    setOpen(false);
                    setInputValue("");
                }
                }}
            >
                {data?.Name}
            </li>
              ))}

          </ul>

        </div>
        {/* END OF SEARCH BAR */}

        <SpecificDisplay selected={stud} />        
        </div>

        </div>
    )
}

export default UserStatusEditor;

export function SpecificDisplay(props) {

    // setting all current students
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
    // const UserCollectionRef = collection(db, "Users");
    // useEffect(() => {
    //     // async function
    //     const getUser = async () => {
    //         // get the collection itself
    //         const data = await getDocs(UserCollectionRef);
    //         // take out the data part only & set it
    //         setStudents(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getUser();
    // }, [])

    // /* END OF HACK WAY */

    // change the tier of students once selected
    const editTier = (studentId) => {
        // filter out that one selected student
        const t = students.map( obj => {

            if(obj.id === studentId && obj.Tier === "Admin") {
                return {...obj, Tier:"Student"};
            } else if(obj.id === studentId && obj.Tier === "Student") {
                return {...obj, Tier:"Admin"};
            }

            return obj;
        }).filter(obj => obj.id === studentId);

        //update tier of selected student
        fetch(`api/usersUpdate/${studentId}`, {
            'method' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "Email" : t[0].Email,
              "Location" : t[0].Location,
              "Name" : t[0].Name,
              "Tier" : t[0].Tier,
              "photoURL" : t[0].photoURL,
            })
        });

        // /* HACK WAY */

        // //update via firebase
        // const userDoc = doc(db, "Users", studentId);
        // const newFields = {
        //     Email : t[0].Email,
        //     Location : t[0].Location,
        //     Name : t[0].Name,
        //     Tier : t[0].Tier,
        //     photoURL: t[0].photoURL,
        //   };
        // updateDoc(userDoc, newFields);

        // /* END OF HACK WAY */        

        // to ensure changes are reflected immediately on the page by changing state
        const c = students.map( obj => {

            if(obj.id === studentId && obj.Tier === "Admin") {
                return {...obj, Tier:"Student"};
            } else if(obj.id === studentId && obj.Tier === "Student") {
                return {...obj, Tier:"Admin"};
            }

            return obj;
        });
        setStudents([...c]);
    }

    return (
        <div class="mx-6 overflow-x-auto shadow-md sm:rounded-lg h-4/6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-white bg-gray-800 dark:text-white dark:bg-gray-800">
                All Student/Admin
                <p class="mt-1 text-sm font-normal text-gray-400 dark:text-gray-400">Browse a list display of the students & Admin</p>
            </caption>

            <thead class="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                    studentId
                    </th>
                    <th scope="col" class="px-6 py-3">
                    tier
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    students
                    ?.filter((data) => data?.Name.includes(props.selected) === true)
                    ?.map(data => {
                    return (
                    <tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                            {data?.Name}
                        </th>

                        <td class="px-6 py-4">
                            {data?.Location}
                        </td>

                        <td class="px-6 py-4">
                        {data?.Tier == "Student" && <span class="inline-flex items-center bg-red-900 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                            {data?.Tier}
                        </span>}
                        {data?.Tier == "Admin" && <span class="inline-flex items-center bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-lg"></span>
                            {data?.Tier}
                        </span>}
                        </td>

                        <td class="px-6 py-4 text-right">
                            <button onClick={() => editTier(data?.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</button>
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

