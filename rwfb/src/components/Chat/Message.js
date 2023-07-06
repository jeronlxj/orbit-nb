import React, { useContext, useState, useRef, useEffect } from "react";
import './chatStyle.scss';
import { UserAuthentication } from "../../LoginContext";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, getDoc, setDoc,
     updateDoc, doc, query, where, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ChatContext } from "./ChatContext";

const Message = ({message}) => {

    const {user} = UserAuthentication();
    const {data} = useContext(ChatContext);

    // scroll
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);

    function timeDiff(mTime) {
        let c = Timestamp.now();
        let diff = (c.seconds - mTime.seconds);
        if (diff < 60) {
            return "now";
        } else if (diff < 3600) {
            return "just now";
        } else if (diff < 3600 * 6) {
            return "recently";
        } else if (diff < 3600 * 24) {
            return "today";
        } else {
            return (Math.ceil(diff/(3600 * 24)) + " days");
        }
    }


    return (
        <div className={`message ${message.senderId === user.email.split('@')[0] && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === user.email.split('@')[0]
                ? "https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                :  data.user.photoURL
            } alt =""/>
                <span>{timeDiff(message.date)}</span>
            </div>

            <div className="messageContent">
                <p>{message.text}</p>
            </div>
            
        </div>

    )
}

export default Message;