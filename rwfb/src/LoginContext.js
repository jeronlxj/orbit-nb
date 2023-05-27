import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged } from "firebase/auth";
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

    return (
        // pass down User object and signup,loginmlogout function as props
        <UserContext.Provider value={{ user, createUser, login, logout }}>
            { children }
        </UserContext.Provider>
    );
}

// exporting the context out 
export const UserAuthenication = () => {
    return useContext(UserContext);
}