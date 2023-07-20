import React from "react";
import { useState,useEffect } from "react";
import Navbar from "../../config/navbar";
import { UserAuthentication } from "../../LoginContext";
import { useNavigate } from "react-router-dom";

export default function BookMap() {

    const {user, setLocation } = UserAuthentication();

    // gets Location data from firebase -> django and sets state for booking data
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        fetch('api/locationsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setLocations(resp))
    .catch(error => console.log(error));
    }, [])

    function locationFilterer(loc) {
        if(loc.Name === setLocation) {
            return true;
        } else {
            return false;
        }
    }

    // go to book_form button click function 
    const navigate = useNavigate();
    const buttonClickHandle = async (e) => {
        try {
            e.preventDefault();
            navigate('/book_form');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 

    // go back button click function
    const backClickHandle = async (e) => {
        try {
            e.preventDefault();
            navigate('/book_dropdown');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 

    return (
    <>
    <div className='w-full h-[1000px] bg-center bg-cover bg-utown'>
        <div>
            <Navbar name={user?.email} current={"book_dropdown"}/>
        </div>
        <div className="flex h-screen items-center justify-center">
            {locations.filter(loc => locationFilterer(loc)).map(loc => {
                return (
                    <>
                    <iframe src={loc?.mapURL} width="800" height="500" style={{border:"1px solid black"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </>
                )
            })}
        
            <button class="mx-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={backClickHandle}>
                    Go Back</button>

            <button class="mx-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={buttonClickHandle}>
                    Book Venue</button>
        </div>
        
    </div>
    </>
    )
}

