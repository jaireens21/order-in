import React from "react";
import {NavLink} from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand ms-3">Home Brand</NavLink>

            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to={"/owner"} className="nav-link">Owner login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/owner/dishes"} className="nav-link">Owner-Dishes</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/owner/orders"} className="nav-link">Owner-Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/menu"} className="nav-link">Menu</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/menu/order"} className="nav-link">Order Online</NavLink>
                </li>
                
            </div>
        </nav>
    )
    
}



