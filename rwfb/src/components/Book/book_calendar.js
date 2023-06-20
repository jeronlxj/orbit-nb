import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// style our big-calender
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/Book/bookCalender.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import moment from "moment";

const locales = {
    "en-US" : require("date-fns/locale/en-US")
}

// to handle the localisation of the date formatting
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// array of events
const events = []; 

export default function BookCalendar() {
    // adding states
    const { setLocation, setFacility, user, extractNameFromEmail } = UserAuthentication();

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

    // map all bookings and add those that match that location & facility
    bookings.map((booking) => {
    
        const temp = {
            title: booking.bookingTitle,
            start: moment(booking.bookingDate.concat("T", booking.startTime)).toDate(),
            end: moment(booking.bookingDate.concat("T", booking.endTime)).toDate(),
            data: {
                type: booking.status,
                fac: booking.Facility,
                loc: booking.Location
            },
        }
        if(temp.data.fac === setFacility && temp.data.loc === setLocation) {
                events.push(temp);
        }
    });

    console.log(events);

    // go to book_form button click function 
    const navigate = useNavigate();
    const buttonClickHandle = async (e) => {
        try {
            e.preventDefault();
            navigate('/book_form');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 

    // go back button click function
    const backClickHandle = async (e) => {
        try {
            e.preventDefault();
            navigate('/book_dropdown');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 
    
    // components - aka change bg colour of displayed event based on status of booking
    const components = {
        event: (props) => {
            const eventType = String(props?.event?.data?.type);
            console.log(eventType);
    
            switch(eventType) {
                case "approved":
                    return (
                        <div style={{ border:"1px", background: "green", color: "white", height:'100%'}}>
                            {props.title}
                        </div>
                    )
                default:
                    return (
                        <div style={{ border:"1px", background: "brown", color: "white", height:'100%'}}>
                            {props.title}
                        </div>
                )
            }
        }
    }

    return (
        <div className='w-full h-screen bg-center bg-cover bg-utown'>
        <div>
            <Navbar name={extractNameFromEmail(user?.email)} current={"book_dropdown"}/>
        </div>
        <div class="flex items-center justify-center">
            <Calendar localizer={localizer} events={events} 
            startAccessor="start" endAccessor="end" style={{height:460 , width:900, margin: 80, background: "white"}} 
            components={components} views={["month", "week", "day"]} />
        </div>
        <div class="flex items-center justify-center">
        <button class="mx-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={backClickHandle}>
                Go Back</button>

        <button class="mx-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={buttonClickHandle}>
                Book Venue</button>
        </div>
        
        </div>
    )
}

/* context doesnt know the what facility to take data from so we need to specify
    const facId = facilities.filter( (facility) => {
        return facility.locationName === String(setLocation) &&
         facility.Name === String(setFacility)
    }).map(x => Number(x.facilityId));

    // facId[0] as facId is given as an array 
    

    // check if booking is already in events or not, NO REPEATS
    // x is basically the id of the array
    // so to access the event use events[x]
    function containsBooking(temp, events) {
        var x;
        for (x in events) {
            if (events[x].title === temp.title) {
                return true;
            }
        }
        return false;
    }
    */