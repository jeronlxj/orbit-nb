import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// tailwind css object file
import { tailw } from "../config/styles";

import { UserAuthentication } from '../LoginContext';
import ForgotPasswordModal from "./forgot_password";
import { ErrorFormModal } from "./Book/succform";

const Signin = () => {

    // setting states for email & password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login, resetPassword } = UserAuthentication();

    //LoginUser function 
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await login(email, password);
            navigate('/Home');
        } catch (e) {
            setErrorMess(String(e).substring(24));
            setModal(true);
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

    // for forgotPassword Modal handling
    const [showModal, setShowModal] = useState(false);
    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // store error message
    const [errorMess,setErrorMess] = useState("");

    return (
        <Fragment>
        <div className={tailw.bg}>

        <div class="h-screen flex items-center justify-center">
        <div class=" w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6">
                <h5 class="text-xl font-medium text-white dark:text-white">Sign in to NuNMe.</h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}  class="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nusid@nus.edu.u" required/>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-white">Your password</label>
                    <input type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                </div>
                <div class="flex items-center">
                    <label onClick={() => setShowModal(true)} class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</label>
                </div>

                <button onClick={handleLogin} class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-900 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:bg-red-900">Login</button>
                
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/signup"> <span class="text-blue-700 hover:underline dark:text-blue-500">Create account</span> </Link>
                </div>
            </form>
        </div>
        </div>

        </div>
        <ForgotPasswordModal isVisible={showModal} onClose={() => setShowModal(false)} 
        children={
            <>
            <div>
            <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-white">Enter your email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}  class="mb-2 bg-gray-600 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nusid@nus.edu.u" required/>
            </div>
            <button onClick={forgotPassword} class="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:bg-red-900 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:bg-red-900">Send Reset Link</button>
            </>
        }

        />

        <ErrorFormModal isVisible={Modal} onClose={() => setModal(false)} 
        children={
            <>
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-800 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
              </div>

              <div class="px-1 ml-1 text-m font-normal">{errorMess}</div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  setModal(false);
                  navigate('/signup');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Sign up
                </button>
              </div>

            </div>
            </>
        }

        />
        </Fragment>
    )
}

export default Signin;