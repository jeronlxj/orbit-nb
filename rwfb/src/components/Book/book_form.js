import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { Fragment, useEffect, useState } from "react";
import { ErrorFormModal, SuccessFormModal} from "./succform";
import axios from 'axios';

const BookForm = () => {

  /* choose the correct facility & its id
  will be automatically set for them later, cannot change here */
  const { setLocation, setFacility,
    extractNameFromEmail, user } = UserAuthentication();

  const hisName = extractNameFromEmail(user?.email)

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

  const submitForm = (e) => {

      try {
          e.preventDefault();

          /* FORM VALIDATION */

          // function to check if booking time input has already been taken up
          Bookings.map( (booking) => {

          // checks if its the same facility, Location & Date
          if(booking.Facility === setFacility && booking.Location === setLocation && booking.bookingDate === bookingDate) {
            // check to see if the time is taken up or not
            if( 
            Number(booking.startTime.substring(0,2)) >=  Number(startTime.substring(0,2)) && 
            Number(booking.startTime.substring(3,5)) >= Number(startTime.substring(3,5)) &&  
            Number(booking.endTime.substring(0,2)) <=  Number(endTime.substring(0,2)) && 
            Number(booking.endTime.substring(3,5)) <= Number(startTime.substring(3,5)) 
            ) {
              // throw an error if timing has been taken up !
              throw new Error('Venue has been booked for part of the time already!');
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
              "Name": hisName,
              "UserEmail": user?.email,
              "bookingDate": bookingDate,
              "bookingTitle": e.target.form.bookingTitle.value,
              "startTime": startTime,
              "endTime": endTime,
              "status": "pending",        
            })
            });

          setShowModal(true);
          

      // if there are any errors in the form submission, display the errorModal
      // console.log the error
      } catch (e) {
          setErrorMess(String(e));
          setModal(true);
      }
      
  }; 

  // update Bookings
  // useEffect( () => {
  // }, [Bookings]);
  

  return (
    <Fragment>

    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar name={hisName} current={"book_dropdown"} />

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
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
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
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Warning icon</span>
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
export default BookForm;

    // // UPDATE ALL THE BOOKINGS
          // // get the data from the form itself - this is the only way that works
          // const currentBooking = 
          // {
          //   id:6, date:bookingDate, startTime:startTime, endTime:endTime, 
          //   status: "pending", bookingTitle:e.target.form.bookingTitle.value, facilityId:facId[0],
          //   // hardcoded
          //   studentId: 1,
          // }

          // // push the new Booking and update the state of Booking
          
          // setBookings([...Bookings,currentBooking]);

           // // context doesnt know the type so we need to specify
  // const facId = facilities.filter( (facility) => {
  //   return facility.locationName === String(setLocation) &&
  //    facility.Name === String(setFacility)
  // }).map(x => Number(x.facilityId));

