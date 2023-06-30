import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged, sendPasswordResetEmail, updatePassword,
updateEmail } from "firebase/auth";
import { auth } from "./config/firebase";

const UserContext = createContext(null);

// creating useContext Hook
export const LoginContextProvider = ({children}) => {

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
        user, createUser, login, logout, resetPassword, updatePassword, updateEmail,
        // drop-down booking setters
        setLocation, setSelectedLocation, setFacility, setSelectedFacility,
        // User object - aka staff/student/admin
        bookingEdit,setBookingEdit
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