// layout for customer website
//different files will plug into outlet

import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
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



