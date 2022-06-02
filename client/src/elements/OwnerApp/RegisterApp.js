//to register a new email id as an additional owner
//link to this page is not visible to anyone

import React,{useState} from "react";
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import "./RegisterApp.css";
import displayError from "../../utils/displayError";
import { axiosInstance} from "../../utils/axiosInstance";


export default function RegisterApp(){
    const alert = useAlert();
    const navigate=useNavigate();

    const [user,setUser]=useState({email:"", password:""});

    //handle change in input fields
    const handleChange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value});
    }
    
    //handle click on login button
    const handleLogin=(e)=>{
        e.preventDefault();
        //check passowrd & confirm password match
        let confirmPassword=document.getElementById('confirm');
        if(document.getElementById('password').value !== confirmPassword.value) {
            window.alert('Passwords do not match!'); 
            confirmPassword.value=null;
            return;
        }
        //send registration details over to node for authenticating via passport
        axiosInstance.post('/owner/register', user,{ withCredentials: true })
        .then(res=>{
            console.log(res.data);
            console.log(res.data.success);
            //will be true if user has been registered & logged in
            //will be false if owner account already exists
            if(res.data.success){
                alert.success(res.data.message);
               return navigate("/owner/dishes");
            }else {
                alert.error(res.data.message);
                return navigate("/owner/login");
            }
        })
        .catch(err=>{
            alert.error(`Registration error!${err.message}`)
            console.log("Registration error");
            displayError(err);//show error details in console)
        }) 
    };

    
    
    return (
        <div className="RegisterApp ">
            
            <form className="RegisterForm needs-validation" noValidate onSubmit={handleLogin}>
                <h1 className="text-center">Register New Owner</h1>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-control " type="text" id="email" value={user.email} required onChange={handleChange}/>
                    <div className="invalid-feedback">
                        Required!
                    </div>
                </div>
                
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" value={user.password} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Required!
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="confirm">Confirm Password:</label>
                    <input className="form-control" type="password" id="confirm" required/>
                    <div className="invalid-feedback">
                        Required!
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary my-3 me-2">Register</button>
                
                {/* <p>Already have an account? <a href="/owner/login">Click here</a> to login!</p> */}
                
            </form>

        </div>
    )
}