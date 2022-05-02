import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderPlacedSuccess(){
    const {state} = useLocation();
    const {emailSent}= state;
    return(
        <div className="mt-5 text-center">
            <h1 className="mb-5">Your order has been placed successfully!</h1>
           
            {emailSent ? 
                <p className="mb-5">A confirmation email has been sent to your email id.</p>
                : <p className="mb-5">However, we were unable to send the confirmation email. Please contact resto at (123) 456-7890 to confirm your order.</p>
            }
            <p> Thank you for choosing ORDER-IN!</p>
        </div>
    )


}