import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// tailwind css object file
import tailw from "../config/styles";

import { UserAuthenication } from '../LoginContext';

const Signin = () => {
    // setting states for email & password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login, resetPassword } = UserAuthenication();

    //LoginUser function 
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await login(email, password);
            navigate('/account');
        } catch (e) {
            alert(e);
            navigate('/signup');
        }
        
    }; 

    //Reset Password function
    const forgotPassword = async () => {
        if (email) {
            try {
                await resetPassword(email);
            } catch {
                alert("Enter a valid email with a @")
            }
        } else {
            alert("Enter a valid email");
        }
    }

    return (
        <div className={tailw.bg}>
        <div className={tailw.form}>
        <form className={tailw.forms}>
            <p className='text-2xl font-bold py-2'> Are you a new user?
                <Link to="/signup"> 
                <span className="text-black-500 hover:text-red-900" > Sign up</span>
                </Link>
            </p>

            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium' for="email">Email Address</label>
                <input className="border p-2 rounded" type="email" name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium' for="password">Password</label>
                <input className="border p-2 rounded" type="password" name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            <label className='py-2 font-medium text-black-500 hover:text-red-900'
            onClick={forgotPassword}>Reset Password</label>

            <button className={tailw.button}
            onClick={handleLogin}>Sign in</button>
             
        </form>
        </div>
        </div>
    )
}

export default Signin;