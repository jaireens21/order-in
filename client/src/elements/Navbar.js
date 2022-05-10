import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand ms-3">Order-In</NavLink>

            <div className="navbar-nav ms-auto">
                
                {/* <li className="nav-item">
                    <NavLink to={"/owner/register"} className="nav-link">Owner register</NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/menu"} className="nav-link">Menu</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/orderonline"} className="nav-link">Order Online</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/owner"} className="nav-link me-5">Owner login</NavLink>
                </li>
                
            </div>
        </nav>
    )
}