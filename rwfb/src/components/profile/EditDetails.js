import { Fragment, useState, useEffect } from "react";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { SuccessFormModal, ErrorFormModal } from "../Book/succform";

import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const EditDetails = () => {

    const navigate = useNavigate();

    const { user, updateEmail } = UserAuthentication();

    // handling of selected location
    const [location, setLocation] = useState("");
    // handling of new email
    const [updatedEmail, setUpdatedEmail] = useState("");

    // for successFormModal Modal handling
    const [showModal, setShowModal] = useState(false);
    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // store error message
    const [errorMess,setErrorMess] = useState("");

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const locationCollectionRef = collection(db, "Locations");
    // useEffect(() => {
    //     // async function
    //     const getLocations = async () => {
    //         // get the collection itself
    //         const data = await getDocs(locationCollectionRef);
    //         // take out the data part only & set it
    //         setLocations(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getLocations();
    // }, [])

    // /* END OF HACK WAY */

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const bookingCollectionRef = collection(db, "bookings");
    // useEffect(() => {
    //     // async function
    //     const getBookings = async () => {
    //         // get the collection itself
    //         const data = await getDocs(bookingCollectionRef);
    //         // take out the data part only & set it
    //         setBookings(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getBookings();
    // }, [])

    // /* END OF HACK WAY */

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

    // /* HACK WAY */

    // // get the collection ref itself
    // const UserCollectionRef = collection(db, "Users");
    // useEffect(() => {
    //     // async function
    //     const getUser = async () => {
    //         // get the collection itself
    //         const data = await getDocs(UserCollectionRef);
    //         // take out the data part only & set it
    //         setCurrentUser(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    //     }

    //     // call the async function
    //     getUser();
    // }, [])

    // /* END OF HACK WAY */

    const changeDets = async (e) => {
        e.preventDefault();

        try {
            // update user table
            currentUser.map((data) => {

                // find the user w that email 
                // update firestore user table w new email & location
                if(data.Email === user?.email) {
                    console.log(data);
                    //update Email & Location of selected student
                    fetch(`api/usersUpdate/${data.id}`, {
                        'method' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                        "Email" : updatedEmail,
                        "Location" : location,
                        "Name" : data.Name,
                        "Tier" : data.Tier,
                        "photoURL" : data.photoURL,
                        })
                    });

                    // /* HACK WAY */

                    // //update via firebase
                    // const userDoc = doc(db, "Users", data.id);
                    // const newFields = {
                    //     Email : updatedEmail,
                    //     Location : location,
                    //     Name : data.Name,
                    //     Tier : data.Tier,
                    //     photoURL: data.photoURL
                    //     };
                    // updateDoc(userDoc, newFields);

                    // /* END OF HACK WAY */
                }
            })

            // update Bookings table with the new email
            bookings.map((data) => {
                if(data.UserEmail === user?.email) {
                    // update
                    fetch(`api/bookingsUpdate/${data.id}`, {
                        'method' : 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                        "Facility": data.Facility,
                        "Location": data.Location,
                        "Name": data.Name,
                        "UserEmail": updatedEmail,
                        "bookingDate": data.bookingDate,
                        "bookingTitle": data.bookingTitle,
                        "startTime": data.startTime,
                        "endTime": data.endTime,
                        "status": data.status,
                        })
                    });

                    // /* HACK WAY */

                    // //update via firebase
                    // const bookingDoc = doc(db, "bookings", data.id);
                    // const newFields = {
                    //     Facility: data.Facility,
                    //     Location: data.Location,
                    //     Name: data.Name,
                    //     UserEmail: updatedEmail,
                    //     bookingDate: data.bookingDate,
                    //     bookingTitle: data.bookingTitle,
                    //     startTime: data.startTime,
                    //     endTime: data.endTime,
                    //     status: data.status,
                    //     };
                    // updateDoc(bookingDoc, newFields);

                    // /* END OF HACK WAY */
                                        
                }

            })

            // update user email in firebase
            await updateEmail(user, updatedEmail);
            setErrorMess("User details updated");
            setShowModal(true);
        } catch(e) {
            setErrorMess(String(e));
            setModal(true);
        }
    }

    return (
    <Fragment>
    
    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"profile"} />

      <div class="flex items-center justify-center p-12">
      <form> 

        <div class="mb-5">
            <label
            for="pass"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Location:
            </label>
            <select onChange={(e) => setLocation(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option class="text-sm text-gray-900 hover:bg-red-800">Select location</option>
                { // display all locations
                locations.map( data => {
                    return (<option class="text-sm text-gray-900 hover:bg-red-800" value={data.Name}>{data.Name}</option>)})
                }
            </select>
        </div>

        <div class="mb-5">
            <label
            for="confirm"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Email
            </label>
            <input
            type="text"
            id="confirm"
            placeholder={user?.email}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            required
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
        </div>

        <div class="flex flex-col items-center">
            <button class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            onClick={changeDets}>
            Update Profile
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

export default EditDetails;