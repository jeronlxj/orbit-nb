 import React from "react";

 const ForgotPasswordModal = ({isVisible, onClose, children}) => {

    // if forgotPassword if not clicked, then return nothing
    if (!isVisible) return null;

    // can close the Modal outside of the X
    // to prevent from closing the Modal when interacting with it since its part of the div
    const handleClose = (e) => {
        if(e.target.id === "temp") onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
        flex justify-center items-center" id="temp" onClick={handleClose}>

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">      
                {children}
            </div>
        </div>
    )
 }

 export default ForgotPasswordModal;
