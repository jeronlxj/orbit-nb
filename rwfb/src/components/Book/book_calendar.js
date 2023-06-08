import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// style our big-calender
import "react-big-calendar/lib/css/react-big-calendar.css";
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

    // check if booking is already in events or not
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
    Bookings.map((booking) => {
        const temp = {
            title: booking.bookingTitle,
            start: moment(booking.date.concat("T", booking.startTime)).toDate(),
            end: moment(booking.date.concat("T", booking.endTime)).toDate(),
        }
        if (containsBooking(temp, events)) {
        } else {
            events.push(temp);
        }
    });
    });

    //button click function 
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

    return (
        <>
        <div>
            <Navbar/>
        </div>
        <div class="h-screen flex items-center justify-center">
            <Calendar localizer={localizer} events={events} 
            startAccessor="start" endAccessor="end" style={{height:500 , width:800, margin: 80}} />
            <button class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={buttonClickHandle}>
                Book Venue</button>
        </div>
        </>
    )
}