import { useEffect, useState,Fragment } from "react";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { SuccessFormModal, ErrorFormModal } from "../Book/succform";

import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const EditFacility = () => {

    const navigate = useNavigate();

    const {user} = UserAuthentication();

    // selected location
    const [location, setLocation] = useState("");
    // selected facility
    const [facName, setFacName] = useState("");

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
    }, []);

    /* HACK WAY */

    // get the collection ref itself
    const locationCollectionRef = collection(db, "Locations");
    useEffect(() => {
        // async function
        const getLocations = async () => {
            // get the collection itself
            const data = await getDocs(locationCollectionRef);
            // take out the data part only & set it
            setLocations(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getLocations();
    }, [])

    /* END OF HACK WAY */

    // gets facility data from firebase -> django and sets state for facility data
    const [facs, setfacs] = useState([]);
    useEffect(() => {
        fetch('api/facilityGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setfacs(resp))
    .catch(error => console.log(error));
    }, []);

    /* HACK WAY */

    // get the collection ref itself
    const facilityCollectionRef = collection(db, "Facilities");
    useEffect(() => {
        // async function
        const getF = async () => {
            // get the collection itself
            const data = await getDocs(facilityCollectionRef);
            // take out the data part only & set it
            setfacs(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getF();
    }, [])

    /* END OF HACK WAY */

    // gets booking data from firebase -> django and sets state for booking data
    const [bookings, setBookings] = useState([]);
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

    /* HACK WAY */

    // get the collection ref itself
    const bookingCollectionRef = collection(db, "bookings");
    useEffect(() => {
        // async function
        const getBookings = async () => {
            // get the collection itself
            const data = await getDocs(bookingCollectionRef);
            // take out the data part only & set it
            setBookings(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getBookings();
    }, [])

    /* END OF HACK WAY */

    // SELECTING FUNCTIONALITY MIGHT NOT BE WORKING IF A LOCATION HAS ONLY ONE FACILITY or if default facility is selected
    // TO SEE IF TO HAVE A FUNCTION THAT CHECKS AND AUTO ASSIGNS FOR THIS

    function deleteFacility(e){
        e.preventDefault();

        facs.map( (facility) => {
            
            // delete that facility
            if(facility.Location === location && facility.Name === facName) {
                fetch(`api/facilityDeleteById/${facility.id}`, {
                    'method' : 'delete'
                });

                /* HACK WAY */
                const deleteFac = doc(db, "Facilities", facility.id);
                deleteDoc(deleteFac);
                /* END OF HACK WAY */

            // delete all the bookings for that facility
            bookings.map( (data) => {
                if(data.Location === location && data.Facility === facName) {
                    fetch(`api/bookingsDeleteById/${data.id}`, {
                        'method' : 'delete'
                    });

                    /* HACK WAY */
                    const deleteBook = doc(db, "bookings", data.id);
                    deleteDoc(deleteBook);
                    /* END OF HACK WAY */
                }
            })            

            }
        });
    }

    return (
    <Fragment>
    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <Navbar name={user?.email} current={"StaffHome"}/>

    <div className="min-w-[800px] mx-auto my-16 p-4">

    <div class="flex items-center justify-center p-5">
        <form class="min-w-[500px]">
        <div class="w-full mb-2 "> 
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
            <select onChange={(e) => setLocation(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option class="text-sm text-gray-900 hover:bg-red-800">Select location</option>
                { // display all locations
                locations.map( data => {
                    return (<option class="text-sm text-gray-900 hover:bg-red-800" value={data.Name}>{data.Name}</option>)})
                }
            </select>
        </div>

        <div class="w-full mb-2">
            <label for="cars" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facility:</label>
            <select onChange={(e) => setFacName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option class="text-sm text-gray-900 hover:bg-red-800">Select facility</option>
                { // display all facilities for selected location
                facs.filter(data => data.Location === location)
                .map( data => {
                        return(<option class="text-sm text-gray-900 hover:bg-red-800" value={data.Name}>{data.Name}</option>)
                    })}
            </select>
        </div>

        {/* submit button */}
        <div class="px-3 py-5 flex items-center justify-center">
            <button onClick={deleteFacility} 
            class="mx-5 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Delete
            </button>

            <button  
            class="mx-6 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Edit
            </button>

            <button onClick={() => navigate('/StaffHome')} 
            class="mx-6 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Go Back
            </button>
        </div>

        </form>
    </div>

    </div>
    </div>
    </Fragment>
    )
}

export default EditFacility;