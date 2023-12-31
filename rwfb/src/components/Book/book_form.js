import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { Fragment, useEffect, useState } from "react";
import { ErrorFormModal, SuccessFormModal} from "./succform";
import axios from 'axios'

import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const BookForm = () => {

  /* choose the correct facility & its id
  will be automatically set for them later, cannot change here */
  const { setLocation, setFacility, user } = UserAuthentication();

  // for successFormModal Modal handling
  const [showModal, setShowModal] = useState(false);
  // for errorFormModal Modal handling
  const [Modal, setModal] = useState(false);
  // store error message
  const [errorMess,setErrorMess] = useState("");

  // start & end Time states
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  /* handle form submission */
  // go to book_form button click function 
  const navigate = useNavigate();

  // gets booking data from firebase -> django and sets state for booking data
  const [Bookings, setBookings] = useState([]);
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

  const submitForm = (e) => {

      try {
          e.preventDefault();

          /* FORM VALIDATION */

          Bookings.map( (booking) => {

          // checks if its the same facility, Location & Date
          if(booking.bookingDate === bookingDate && booking.Facility === setFacility &&
             booking.Location === setLocation && booking.status !== "rejected") {
            // check to see if the time is taken up or not

            // get the form & each booking's start & end time in terms of minutes from 00:00
            const formStartTime = Number(startTime.substring(0,2)) * 60 + Number(startTime.substring(3,5));
            const formEndTime = Number(endTime.substring(0,2)) * 60 + Number(endTime.substring(3,5));
            const bStartTime = Number(booking.startTime.substring(0,2)) * 60 + Number(booking.startTime.substring(3,5));
            const bEndTime = Number(booking.endTime.substring(0,2)) * 60 + Number(booking.endTime.substring(3,5));
          
            if( 
              // if form start time is in the middle of booking period
              (bStartTime > formStartTime && bStartTime < formEndTime) ||
              // if form  start time is equal to start of booking period
              (bStartTime === formStartTime ) ||
              // if form end time is in the middle of booking period
              (bEndTime > formStartTime && bStartTime < formEndTime) ||
              // if form  end time is equal to end of booking period
              (bEndTime === formEndTime ) 
            ) {
              // throw an error if timing has been taken up !
              throw new Error('Venue has been booked for part of the time!');
            }
          }

          });

          if(e.target.form.bookingTitle.value === "") throw new Error("The bookingTitle field is empty");
          else if(startTime === "") throw new Error("The startTime field is empty");
          else if (endTime === "") throw new Error("The endTime field is empty");
          else if (bookingDate === "") throw new Error("The bookingDate field is empty");

          /* END OF FORM VALIDATION */

          fetch('api/bookingsPOST', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
              "Facility": setFacility,
              "Location": setLocation,
              "Name": e.target.form.fName.value,
              "UserEmail": user?.email,
              "bookingDate": bookingDate,
              "bookingTitle": e.target.form.bookingTitle.value,
              "startTime": startTime,
              "endTime": endTime,
              "status": "pending",        
            })
            });

            // // post using firebase
            // const bookCollectionRef = collection(db, "bookings");
            // addDoc(bookCollectionRef, {
            //   Facility: setFacility,
            //   Location: setLocation,
            //   Name: e.target.form.fName.value,
            //   UserEmail: user?.email,
            //   bookingDate: bookingDate,
            //   bookingTitle: e.target.form.bookingTitle.value,
            //   startTime: startTime,
            //   endTime: endTime,
            //   status: "pending",        
            // })

          setShowModal(true);
          

      // if there are any errors in the form submission, display the errorModal
      // console.log the error
      } catch (e) {
          setErrorMess(String(e));
          setModal(true);
      }
      
  }; 

  return (
    <Fragment>

    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"book_dropdown"} />

      <div class="flex items-center justify-center p-12">
      <form>        
    
      {/* Name section */}
      <div class="-mx-3 flex flex-wrap">

        {/* First name */}
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="fName"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              First Name
            </label>
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="First Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* Last name name */}
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="bookingTitle"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Booking Title
            </label>
            <input
              type="text"
              name="bookingTitle"
              id="bookingTitle"
              placeholder="Booking Title" required
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>
      </div>

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
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
        />
      </div>

      {/* Date */}
        <div class="w-full sm:w-1/2">
          <div class="mb-5">
            <label
              for="Dates"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              type="date"
              name="Dates"
              min="2023-05-05"
              id="Dates" required
              onChange={(e) => setBookingDate(e.target.value)}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* Time */}
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <label
              for="StartTime"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Start Time
            </label>
            <input
              type="time"
              name="StartTime"
              step="1800"
              id="StartTime"
              min="08:00" required
              onChange={(e) => setStartTime(e.target.value)}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>

          <div class="w-full px-3 sm:w-1/2">
            <label
              for="EndTime"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              End Time
            </label>
            <input
              type="time"
              name="EndTime"
              step="1800"
              id="EndTime"
              min="08:00" required
              onChange={(e) => setEndTime(e.target.value)}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* Location & Facility -> autofilled based on selected options */}
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <label
              for="Location"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Location
            </label>
            <input
              type="Location"
              name="Location"
              id="Location"
              value={String(setLocation)}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>

          <div class="w-full px-3 sm:w-1/2">
            <label
              for="Facility"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Facility
            </label>
            <input
              type="text"
              name="Facility"
              id="Facility"
              value={String(setFacility)}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
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

              <div class="px-1 ml-1 text-m font-normal">Booking submitted.</div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  setShowModal(false);
                  navigate('/book_dropdown');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Book
                </button>
              </div>

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
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-800 rounded-lg focus:shadow-outline hover:bg-red-800"
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
export default BookForm;

 
