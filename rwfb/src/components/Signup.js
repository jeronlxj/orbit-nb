// react hooks
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { UserAuthentication } from '../LoginContext';

// tailwind css object file
import  {tailw} from "../config/styles";


// Authentication Component
const Signup = () => {

    // setting states for email & password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { createUser } = UserAuthentication();

    // createUser function,
    const signup = async (e) => {
        try {
            e.preventDefault(); // alternate way to await
            await createUser(email, password);

            // post the user to the USERS table in firebase once they sign up
            fetch('api/usersPOST', {
                'method' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Email": email,
                    "Location": "RC4",
                    "Name": email.split('@')[0],
                    "Tier": "Student"
                })
              });

            navigate('/');
        } catch (e) {
            alert(e);
        }
    }


    return (
        <div className={tailw.bg}>

        <div class="h-screen flex items-center justify-center">
            <div class=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up for NuNMe.</h5>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nusid@nus.edu.u" required/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>

                    <button onClick={signup} class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-900 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:bg-red-900">Sign up</button>
                    
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <Link to="/"> <span class="text-blue-700 hover:underline dark:text-blue-500">Login</span> </Link>
                    </div>
                </form>
            </div>
            </div>
        
        </div>
    )
};

export default Signup;