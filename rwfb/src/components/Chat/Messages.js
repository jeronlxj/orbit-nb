import React, { useState, useContext, useEffect } from "react";
import './chatStyle.scss';
import Message from "./Message";
// import { ChatContext } from "./ChatContext";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, getDoc, setDoc,
     updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { ChatContext } from "./ChatContext";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        // set message if document exists
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);

    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    )
}

export default Messages;