import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export default function NavbarOwner(props){
   const {isLoggedIn}=props;


    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <NavLink to="/owner" className="navbar-brand ms-3">Home Brand</NavLink>
                <div className="navbar-nav ms-auto">
                    {isLoggedIn?
                    <span>
                        <li className="nav-item">
                            <NavLink to={"/owner/dishes"} className="nav-link">Dishes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/owner/orders"} className="nav-link">Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/owner/login"} className="nav-link">Logout</NavLink>
                        </li>
                    </span>
                    :
                    <li className="nav-item">
                        <NavLink to={"/owner/login"} className="nav-link">Login</NavLink>
                    </li>
                    }
                    
                    <li className="nav-item">
                        <NavLink to={"/owner/register"} className="nav-link">Register</NavLink>
                    </li>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
    
}



