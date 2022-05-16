//when order is placed successfully, cust is redirected to /orderonline/success and this element is displayed
//displays confirmation that order has been placed & email has been sent
//if email could not be sent, asks customer to call resto to confirm order.

import React from "react";
import { useLocation } from "react-router-dom";

export default function CartSuccess(){
    const {state} = useLocation();
    const {emailSent}= state;
    return(
        <div className="CartSuccess text-center">
            <h1 className="mb-5">Your order has been placed successfully!</h1>
           
            {emailSent ? 
                <p className="mb-5">A confirmation email has been sent to your email id.</p>
                : <p className="mb-5">However, we were unable to send the confirmation email. Please contact resto at (123) 456-7890 to confirm your order.</p>
            }
            <p> Thank you for choosing ORDER-IN!</p>
        </div>
    )


}