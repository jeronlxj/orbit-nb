import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// style our big-calender
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../components/Book/bookCalender.css";
import DatePicker from "react-datepicker";
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
    const { Bookings, setBookings } = UserAuthentication();


    /* choose the correct facility & its id */
    const { facilities, setLocation, setSelectedLocation,
         setFacility, setSelectedFacility } = UserAuthentication();

    // context doesnt know the type so we need to specify
    const facId = facilities.filter( (facility) => {
        return facility.locationName === String(setLocation) &&
         facility.Name === String(setFacility)
    }).map(x => Number(x.facilityId));

    // facId[0] as facId is given as an array
    console.log(facId[0]);
    
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


    // addings in bookings to events
    useEffect(() => {
    // map all bookings and add those that match that location 
    Bookings.map((booking) => {
        
        const temp = {
            title: booking.bookingTitle,
            start: moment(booking.date.concat("T", booking.startTime)).toDate(),
            end: moment(booking.date.concat("T", booking.endTime)).toDate(),
            data: {
                type: booking.status,
                id: booking.facilityId,
            },
        }
        // check if there are any repeats
        if (containsBooking(temp, events)) {
        } else {
            // check if the booking is for the correct facility and add it in
            if(temp.data.id === facId[0]) {
                events.push(temp);

            }
        }
    });
    });

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

    // components - aka change bg colour based on status of booking
    const components = {
        event: (props) => {
            const eventType = String(props?.event?.data?.status);
    
            switch(eventType) {
                case "approved":
                    return (
                        <div style={{ background: "lightgreen", color: "white", height:'100%'}}>
                            {props.title}
                        </div>
                    )
                default:
                    return (
                        <div style={{ background: "brown", color: "white", height:'100%'}}>
                            {props.title}
                        </div>
                )
            }
        }
    }

    return (
        <>
        <div>
            <Navbar/>
        </div>
        <div class="h-screen flex items-center justify-center">
            <Calendar localizer={localizer} events={events} 
            startAccessor="start" endAccessor="end" style={{height:500 , width:900, margin: 80}} 
            components={components} views={["month", "week", "day"]} />

            <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={buttonClickHandle}>
                Book Venue</button>
        </div>
        </>
    )
}