import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import "./Layout.css";
import Navbar from "./Navbar";

export default function Layout(){
    return(
        <>
            <Navbar/>
            <Outlet />
            <Footer />
        </>
    )
    
}



