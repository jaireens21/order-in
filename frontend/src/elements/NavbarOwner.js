import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export default function NavbarOwner(){
    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <NavLink to="/" className="navbar-brand ms-3">Home Brand</NavLink>

                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to={"/owner/dishes"} className="nav-link">Owner-Dishes</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/owner/orders"} className="nav-link">Owner-Orders</NavLink>
                    </li>
                                    
                </div>
            </nav>
            <Outlet/>
        </div>
    )
    
}



