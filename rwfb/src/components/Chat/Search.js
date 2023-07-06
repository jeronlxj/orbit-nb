import React, { useContext, useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, getDoc, setDoc,
     updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';
import { UserAuthentication } from "../../LoginContext";

import './chatStyle.scss';

const Search = () => {
    const [username, setUsername] = useState("");
    const [suser, ssetUser] = useState(null);
    const [err, setErr] = useState(false); 
    const [currentUser, setCurrentUser] = useState("");

    const { user } = UserAuthentication();

    const handleSearch = async () => {

        const q = query(
        collection(db, "Users"), 
        where("Name","==",username));

        try {
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach( (doc) => {
                ssetUser({...doc.data(), id:doc.id});
            });

        } catch(e) {
            setErr(true);
        }

        const b = query(
            collection(db, "Users"), 
            where("Email","==",user.email));
    
        try {
            const querySnapshot = await getDocs(b);
    
            querySnapshot.forEach( (doc) => {
                setCurrentUser({...doc.data(), id:doc.id});
            });
    
        } catch(e) {
            setErr(true);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        // if link aka chat does not exist, create a new one
        const combinedId = suser.Name > currentUser.Name
        ? suser.Name + currentUser.Name
        : currentUser.Name + suser.Name;
        
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                // if no chats are gotten back, then create the chats in chat collection
                await setDoc(doc (db,"chats",combinedId), { messages: [] });

                // create userChats
                await updateDoc(doc(db, "userChats", currentUser.Name),{
                    [combinedId+".userInfo"] : {
                        id: suser.id,
                        displayName: suser.Name,
                        Email: String(suser.Email),
                        photoURL: String(suser.photoURL)
                    },
                    [combinedId+".date"] : serverTimestamp()                                        
                });

                // create userChats
                await updateDoc(doc(db, "userChats", suser.Name),{
                    [combinedId+".userInfo"] : {
                        id: currentUser.id,
                        displayName: currentUser.Name,
                        Email: String(currentUser.Email),
                        photoURL: String(currentUser.photoURL)
                    },
                    [combinedId+".date"] : serverTimestamp()                                        
                });
            }
        } catch (err) {
            setErr(true);
        }

        ssetUser(null);
        setUsername("");
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find a User" onKeyDown={handleKey} 
                onChange={e => setUsername(e.target.value)}
                value={username}
                />
            </div>

            {err && <span>User not found!</span>}

            {suser && 
            (<div className="userChat" onClick={handleSelect}>
                <img src={suser.photoURL}/>
                <div className="userChatInfo">
                    <span>{suser.Name}</span>
                </div>
            </div>
            )}
        </div>

    )
}

export default Search;