//homepage for owner website, if owner is logged in
//if not logged in, owner will be redirected to login page

import React from "react";
import './OwnerHome.css';

export default function OwnerHome(){
    return(
        <div className="OwnerHome">
            <h1 className="mb-5">Welcome to Owner Dashboard</h1>
            <h2>Use the navigation links up top to see your orders and add/delete/edit dishes!</h2>
        </div>
    )
}