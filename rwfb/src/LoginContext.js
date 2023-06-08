import { createContext, useContext, useEffect, useState } from 'react';
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
        { studentId: 1, Name: "ramanen"} ,
        { studentId: 2, Name: "ramanenb"},
        { studentId: 3, Name: "jeron"}
    )

    // Booking Object
    const [Bookings, setBookings] = useState(
    [
        {
            id:1, date:  '2023-06-13', startTime: '10:00:00', endTime: '11:00:00',
            status: "pending", bookingTitle: "Milestone 2", facilityId:6, studentId: 1
        },
        {
            id:2, date:  '2023-06-12', startTime: '10:00:00', endTime: '11:00:00',
            status: "pending", bookingTitle: "Milestone 1", facilityId:6, studentId: 1
        },
        {
            id:3, date:  '2023-06-12', startTime: '10:00:00', endTime: '11:00:00',
            status: "pending", bookingTitle: "Milestone 3", facilityId:3, studentId: 2
        }
    ]);

    // drop-down booking location & facility setters
    const [setLocation, setSelectedLocation] = useState("");
    const [setFacility, setSelectedFacility] = useState("");


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
    };

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