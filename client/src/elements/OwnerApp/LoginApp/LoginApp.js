//login logic for owner website
//will plug into outlet in LayoutOwner.js
//calls element LoginForm.js (if not logged in) or OwnerHome.js (if logged in)

import React,{useState} from "react";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./LoginApp.css";
import OwnerHome from "./OwnerHome";
import displayError from "../../../utils/displayError";
import { axiosInstance} from "../../../utils/axiosInstance";


export default function LoginApp(props){
    const {isLoggedIn,setIsLoggedIn}=props;
    const alert = useAlert();
    const navigate=useNavigate();

    const [user,setUser]=useState({});
    
    //handle change in login form fields
    const handleChange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value});
    }
    
    //handle click on login button
    const handleLogin=(e)=>{
        e.preventDefault();
        //send login details over to node for authenticating via passport
        axiosInstance.post('/owner/login', user, { withCredentials: true })
        //withCredentials:true--- tells Axios to send the cookie alongside the request 
        .then(res=>{
            // console.log(res.data);//res.data.success will be true if user has been logged in
            if(res.data.success){
                setIsLoggedIn(true);
                alert.success(res.data.message);
                setUser(res.data.user);
                return navigate(`/owner/orders`);
            }else{ //res.data.success will be false if user could not be logged in
                alert.error(res.data.error);
                return navigate(`/owner/login`);
            }
        })
        .catch(err=>{
            setIsLoggedIn(false);
            let text='Login error! '+ err.message;
            if(err.response && err.response.data.includes("Unauthorized")){
                text="Incorrect username/ password !";
            }
            alert.error(text);
            console.log("login error");
            displayError(err);//show error details in console
        }) 
    };

    return (
        <div className="LoginApp">
            
            {!isLoggedIn && <LoginForm handleChange={handleChange} handleLogin={handleLogin} user={user}/>}
            {isLoggedIn && <OwnerHome/>}

            

        </div>
    )
}