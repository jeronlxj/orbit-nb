// react hooks
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { UserAuthenication } from '../LoginContext';

// tailwind css object file
import  {tailw} from "../config/styles";


// Authentication Component
const Signup = () => {

    // setting states for email & password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { createUser } = UserAuthenication();

    // createUser function,
    const signup = async (e) => {
        try {
            e.preventDefault(); // alternate way to await
            await createUser(email, password);
            navigate('/');
        } catch (e) {
            alert(e);
        }
    }


    return (
        <div className={tailw.bg}>
        <div className={tailw.form}>
            <form className={tailw.forms}>
                <p className='text-2xl font-bold py-2'> Are you a current user?
                    <Link to="/"> 
                    <span className="text-black-500 hover:text-red-900" > Sign in</span>
                    </Link>
                </p>
                
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email Address</label>
                    <input className="border p-2 rounded" 
                        type = "email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input className="border p-2 rounded"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <button className={tailw.button}
                onClick={signup}>Sign up</button>

                <div className="py-2">

                </div>
            </form>
        </div>
        </div>
    )
};

export default Signup;