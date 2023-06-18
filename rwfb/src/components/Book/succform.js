export function ErrorFormModal({isVisible, onClose, children}) {

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
            {children}
        </div>
    )
}

export function SuccessFormModal({isVisible, onClose, children}) {

    // if forgotPassword if not clicked, then return nothing
    if (!isVisible) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
        flex justify-center items-center" id="temp" > 
            {children}
        </div>
    )
}
