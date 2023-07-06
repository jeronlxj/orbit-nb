import React from "react";
import { useState, useEffect } from "react";
import './chatStyle.scss';
import { UserAuthentication } from "../../LoginContext";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const ChatNavbar = () => {

    const {user} = UserAuthentication();

    /* HACK WAY */

    // get the collection ref itself
    const [currentUser,setCurrentUser] = useState([]);
    const UserCollectionRef = collection(db, "Users");
    useEffect(() => {
        // async function
        const getUser = async () => {
            // get the collection itself
            const data = await getDocs(UserCollectionRef);
            // take out the data part only & set it
            setCurrentUser(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }

        // call the async function
        getUser();
    }, [])

    function filterByUser(data) {
        return data?.Email === user?.email;
    }

    /* END OF HACK WAY */

    return (
        <div className="navbar">
            <span className="logo">NuNme.</span>
            <div className="user">
                {
                    currentUser?.filter(filterByUser).map(data => {
                        return (
                            <>
                            <img src={data.photoURL} alt="" />
                            <span>{data.Name}</span>
                            </>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default ChatNavbar;