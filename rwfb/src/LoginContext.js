import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./config/firebase";

const UserContext = createContext(null);

// creating useContext Hook
export const LoginContextProvider = ({children}) => {

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
    const loginContextValue = {user, createUser, login, logout, resetPassword};

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