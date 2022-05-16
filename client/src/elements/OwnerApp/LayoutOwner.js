import React from "react";
import {NavLink,Link, Outlet,useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
import axios from "axios";
import FooterOwner from "./FooterOwner";

export default function LayoutOwner(props){
   const {isLoggedIn,setIsLoggedIn}=props;
   const alert = useAlert();
   const navigate=useNavigate();

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
    }
   //handle click on logout button
   const handleLogout=()=>{
        // axios.get('http://localhost:8010/owner/logout',{ withCredentials: true })
        axios.get('/owner/logout',{ withCredentials: true })
        .then(res=>{
            if(res.data.success){
                setIsLoggedIn(false);
                // setUser({});
                alert.success("Logged Out!");
                navigate('/owner/login');//redirect to login page
            }
        }).catch(err=>{
            let text='Logout error! '+ err.message;
            alert.error(text);
            console.log("logout error");
            displayError(err);//show error details in console
        });
    }

   const loggedInOptions=()=>{
        return(
            <div className="navbar-nav ms-auto align-items-center justify-content-end text-center me-2 w-50">
                <li className="nav-item">
                    <NavLink to={"/owner/orders"} className="nav-link">Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/owner/dishes"} className="nav-link">Dishes</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to={"/owner/register"} className="nav-link">Register</NavLink>
                </li> */}
                <li className="nav-item">
                    <Link to={""} onClick={handleLogout} className="nav-link">Logout</Link>
                </li>
            </div>
        )
    };

    const loggedOutOptions=()=>{
        return(
            <div className="navbar-nav align-items-center text-center justify-content-end ms-auto me-2 w-50">
                {/* <li className="nav-item">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink to={"/menu"} className="nav-link">Menu</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/orderonline"} className="nav-link">Order Online</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/owner"} className="nav-link">Owner login</NavLink>
                </li>
                
                
            </div>
        )
    }


    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:7+"vh"}}>
                
                <NavLink to="/" className="navbar-brand ms-2">Order-In</NavLink>
                {isLoggedIn? loggedInOptions(): loggedOutOptions()}
                
            </nav>

            <Outlet/>

            <FooterOwner />
            
        </div>
    )
    
}



