import axios from "axios";
import React,{useState} from "react";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import OrderListApp from "../OrderApp/OrderListApp";
import DishApp from "../DishApp/DishApp";
import LoginForm from "./LoginForm";


export default function LoginApp(props){
    const {isLoggedIn,setIsLoggedIn}=props;
    const alert = useAlert();
    const navigate=useNavigate();

    //function to display error details on console
    const displayError=(err)=>{
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.status, err.response.data, err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error: ', err.message);
        }
    }

    const [user,setUser]=useState({});
    
    //handle change in login form fields
    const handleChange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value});
    }
    
    //handle click on login button
    const handleLogin=(e)=>{
        e.preventDefault();
        //send login details over to node for authenticating via passport
        axios.post('http://localhost:8010/owner/login', user, { withCredentials: true })
        //withCredentials:true--- tells Axios to send the cookie alongside the request 
        .then(res=>{
            setIsLoggedIn(true);
            // console.log(res.data);//res.data.success will be true if user has been logged in
            alert.success(res.data.message);
            setUser(res.data.user);
            navigate(`/owner/orders`);
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

    //clear the login form
    const handleClear=()=>{
        setUser({username:"", password:""});
    }

    //handle click on logout button----moved to NavbarOwner
    // const handleLogout=()=>{
    //     axios.get('http://localhost:8010/owner/logout',{ withCredentials: true })
    //     .then(res=>{
    //         if(res.data.success){
    //             setIsLoggedIn(false);
    //             setUser({});
    //             alert.success("Logged Out!");
    //             navigate('/owner/login');
    //         }
    //     }).catch(err=>{
    //         let text='Logout error! '+ err.message;
    //         alert.error(text);
    //         console.log("logout error");
    //         displayError(err);//show error details in console
    //     });
    // }

    return (
        <div>
            
            {!isLoggedIn && <LoginForm handleChange={handleChange} handleClear={handleClear} handleLogin={handleLogin} user={user}/>

            }

        </div>
    )
}