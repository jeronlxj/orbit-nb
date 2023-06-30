import { Fragment, useState } from "react";
import Navbar from "../../config/navbar";
import { useNavigate } from "react-router-dom";
import { UserAuthentication } from "../../LoginContext";
import { SuccessFormModal, ErrorFormModal } from "../Book/succform";

const EditPasword = () => {

    const navigate = useNavigate();

    const { user, updatePassword } = UserAuthentication();

    // handling of passwords
    const [pass,setPass] = useState("");
    const [confirmpass,setconfirmpass] = useState("");

    // for successFormModal Modal handling
    const [showModal, setShowModal] = useState(false);
    // for errorFormModal Modal handling
    const [Modal, setModal] = useState(false);
    // store error message
    const [errorMess,setErrorMess] = useState("");

    const changePassword = async (e) => {
        e.preventDefault();

        try {
            if(pass !== confirmpass) {
                throw new Error("Passwords do not match");
            }
            await updatePassword(user, pass);

            setErrorMess("Password has been changed");
            setShowModal(true);

        } catch(e) {
            setErrorMess(String(e));
            setModal(true);
        }
    }

    return (
    <Fragment>
    
    <div className='w-full h-[800px] bg-center bg-cover bg-utown'>
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Navbar name={user?.email} current={"profile"} />

      <div class="flex items-center justify-center p-12">
      <form> 

        <div class="mb-5">
            <label
            for="pass"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Enter new Password
            </label>
            <input
            id="pass"
            type="password"
            placeholder="******"
            required
            onChange={(e) => setPass(e.target.value)}
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
        </div>

        <div class="mb-5">
            <label
            for="confirm"
            class="mb-3 block text-base font-medium text-[#07074D]"
            >
            Confirm new Password
            </label>
            <input
            type="password"
            id="confirm"
            placeholder="******"
            onChange={(e) => setconfirmpass(e.target.value)}
            required
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#B9261C] focus:shadow-md"
            />
        </div>

        <div class="flex flex-col items-center">
            <button class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
            onClick={changePassword}>
            Change Password
            </button>
        </div>

      </form>
      </div>

    </div>
    </div>

    <SuccessFormModal isVisible={showModal} onClose={() => setShowModal(false)} 
        children={
            <>
              <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </div>

              <div class="px-1 ml-1 text-m font-normal"> {errorMess} </div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  navigate('/Home');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Home
                </button>
              </div>

            </div>
            </>
        }
        />

    <ErrorFormModal isVisible={Modal} onClose={() => setModal(false)} 
        children={
            <>
            <div class="flex items-center justify-center w-full max-w-[600px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
            </div>

              <div class="px-1 ml-1 text-m font-normal">{errorMess}</div>

              <div class="px-3 py-5 flex flex-col items-center">
                <button onClick={() => {
                  setShowModal(false);
                  navigate('/Home');}
                }
                class="inline-flex items-center h-10 px-5 block text-base font-medium text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                >
                Home
                </button>
              </div>

            </div>
            </>
        }

        />

    </Fragment>

    )
}

export default EditPasword;
