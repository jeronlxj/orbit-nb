import Navbar from "../../config/navbar";

const BookForm = () => {
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
              Last Name
            </label>
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Last Name" required
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
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* Time */}
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <label
              for="time"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Start Time
            </label>
            <input
              type="time"
              name="time"
              step="1800"
              id="time"
              min="08:00" required
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>

          <div class="w-full px-3 sm:w-1/2">
            <label
              for="time"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              End Time
            </label>
            <input
              type="time"
              name="time"
              step="1800"
              id="time"
              min="08:00" required
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
          </div>
        </div>

        {/* submit button */}
        <div class="px-3 py-5 flex flex-col items-center">
            <button
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