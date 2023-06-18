import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../config/navbar";
import { UserAuthentication } from '../LoginContext';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

axios.defaults.withCredentials = true;

const UserStatusEditor = () => {
    const [inputValue, setInputValue] = useState("");
    const [stud, setStud] = useState("");
    const [open, setOpen] = useState(false);
  
    const { user, students } = UserAuthentication();

    // remove the @... from the email 
    function extractNameFromEmail(email) {
        return email.split('@')[0];
    }
    let name = "temp"
    try {
        name = extractNameFromEmail(user?.email);
    } catch {
        console.log("failed extraction of name f")
    }

    return (
        <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
        <Navbar name={name} current={"staff"}/>
        
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

        <SpecificDisplay selected={stud}/>        
        </div>

        </div>
    )
}

export default UserStatusEditor;

export function SpecificDisplay(props) {

    const { setStudents, students } = UserAuthentication();

    // change the tier of students once selected
    const editTier = (studentId) => {
        const t = students.map( obj => {

            if(Number(obj.studentId) === studentId && String(obj.tier) === "Admin") {
                return {...obj, tier:"Student"};
            } else if(Number(obj.studentId) === studentId && String(obj.tier) === "Student") {
                return {...obj, tier:"Admin"};
            }

            return obj;
        });
        // update tier of selected student
        setStudents([...t]);
    }

    useEffect(() => {

    },[students]);

    return (
        <div class="mx-6 overflow-x-auto shadow-md sm:rounded-lg h-4/6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                All Student/Admin
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list display of the students & Admin</p>
            </caption>

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data?.Name}
                        </th>

                        <td class="px-6 py-4">
                            {data?.studentId}
                        </td>

                        <td class="px-6 py-4">
                        {data?.tier == "Student" && <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                            {data?.tier}
                        </span>}
                        {data?.tier == "Admin" && <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 mr-1 bg-green-500 rounded-lg"></span>
                            {data?.tier}
                        </span>}
                        </td>

                        <td class="px-6 py-4 text-right">
                            <button onClick={() => editTier(data?.studentId)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300">Edit</button>
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

