
import axios from "axios";
import React, {useState,useEffect} from "react";
import useToggleState from "../hooks/useToggleState";
import OrderList from "./OrderList";

export default function OrderListApp(){

    const [allOrders,setAllOrders]=useState([]);
    const [success,setSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [error,setError]=useState(null); //for showing loading error to user with a button to try reloading

    const[upcoming,toggleUpcoming]=useToggleState(false);
    const [upcomingOrders,setUpcomingOrders]=useState([]);
    const[todays,toggleTodays]=useToggleState(false);
    const [todaysOrders,setTodaysOrders]=useState([]);
    const[past,togglePast]=useToggleState(false);
    const [pastOrders,setPastOrders]=useState([]);

    const today=new Date();today.setUTCHours(10); today.setUTCMinutes(0); today.setUTCSeconds(0); today.setUTCMilliseconds(0);
    const todayStr=today.toLocaleDateString("en-CA");

    
    const TIMEOUT_INTERVAL = 60 * 1000; //for axios request

    //function to display error details on console
    const displayError=(err)=>{
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
    }
    //function to display initial loading error to user, with a button to try reloading data
    const getErrorView = (err) => {
        return (
        <div className="text-center text-danger">
            <p>Oh no! Something went wrong. {err.message}! </p>
            <button className="btn btn-primary" onClick={loadData}> Try again </button>
        </div>
        )
        
    }

    //get all items from server/db
    const loadData=()=>{ 
        //useCallback may be used to resolve warning of missing dependencies in useEffect
        axios.get('http://localhost:8010/orders', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccess(true);//to decide whether to show spinning loader or data
            setError(null);
            let orders=res.data.data;
            //incoming data has typeof(order.date)= string, that looks like a date object but is not!
            //so we first convert order.date back to a Date object and then sort based on dates & time
            let sortedOrders=orders.map(order=>({...order,date:new Date(order.date)})).sort((a,b)=>a.date.toString().localeCompare(b.date.toString()) || a.time - b.time);
            //localeCompare needs a string to work on,hence toString()

            setAllOrders(sortedOrders); //store all orders in a state called 'allOrders'

            setUpcomingOrders(sortedOrders.filter(order=>order.date.valueOf()>today.valueOf())); //compare date objects using value in milliseconds
            
            setTodaysOrders(sortedOrders.filter(order=>order.date.valueOf()===today.valueOf()));   
            setPastOrders(sortedOrders.filter(order=>order.date.valueOf()<today.valueOf()));   
        })
        .catch(err=>{
            setError(err);
            console.log("error while fetching order list");
            displayError(err); //show error on console
        })
    }

    //fetch initial data on load
    useEffect(()=>{
        loadData();
    },[])

    const handleUpcomingClick=()=>{
        toggleUpcoming();
    }
    const handleTodaysClick=()=>{
        toggleTodays();
    }
    const handlePastClick=()=>{
        togglePast();
    }
    //show a spinner while initial data is being loaded/fetched thru axios
    const getItems = () => {
        if(!success) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else {
            
            return (
                <div className="ms-3">
                    <h1>ORDERS</h1>
                    
                    <button className="btn btn-dark me-3" onClick={handleTodaysClick}>Today's orders</button>
                    <button className="btn btn-dark me-3" onClick={handleUpcomingClick}>Upcoming orders</button>
                    <button className="btn btn-dark me-3" onClick={handlePastClick}>Past orders</button>
                    
                    {todays && <OrderList orders={todaysOrders} heading="Today's" />}
                    {upcoming && <OrderList orders={upcomingOrders} heading="Upcoming" />}
                    {past && <OrderList orders={pastOrders} heading="Past" />}
    
                </div>
            )
        }
    }
    return(
        <div>
            {error? getErrorView(error) : getItems()} 
            {/* if there is an error while loading data, show that error */}
            {/* else show the loaded data */}
            
        </div>
        
    )
}