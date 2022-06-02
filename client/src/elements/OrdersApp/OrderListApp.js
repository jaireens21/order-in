//showing orders to a logged in owner
//plus into outlet on LayoutOwner.js
//connected to elements: order,orderList


import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../../hooks/useToggleState";
import OrderList from "./OrderList";
import { useAlert } from 'react-alert';
import "./OrderListApp.css";
import displayError from "../../utils/displayError";
import { axiosInstance, TIMEOUT_INTERVAL} from "../../utils/axiosInstance";


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
    
       
    //read data using axios on every render
    const loadData=useCallback(()=>{
        axiosInstance.get('/orders', { timeout: TIMEOUT_INTERVAL, withCredentials: true  })
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
            
            setPastOrders(sortedOrders.filter(order=>order.date.toLocaleDateString("en-CA")<today.toLocaleDateString("en-CA")).sort((a,b)=>b.date.toLocaleDateString("en-CA").localeCompare(a.date.toLocaleDateString("en-CA")) || a.time - b.time));
            //past orders sorted-most recent date first, time in increasing order   
        })
        .catch(err=>{
            setError(err);//to display error to user
            console.log("error while fetching orders");
            displayError(err); //show error details on console
        })
        // eslint-disable-next-line
    },[]);

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
        axiosInstance.put(`/orders/${id}`,completedOrder,{ withCredentials: true })
        .then(res=>{
            loadData();//reload data from db to have the most updated data in state
        })
        .catch(err=>{
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
                <div className="orderContainer">
                    
                    <div className="leftNav">
                        <button className="btn btn-primary " onClick={handleTodaysClick}>Hide Today's orders</button>
                        <button className="btn btn-success " onClick={handleUpcomingClick}>Show Upcoming orders</button>
                        <button className="btn btn-dark " onClick={handlePastClick}>Show Past orders</button>
                    </div>
                    
                    <div className="rightOrders">
                        {showTodays && <> <h2>Today's Orders</h2> <OrderList id="todays" orders={todaysOrders} toggleTick={toggleTick} heading="todays" /> </> }
                        {showUpcoming && <> <h2>Upcoming Orders</h2> <OrderList id="upcoming" orders={upcomingOrders} toggleTick={toggleTick} heading="upcoming" /> </>}
                        {showPast && <> <h2>Past Orders</h2> <OrderList id="past" orders={pastOrders} toggleTick={toggleTick} heading="past" /> </>}
                    </div>
                    
                    
    
                </div>
            )
        }
    }
    return(
       
        <div className="OrderListApp">
            
            {getItems()} 
        </div>
    )
}