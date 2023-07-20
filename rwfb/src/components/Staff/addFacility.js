import { useEffect, useState,Fragment } from "react";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { SuccessFormModal, ErrorFormModal } from "../Book/succform";

import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc,
   getDoc, deleteDoc } from 'firebase/firestore';

const AddFacility = () => {
    const navigate = useNavigate();

    const {user} = UserAuthentication();

    // for successFormModal Modal handling
    const [showModal, setShowModal] = useState(false);
    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // store error message
    const [errorMess,setErrorMess] = useState("");

    // selected location
    const [location, setLocation] = useState("");
    // Name of facility
    const [facName, setFacName] = useState("");

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const facilityCollectionRef = collection(db, "Facilities");
    // useEffect(() => {
    //     // async function
    //     const getF = async () => {
    //         // get the collection itself
    //         const data = await getDocs(facilityCollectionRef);
    //         // take out the data part only & set it
    //         setfacs(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getF();
    // }, [])

    // /* END OF HACK WAY */

    const submitForm = (e) => {
        try {
            e.preventDefault();

            facs.map( (facility) => {
                if(location === facility.Location && facility.Name === facName) {
                    throw new Error("This facility already exists");
                } else if(facName === "") {
                    throw new Error("Facility Name is empty");
                } else if(location === "") {
                    throw new Error("No location selected");
                }
            });

            fetch('api/facilityPOST', {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                  "TotalPax": "14",
                  "Location": location,
                  "Name": facName,     
                })
                });

            // // post using firebase
            // const facCollectionRef = collection(db, "Facilities");
            // addDoc(facCollectionRef, {
            //     TotalPax: "14",
            //     Location: location,
            //     Name: facName,     
            //   })

            setErrorMess("Facility has been added");
            setShowModal(true);

        } catch (e) {
            setErrorMess(String(e));
            setModal(true);
        }

    }

    return (
    <Fragment>
    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <Navbar name={user?.email} current={"StaffHome"}/>
    <div className="max-w-[800px] mx-auto my-16 p-4">

    <div class="flex items-center justify-center p-5">

        <form>
        <div class="mb-3">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Location </label>

        <ul class="items-center min-w-[500px] text-sm font-medium text-gray-900 bg-gray-700 border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("TEMBUSU")} type="radio" value="TEMBUSU" name="rad" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">TEMBUSU</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("CAPT")} type="radio" value="CAPT" name="rad" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CAPT</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("RC4")} type="radio" value="RC4" name="rad" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">RC4</label>
                </div>
            </li>
            <li class="w-full dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("YALE")} type="radio" value="YALE" name="rad" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">YALE</label>
                </div>
            </li>
        </ul>
        </div>

        <div class="mb-3">
        <ul class="items-center min-w-[500px] text-sm font-medium text-gray-900 bg-gray-700 border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white" >
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("RVRC")} type="radio" value="RVRC" name="rad" class="w-4 h-4 text-indigo-800 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">RVRC</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("ERC")} type="radio" value="ERC-L1" name="rad" class="w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ERC-L1</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("ERC")} type="radio" value="ERC-L2" name="rad" class="w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ERC-L2</label>
                </div>
            </li>
            <li class="w-full dark:border-gray-600">
                <div class="flex items-center pl-4">
                    <input onChange={() => setLocation("ERC")} type="radio" value="ERC-L3" name="rad" class="w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ERC-L3</label>
                </div>
            </li>
        </ul>
        </div>

        <label class="mb-3 block text-base font-medium text-[#07074D]"> Selected location: <span class="text-red-600">{location}</span> </label>

        {/* Total Number of Pax using */}
        <div class="mb-5">
            <label
            for="Pax"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Total Number of Pax
            </label>
            <input
            type="number"
            name="Pax"
            id="Pax"
            min="0"
            placeholder="20"
            max="20" required
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-gray-700 py-3 px-6 text-base font-medium text-white outline-none focus:border-[#B9261C] focus:shadow-md"
            />
        </div>

        {/* Total Number of Pax using */}
        <div class="mb-5">
            <label
            for="Pax"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Name of Facility
            </label>
            <input
            type="text"
            name="Name"
            id="Name"
            required
            onChange={(e) => setFacName(e.target.value)}
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-gray-700 py-3 px-6 text-base font-medium text-white outline-none focus:border-[#B9261C] focus:shadow-md"
            />
        </div>

        {/* submit button */}
        <div class="px-3 py-5 flex flex-col items-center">
            <button onClick={submitForm} 
            class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Submit
            </button>
        </div>
        
        </form>

        </div>

    </div>
    </div>
    <SuccessFormModal isVisible={showModal} onClose={() => setShowModal(false)} 
        children={
            <>
              <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-200 bg-green-800 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </div>

              <div class="px-1 ml-1 text-m font-normal"> {errorMess} </div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  navigate('/Home');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Home
                </button>
              </div>

            </div>
            </>
        }
        />

    <ErrorFormModal isVisible={Modal} onClose={() => setModal(false)} 
        children={
            <>
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-800 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
            </div>

              <div class="px-1 ml-1 text-m font-normal">{errorMess}</div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  setShowModal(false);
                  navigate('/Home');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Home
                </button>
              </div>

            </div>
            </>
        }

        />
    </Fragment>
    )
}

export default AddFacility;