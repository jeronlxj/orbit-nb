import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UserAuthentication } from "../../LoginContext"
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";

export default function BookDropdown() {

    // setting of locations & facilities
    const { setLocation, setSelectedLocation, setFacility, setSelectedFacility,
        user, extractNameFromEmail} = UserAuthentication();

    //button click function 
    const navigate = useNavigate();
    const buttonClickHandle = async (e) => {
        try {
            e.preventDefault();
            navigate('/book_calendar');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 

    return (
        <>
        <Navbar current={"book_dropdown"}/>
        <div className="w-full h-screen bg-center bg-cover bg-utown flex h-screen items-center justify-center">
            <SelectLocation setLocation={setLocation} setSelectedLocation={setSelectedLocation}/>
            <SelectFacility setFacility={setFacility} setSelectedFacility={setSelectedFacility} setLocation={setLocation}/>
            <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={buttonClickHandle}>Check Venue Status</button> 
        </div>
        </>
    )
}

// dropdown to select the location eg: CAPT/TEMBU
const SelectLocation = (props) => {

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
  
    const { locations } = UserAuthentication();
  
    return (
      <div className="mx-1 flex h-screen items-center justify-center">
          <div className="w-72 font-medium h-80">
              
          {/* Selecting the Location */}
  
          {/* setOpen - checks if its clicked or not */}
          <div
              onClick={() => setOpen(!open)}
              className="bg-white w-full p-2 flex items-center justify-between rounded text-gray-700">
              
              {/* Shortens the Displayed result if its too long */}
              {props.setLocation
              ? props.setLocation?.length > 25
                  ? props.setLocation?.substring(0, 25) + "..."
                  : props.setLocation
              : "Select Location"}
  
              {/* Selecting the Location's symbol */}
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </div>
  
          <ul
              className={`bg-white mt-2 overflow-y-auto ${
              open ? "max-h-60" : "max-h-0"
              } `}
          >
  
              {/* Search Bar */}
              <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} className="text-gray-700" />
  
              <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder="Enter location name"
                  className="placeholder:text-gray-700 p-2 outline-none"
              />
              </div>
  
              {/* Displaying the input */}
              {locations?.map((data) => (
              <li
                  key={data?.Name}
                  className={`p-2 text-sm hover:bg-red-700 hover:text-white
                  ${
                  data?.Name?.toUpperCase() === props.setLocation?.toUpperCase() &&
                  "bg-red-700 text-white"
                  }
                  ${
                  data?.Name?.toUpperCase().startsWith(inputValue)
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                  if (data?.Name?.toUpperCase() !== props.setLocation.toUpperCase()) {
                      props.setSelectedLocation(data?.Name);
                      setOpen(false);
                      setInputValue("");
                  }
                  }}
              >
                  {data?.Name}
              </li>
              ))}
          </ul>
          </div>
      </div>
    );
  };

  // dropdown to select the facility in that location
  // select SR1 from selected location eg: CAPT
  // facilities will be displayed based on location selected
  const SelectFacility = (props) => {

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
  
    const { facilities } = UserAuthentication();
  
    return (
      <div className="px-1 flex h-screen items-center justify-center">
          <div className="w-72 font-medium h-80">
              
          {/* Selecting the Facility */}
  
          {/* setOpen - checks if its clicked or not */}
          <div
              onClick={() => setOpen(!open)}
              className="bg-white w-full p-2 flex items-center justify-between rounded text-gray-700">
              
              {/* Shortens the Displayed result if its too long */}
              {props.setFacility
              ? props.setFacility?.length > 25
                  ? props.setFacility?.substring(0, 25) + "..."
                  : props.setFacility
              : "Select Facility"}
  
              {/* Selecting the Facility's symbol */}
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </div>
  
          <ul
              className={`bg-white mt-2 overflow-y-auto ${
              open ? "max-h-60" : "max-h-0"
              } `}
          >
  
              {/* Search Bar */}
              <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} className="text-gray-700" />
  
              <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder="Enter Facility name"
                  className="placeholder:text-gray-700 p-2 outline-none"
              />
              </div>
  
              {/* Displaying the input */}
              {facilities?.filter(data => data.locationName === props.setLocation)
              .map( (data) => (
              <li
                  key={data?.Name}
                  className={`p-2 text-sm hover:bg-red-700 hover:text-white
                  ${
                  data?.Name?.toUpperCase() === props.setFacility?.toUpperCase() &&
                  "bg-red-700 text-white"
                  }
                  ${
                  data?.Name?.toUpperCase().startsWith(inputValue)
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                  if (data?.Name?.toUpperCase() !== props.setLocation.toUpperCase()) {
                      props.setSelectedFacility(data?.Name);
                      setOpen(false);
                      setInputValue("");
                  }
                  }}
              >
                  {data?.Name}
              </li>
              ))
              }
          </ul>
          </div>
      </div>
    );
  };

