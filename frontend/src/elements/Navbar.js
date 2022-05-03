import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export default function Navbar(){
    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <NavLink to="/" className="navbar-brand ms-3">Home Brand</NavLink>

                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to={"/owner/login"} className="nav-link">Owner login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/owner/register"} className="nav-link">Owner register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/menu"} className="nav-link">Menu</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/orderonline"} className="nav-link">Order Online</NavLink>
                    </li>
                    
                </div>
            </nav>
            <Outlet/>
        </div>
    )
    
}



