import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { useState } from "react";

const BookForm = () => {

  /* choose the correct facility & its id
  will be automatically set for them later, cannot change here */
  const { setLocation, setFacility, Bookings, facilities, setBookings } = UserAuthentication();

  // start & end Time states
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  // context doesnt know the type so we need to specify
  const facId = facilities.filter( (facility) => {
    return facility.locationName === String(setLocation) &&
     facility.Name === String(setFacility)
  }).map(x => Number(x.facilityId));


  // handle form submission
  // go to book_form button click function 
  const navigate = useNavigate();
  const submitForm = async (e) => {
      try {
          e.preventDefault();

          // function to check if booking time input has already been taken up
          Bookings.map( (booking) => {

            // checks if its the same facility id & Date
            if(booking.facilityId === facId[0] && booking.date === bookingDate) {
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

          // UPDATE ALL THE BOOKINGS
          // setBookings()

          navigate('/book_dropdown');
      } catch (e) {
          alert(e);
          navigate('/signup');
      }
      
  }; 


  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar/>

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
              for="lName"
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
              for="date"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              min="2023-05-05"
              id="date" required
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
              name="time"
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
  )
}
export default BookForm;