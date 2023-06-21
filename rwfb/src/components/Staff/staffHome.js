import { useEffect, useState } from "react";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";

// svg link
// https://gist.github.com/leMaur/d2131aa3bddf9c8ccd220df0a5c15bce

const StaffHome = () => {
    const navigate = useNavigate();

    return (
    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <Navbar name={"ramanenb"} current={"staff"}/>
        
    <div className="mx-1 flex h-screen items-center justify-center">
        
    <div class="px-3 md:lg:xl:px-40 border-t border-b py-20 bg-opacity-10">
        <div class="grid grid-cols-1 md:lg:xl:grid-cols-2 bg-white rounded-lg ">

            <div class="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-100" onClick={() => navigate('/staff')}>
                <span class="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>
                <p class="text-semibold font-medium text-slate-700 mt-3">Edit User Status</p>
                <p class="mt-2 text-sm text-slate-500">Change User status from "Student" to "Admin" and vice versa <br></br> - to edit their approved permissions.</p>
            </div>

            <div
                class="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-100">
                <span class="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </span>
                <p class="text-semibold font-medium text-slate-700 mt-3">Add Facility</p>
                <p class="mt-2 text-sm text-slate-500">Add a new Facility to a Location in Utown</p>
            </div>

            <div
                class="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-100">
                <span class="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </span>
                <p class="text-semibold font-medium text-slate-700 mt-3">Edit Facility</p>
                <p class="mt-2 text-sm text-slate-500">Update Facility details</p>
            </div>

        </div>
    </div>

    </div>
    </div>
    )
}
export default StaffHome;