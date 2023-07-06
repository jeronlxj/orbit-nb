import React, { useState, useContext } from "react";
import './chatStyle.scss';
import { UserAuthentication } from "../../LoginContext";
import img from "./img.png";
import add from "./add.png";
import more from "./more.png";
import { v4 as uuid } from "uuid";
import { ChatContext } from "./ChatContext";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';

const Input = () => {

    const [text, setText] = useState("");
    const { user } = UserAuthentication();
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        await updateDoc(doc(db, "chats", data.chatId),{
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: String(user.email.split('@')[0]),
                date: Timestamp.now(),
            })
        });

        await updateDoc(doc(db, "userChats", String(user.email.split('@')[0])), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", data.user.displayName), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
        setText("");
    }

    return (
        <div className="input">
            <input type="text" placeholder="Write a Message..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            />
            <div className="send">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>

    )
}

export default Input;