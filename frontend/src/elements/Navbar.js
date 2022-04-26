import React from "react";
import {NavLink} from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand ms-3">Order-In</NavLink>

            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to={"/"} className="nav-link">Owner login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/order"} className="nav-link">Order</NavLink>
                </li>
                
            </div>
        </nav>
    )
    
}



