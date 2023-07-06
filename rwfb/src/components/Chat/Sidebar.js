import React from "react";
import ChatNavbar from "./chatNavbar";
import Search from "./Search";
import './chatStyle.scss';
import Chats from "./Chats";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ChatNavbar/>
            <Search/>
            <Chats/>
        </div>

    )
}

export default Sidebar;