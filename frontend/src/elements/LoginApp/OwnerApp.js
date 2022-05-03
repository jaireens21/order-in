import axios from "axios";
import React from "react";
import { useAlert } from "react-alert";
import { useNavigate,useLocation } from "react-router-dom";
import NavbarOwner from "../NavbarOwner";

export default function OwnerApp(){
    const alert=useAlert();
    const navigate=useNavigate();
    const {state} = useLocation();
    const {isLoggedIn}= state;

    //function to display error details on console
    const displayError=(err)=>{
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.status, err.response.data, err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error: ', err.message);
        }
    };

    const handleLogout=()=>{
        axios.get('http://localhost:8010/owner/logout')
        .then(res=>{
            if(res.data.success){
                
                alert.success("Logged Out!");
                navigate('/owner/login');
            }
        }).catch(err=>{
            let text='Logout error! '+ err.message;
            alert.error(text);
            console.log("logout error");
            displayError(err);//show error details in console
        });
    }
    return(
        <div>
            {isLoggedIn ? 
                <div>
                    <NavbarOwner />
                    <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
                    <h1>Owner page with links to details,reset password,edit dishes, see orders</h1>
                </div>
                : <div>
                    <h1>No permission</h1>
                </div>
            }
            
            
            
        </div>
    )
}