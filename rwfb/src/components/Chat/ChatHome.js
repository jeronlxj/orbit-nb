import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import './chatStyle.scss';
import Navbar from "../../config/navbar";
import { UserAuthentication } from "../../LoginContext";

const ChatHome = () => {

    const {user} = UserAuthentication();

    return (
        <>
        <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
        <Navbar name={user?.email} current={"chatHome"}/>
        <div className="mx-auto my-4 p-4">

        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>

        </div>
        </div>
        </>
    )
}

export default ChatHome;