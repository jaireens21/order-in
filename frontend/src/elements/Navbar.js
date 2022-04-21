import React from "react";
import {NavLink} from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand ms-3">Order-In</NavLink>

            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to={"/add"} className="nav-link">Add a dish</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/menu"} className="nav-link">Menu</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/signup"} className="nav-link">SignUp</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/users/:id"} className="nav-link">User Account</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/logout"} className="nav-link">Logout</NavLink>
                </li>
            </div>
        </nav>
    )
    
}



