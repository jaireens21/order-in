import axios from "axios";
import React, {useState,useEffect,useCallback} from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import useToggleState from "../hooks/useToggleState";

export default function MenuApp(){

    const [items,setItems]=useState(null);
    const [success,setSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [error,setError]=useState(null); //for showing loading error to user with button to try reloading

    
    const [order,setOrder]=useState([]);//capturing the order details
    const [isCheckingOut, toggleIsCheckingOut]=useToggleState(false);

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
    //function to display initial loading error to user, with button to try reloading data
    const getErrorView = (err) => {
        return (
        <div className="text-center text-danger">
            <p>Oh no! Something went wrong. {err.message}! </p>
            <button className="btn btn-primary" onClick={loadData}> Try again </button>
        </div>
        )
        
    }
    //get all items from server/db
    const loadData=useCallback(()=>{ //useCallback used to resolve a warning of missing dependencies in useEffect
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccess(true);//to decide whether to show spinning loader or data
            setError(null);
            setItems(res.data.data); //show menu items 
        })
        .catch(err=>{
            setError(err);
            console.log("error while fetching menu items");
            displayError(err); //show error on console
        })
    },[TIMEOUT_INTERVAL])

    //fetch initial data on load
    useEffect(()=>{
        loadData();
    },[loadData])

    const handleCheckoutClick=()=>{
        toggleIsCheckingOut();
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
                <div className="ItemList text-center mx-auto">
                    <h2>Appetizers</h2>
                    {items.map(item=>(item.category==="appetizer"&&<MenuItem key={item._id} item={item} setOrder={setOrder}  />))}
                    <h2>Main Course</h2>
                    {items.map(item=>(item.category==="mainCourse" && <MenuItem key={item._id} item={item} setOrder={setOrder}  />))}
                    <h2>Breads</h2>
                    {items.map(item=>(item.category==="breads" && <MenuItem key={item._id} item={item} setOrder={setOrder} />))}
                    <h2>Drinks</h2>
                    {items.map(item=>(item.category==="drinks" && <MenuItem key={item._id} item={item} setOrder={setOrder} />))}
                    <h2>Desserts</h2>
                    {items.map(item=>(item.category==="dessert" && <MenuItem key={item._id} item={item} setOrder={setOrder} />))}
                    <button className="btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
                    {isCheckingOut && <Cart order={order}/>}
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