// react hooks
import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { UserAuthentication } from '../LoginContext';
import { ErrorFormModal } from "./Book/succform";

// tailwind css object file
import  {tailw} from "../config/styles";

import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Authentication Component
const Signup = () => {

    // setting states for email & password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // store error message
    const [errorMess,setErrorMess] = useState("");

    const navigate = useNavigate();
    const { createUser } = UserAuthentication();

    // createUser function,
    const signup = async (e) => {
        try {
            e.preventDefault(); // alternate way to await
            await createUser(email, password);

            // post the user to the USERS table in firebase once they sign up
            // fetch('api/usersPOST', {
            //     'method' : 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         "Email": email,
            //         "Location": location,
            //         "Name": email.split('@')[0],
            //         "Tier": "Student"
            //     })
            //   });

              // post using firebase
              const userCollectionRef = collection(db, "Users");
              addDoc(userCollectionRef, {
                    "Email": email,
                    "Location": location,
                    "Name": email.split('@')[0],
                    "Tier": "Student"
                })

            navigate('/');
        } catch (e) {
            setErrorMess(String(e).substring(24));
            setModal(true);
        }
    }

    // set Location function
    function handleSelect(e) {
        setLocation(e.target.value);
        console.log(location);
    }

    // display location function
    const [listLocations, setListLocations] = useState([]);
    useEffect(() => {
        fetch('api/locationsGet', {
        'method' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json())
    .then(resp => setListLocations(resp))
    .catch(error => console.log(error));
    }, [])

    /* HACK WAY */

    // get the collection ref itself
    const locationCollectionRef = collection(db, "Locations");
    useEffect(() => {
        // async function
        const getl = async () => {
            // get the collection itself
            const data = await getDocs(locationCollectionRef);
            // take out the data part only & set it
            setListLocations(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getl();
    }, [])

    /* END OF HACK WAY */

    return (
        <Fragment>
        <div className={tailw.bg}>

        <div class="h-screen flex items-center justify-center">
            <div class=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up for NuNMe.</h5>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nusid@nus.edu.u" required/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>

                    <div>
                        <label for="cars" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Location:</label>
                        <select onChange={handleSelect} name="cars" id="cars" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        <option class="text-sm text-gray-900 hover:bg-red-800" >Select Location</option>
                        {listLocations?.map(loc => {
                            return (
                                <option class="text-sm text-gray-900 hover:bg-red-800" value={loc?.Name}>{loc?.Name}</option>
                            )
                        })}
                        </select>
                    </div>

                    <button onClick={signup} class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-900 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:bg-red-900">Sign up</button>
                    
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <Link to="/"> <span class="text-blue-700 hover:underline dark:text-blue-500">Login</span> </Link>
                    </div>
                    
                </form>
            </div>
            </div>
        
        </div>

        <ErrorFormModal isVisible={Modal} onClose={() => setModal(false)} 
        children={
            <>
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
              </div>

              <div class="px-1 ml-1 text-m font-normal">{errorMess}</div>

            </div>
            </>
        }

        />
        </Fragment>
    )
};

export default Signup;