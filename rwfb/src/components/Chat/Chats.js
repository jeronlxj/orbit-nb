import React, { useContext, useEffect, useState } from "react";
import './chatStyle.scss';
import { onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, getDoc, setDoc,
     updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { UserAuthentication } from "../../LoginContext";
import { ChatContext } from "./ChatContext";
// import { ChatContext } from "./ChatContext";

const Chats = () => {

    const [chats, setChats] = useState([]);
    const { user } = UserAuthentication(); 
    const { dispatch } = useContext(ChatContext);
        
    // get this in real time aka changes are reflected instantly
    // via firebase snapshot
    useEffect(() => {
        // extra function to give it time for the user to be fetched
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.email.split('@')[0]), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            }
        };

        user.email && getChats();       
        
    }, [user.email]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div className="chats">

            {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date)?.map((chat) => {
                return (
                    <div className="userChat" key={chat[0]} 
                    onClick={() => handleSelect(chat[1].userInfo)}>

                        <img src={chat[1].userInfo.photoURL}/>
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default Chats;