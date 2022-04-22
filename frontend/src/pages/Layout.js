import React from "react";
import Navbar from "../elements/Navbar";
import {Outlet} from 'react-router-dom';

export default function Layout(){
    return(
        <div className="layout">
            <Navbar/>
            <Outlet />
            
            
        </div>
    )
}