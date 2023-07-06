import React, { useContext } from "react";
import cam from "./cam.png";
import add from "./add.png";
import more from "./more.png";
import './chatStyle.scss';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "./ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);
    
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Chatting with: {data.user?.displayName}</span>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;