import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes(props){
    const {isLoggedIn}=props;
    
    if(!isLoggedIn){ //if the owner is not logged in, redirect to login page
        return <Navigate to='/owner/login' replace/>;
    }else{ //if loggedin, give access to protected routes
        return <Outlet/>
    }
}