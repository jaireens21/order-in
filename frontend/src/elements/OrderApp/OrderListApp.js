
import axios from "axios";
import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../../hooks/useToggleState";
import OrderList from "./OrderList";
import { useAlert } from 'react-alert';


export default function OrderListApp(){
    const alert = useAlert();

    const [allOrders,setAllOrders]=useState([]);
    

    const [success,setSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [error,setError]=useState(null); //for showing loading error to user 

    const [upcomingOrders,setUpcomingOrders]=useState([]);
    const[showUpcoming,toggleShowUpcoming]=useToggleState(false);
    
    const [todaysOrders,setTodaysOrders]=useState([]);
    const[showTodays,toggleShowTodays]=useToggleState(true);//setting default to true so we always show todays' orders by default
    
    const [pastOrders,setPastOrders]=useState([]);
    const[showPast,toggleShowPast]=useToggleState(false);
    
    const today=new Date();
    
        
    const TIMEOUT_INTERVAL = 60 * 1000; //for axios request

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
            console.log('Error', err.message);
        }
    }
    

    
    //read data using axios on every render
    const loadData=useCallback(()=>{
        axios.get('http://localhost:8010/orders', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccess(true);//to decide whether to show spinning loader or data
            setError(null);//explicitly set error to null to make sure user sees the data & not errorView
            let orders=res.data.data;
            //incoming data has typeof(order.date)= string, that looks like a date object but is not!
            //so we first convert order.date back to a Date object and then sort based on dates & time
            let sortedOrders=orders.map(order=>({...order,date:new Date(order.date)})).sort((a,b)=>a.date.toLocaleDateString("en-CA").localeCompare(b.date.toLocaleDateString("en-CA")) || a.time - b.time);
            //localeCompare needs a string to work on,hence toLocaleDateString()
            //console.log(today);
            setAllOrders(sortedOrders); //store all orders in a state called 'allOrders'

            setUpcomingOrders(sortedOrders.filter(order=>order.date.toLocaleDateString("en-CA")>today.toLocaleDateString("en-CA"))); //comparing strings of same format
            
            setTodaysOrders(sortedOrders.filter(order=>order.date.toLocaleDateString("en-CA")===today.toLocaleDateString("en-CA"))); //since objects can not be equal, we check equality by converting to date strings 
            setPastOrders(sortedOrders.filter(order=>order.date.toLocaleDateString("en-CA")<today.toLocaleDateString("en-CA")));   
        })
        .catch(err=>{
            setError(err);//to display error to user
            console.log("error while fetching orders");
            displayError(err); //show error details on console
        })
    },[TIMEOUT_INTERVAL]);

    //read data from db
    useEffect(()=>{
        loadData();
    },[loadData]);

    const handleUpcomingClick=(e)=>{
        toggleShowUpcoming();
        e.target.innerText= e.target.innerText.includes("Show")?"Hide Upcoming Orders":"Show Upcoming Orders";
    }
    const handleTodaysClick=(e)=>{
        toggleShowTodays();
        e.target.innerText= e.target.innerText.includes("Show")?"Hide Today's Orders":"Show Today's Orders";
    }
    const handlePastClick=(e)=>{
        toggleShowPast();
        e.target.innerText= e.target.innerText.includes("Show")?"Hide Past Orders":"Show Past Orders";
    }

    const toggleTick=(id)=>{
        let odr=allOrders.find(order=>order._id===id);//find the order we want to toggle completed status of
        let completedOrder={};
        if(odr.completed){
            completedOrder={...odr,completed:false}
        }
        else completedOrder={...odr,completed:true};//using state here causes issues because setState does not necessarily execute in order
        // console.log("in orderlistapp, order details:",completedOrder);
        //update DB
        axios.put(`http://localhost:8010/orders/${id}`,completedOrder)
        .then(res=>{
            loadData();//reload data from db to have the most updated data in state
        })
        .catch(err=>{
            //window.alert("Error! Please try again later!");
            alert.error(`Error! Could not mark order as completed.${err.message}`)
            console.log("error while marking order as completed");
            displayError(err);//show error details in console
        })
    }

    //display data (read from db using axios)
    const getItems = () => {
        if(error){ //if there was an error in reading data using axios, show the error
            return (
                <div className="text-center mx-auto" >
                    <h1 className="text-danger mb-5">Oh no! Something went wrong. ( {error.message} )</h1>
                    
                    <h2>Please try refreshing the page!</h2>
                </div>
                )
        }
        else if(!success) {
            //if there is no error but success is not true yet
            //means we are still waiting for data
            //so we show a spinner to the user
            return (
                <div className="text-center mx-auto">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else {
            //no error, success is true->display the data
            return (
                <div>
                    <h1>ORDERS</h1>
                    
                    <button className="btn btn-primary me-3" onClick={handleTodaysClick}>Hide Today's orders</button>
                    <button className="btn btn-success me-3" onClick={handleUpcomingClick}>Show Upcoming orders</button>
                    <button className="btn btn-dark me-3" onClick={handlePastClick}>Show Past orders</button>
                    
                    {showTodays && <OrderList id="todays" orders={todaysOrders} toggleTick={toggleTick} heading="Today's" />}
                    {showUpcoming && <OrderList id="upcoming" orders={upcomingOrders} toggleTick={toggleTick} heading="Upcoming" />}
                    {showPast && <OrderList id="past" orders={pastOrders} toggleTick={toggleTick} heading="Past" />}
    
                </div>
            )
        }
    }
    return(
       
        <div className="w-75 mx-auto my-5 text-center">
            {getItems()} 
        </div>
    )
}