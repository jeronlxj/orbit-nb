import { useState, useEffect, Fragment } from 'react';
import { UserAuthentication } from "../../LoginContext"
import Navbar from '../../config/navbar';
import { useNavigate } from "react-router-dom";
import { SuccessFormModal, ErrorFormModal } from "./succform";

const BookEdit = () => {

    const navigate = useNavigate();
    const { bookingEdit, setBookingEdit } = UserAuthentication();
  
    // for successFormModal Modal handling
    const [showModal, setShowModal] = useState(false);
    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // selected booking
    const [booking, setBooking] = useState({});

    // get the specific booking from the database based on the ID
    useEffect(() => {
      fetch(`api/bookingsGetById/${bookingEdit}`, {
      'method' : 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => setBooking(resp))
    .catch(error => console.log(error));
    }, [])

    // set states for date,starttime & endtime , title so that they can edit
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [title, setTitle] = useState("");

    function editBooking() {
      // update
      fetch(`api/bookingsUpdate/${bookingEdit}`, {
        'method' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "Facility": booking.Facility,
          "Location": booking.Location,
          "Name": booking.Name,
          "UserEmail": booking.UserEmail,
          "bookingDate": bookingDate,
          "bookingTitle": title,
          "startTime": startTime,
          "endTime": endTime,
          "status": "pending",
        })
    });

      setShowModal(true);
    }

    function deleteBooking() {
      // update
      fetch(`api/bookingsDeleteById/${bookingEdit}`, {
        'method' : 'delete'
      });

      setModal(true);
    }

    return (
    <Fragment>
      <div className='w-full h-[1000px] bg-center bg-cover bg-utown'>
      <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar name={"ramanen"} current={"book_dropdown"} />

      <div class="flex items-center justify-center p-12">
      <form>        

      
      <dl class="px-3 py-5 max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
          <div class="flex flex-col pb-3">
              <dt class="mb-3 block text-base font-medium text-[#07074D]">Current Booking Title</dt>
              <dd class="text-lg font-semibold">{booking.bookingTitle} </dd>
          </div>
          <div class="flex flex-col py-3">
              <dt class="mb-3 block text-base font-medium text-[#07074D]">Current Booking Date</dt>
              <dd class="text-lg font-semibold">{booking.bookingDate} </dd>
          </div>
          <div class="flex flex-col pt-3">
              <dt class="mb-3 block text-base font-medium text-[#07074D]">Current Booking Period</dt>
              <dd class="text-lg font-semibold">{booking.startTime} - {booking.endTime} </dd>
          </div>
      </dl>

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
              value = {booking.Name}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* title name */}
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
              placeholder= {booking.bookingTitle} 
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder = {booking.bookingDate}
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
              placeholder = {booking.startTime}
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
              placeholder = {booking.endTime}
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
              value={booking.Location}
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
              value={booking.Facility}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* submit button */}
        <div class="px-3 py-5 flex items-center justify-center">
            <button onClick={deleteBooking} 
            class="mx-5 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Delete
            </button>

            <button onClick={editBooking} 
            class="mx-6 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Edit
            </button>

            <button onClick={() => navigate('/Home')} 
            class="mx-6 h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            >
            Go Back
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

              <div class="px-1 ml-1 text-m font-normal"> Your booking has been edited </div>

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
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
            </div>

              <div class="px-1 ml-1 text-m font-normal">Your booking has been deleted</div>

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

export default BookEdit;