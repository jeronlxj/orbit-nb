import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./config/firebase";

const UserContext = createContext(null);

// creating useContext Hook
export const LoginContextProvider = ({children}) => {

    /* create dummy objects for testing before database integration */
    // Location & Facility objects
    const locations = [
        {
            Name: "CAPT"
        },
        {
            Name: "YALE"
        },
        {
            Name: "TEMBU"
        }
    ];

    const facilities = [
        { Name:"SR1" , Capacity:20, facilityId:1, locationName: "CAPT"},
        { Name:"SR2" , Capacity:20, facilityId:2, locationName: "CAPT" },

        { Name:"SR3" , Capacity:20, facilityId:3, locationName: "YALE"},
        { Name:"SR4" , Capacity:20, facilityId:4, locationName: "YALE" },

        { Name:"MPSH" , Capacity:30, facilityId:5, locationName: "TEMBU"},
        { Name:"SR5" , Capacity:20,  facilityId:6, locationName: "TEMBU" },
    ];

    // User object
    const [students,setStudents] = useState(
        [
            { studentId: 1, Name: "ramanen", tier:"Admin"} ,
            { studentId: 2, Name: "ramanenb", tier:"Staff"},
            { studentId: 3, Name: "jeron", tier:"Student"}
        ]
    )

    // Booking Object
    const [Bookings, setBookings] = useState(
    [
        {
            id:1, date:  '2023-06-17', startTime: '10:00:00', endTime: '11:00:00',
            status: "approved", bookingTitle: "Milestone 2", facilityId:6, studentId: 1
        },
        {
            id:2, date:  '2023-06-17', startTime: '11:00:00', endTime: '12:00:00',
            status: "pending", bookingTitle: "Milestone 1-1", facilityId:6, studentId: 1
        },
        {
            id:3, date:  '2023-06-16', startTime: '10:00:00', endTime: '11:00:00',
            status: "pending", bookingTitle: "Milestone 1-2", facilityId:6, studentId: 1
        },
        {
            id:4, date:  '2023-06-16', startTime: '11:00:00', endTime: '12:00:00',
            status: "pending", bookingTitle: "Milestone 1-4", facilityId:1, studentId: 1
        },
        {
            id:5, date:  '2023-06-15', startTime: '10:00:00', endTime: '11:00:00',
            status: "pending", bookingTitle: "Milestone 1-3", facilityId:3, studentId: 1
        }
    ]);


    // drop-down booking location & facility setters
    const [setLocation, setSelectedLocation] = useState("");
    const [setFacility, setSelectedFacility] = useState("");

    // booking to be edited setters
    const [bookingEdit, setBookingEdit] = useState("");

    /* FIREBASE FUNCTIONS & USER */
    // user object 
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // login firebase function
    const login = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout firebase function
    const logout = () => {
        return signOut(auth);
    }

    // updating user object when there is a state change to User 
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          subscribe();
        };
    }, []);

    // reset password when forgot password or just to reset
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email);
    }

    // make the props passed to all children neater 
    const loginContextValue = {
        // user & login page functions
        user, createUser, login, logout, resetPassword,
        // data 
        locations, facilities, Bookings, setBookings,
        // drop-down booking setters
        setLocation, setSelectedLocation, setFacility, setSelectedFacility,
        // User object - aka staff/student/admin
        students, setStudents,
        extractNameFromEmail,
        bookingEdit,setBookingEdit
    };

    // remove the @... from the email 
    function extractNameFromEmail(email) {
        return email.split('@')[0];
    }

    return (
        // pass down User object and signup,loginmlogout function as props
        <UserContext.Provider value={loginContextValue}>
            { children }
        </UserContext.Provider>
    );
}

// exporting the context out 
export const UserAuthentication = () => {
    return useContext(UserContext);
}