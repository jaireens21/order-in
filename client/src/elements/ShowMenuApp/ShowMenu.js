//shows menu to the customer, with a pretty background image
//fetches dishes from DB, so any changes made by owner in the dishes are reflected here immediately
//plugs into outlet in layout.js

import React, {useState,useEffect,useCallback} from "react";
import "./ShowMenu.css";
import displayError from "../../utils/displayError";
import { axiosInstance, TIMEOUT_INTERVAL} from "../../utils/axiosInstance";

export default function ShowMenu(){

    const [items,setItems]=useState(null);
    const [loadSuccess,setLoadSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    
    //get all menu items from server/db
    const loadData=useCallback(()=>{ 
        axiosInstance.get('/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setLoadSuccess(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            let dishes=res.data.data;
            setItems(dishes.map(dish=>({...dish,qty:0}))); //store all the dishes in a state called 'items' with qty set to 0 for each item
            //this will help in creating the order later
        })
        .catch(err=>{
            setLoadError(err);
            setLoadSuccess(false);
            console.log("error while fetching menu items");
            displayError(err); //show error on console
        })
    },[]);

    //read data from db
    useEffect(()=>{
        loadData();
    },[loadData])

    
    const handleClick=(e)=>{
        
        if(e.target.innerHTML==="Appetizers"){
            document.getElementById("appetizer").classList.toggle("hidden");
            e.target.classList.toggle("red");
        }
        if(e.target.innerHTML.includes("Main")){
            document.getElementById("mainCourse").classList.toggle("hidden");
            e.target.classList.toggle("red");
        }
        if(e.target.innerHTML==="Breads"){
            document.getElementById("bread").classList.toggle("hidden");
            e.target.classList.toggle("red");
        }
        if(e.target.innerHTML==="Drinks"){
            document.getElementById("drink").classList.toggle("hidden");
            e.target.classList.toggle("red");
        }
        if(e.target.innerHTML==="Desserts"){
            document.getElementById("dessert").classList.toggle("hidden");
            e.target.classList.toggle("red");
        }
    }

    //display details of an item on the menu
    const displayItems=(item)=>{
        return(
            <div key={item._id}>
                <div className="d-flex justify-content-between">
                    <p><strong>{item.name}</strong></p>
                    <p><strong>${item.price}</strong></p> 
                </div>
                
                <p id="dishDescription">{item.description}</p>
               
                <hr/>

                
            </div>
        )
    }

    //display the data (reading from db using axios)
    const getItems = () => {
        if(loadError){ //if there was an error in reading data using axios, show the error
            return (
                <div className="text-center ">
                    <h1 className="text-danger mb-5">Oh no! Something went wrong. {loadError.message}! </h1>
                    <h2> Please try refreshing the page.</h2>
                </div>
            );
        }
        else if(!loadSuccess) {
            //if there is no error but loadSuccess is not true yet
            //means we are still waiting for data
            //so we show a spinner to the user
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else {
            //there is no error, & loadSuccess is true
            //we display the data
            return (
                
                <div className="menu">
                    <h2 className="" onClick={handleClick} aria-label="click here to see/hide appetizers">Appetizers</h2>
                    <div className="categoryItems" id="appetizer">
                        {items.map(item=>(item.category==="appetizer" && 
                            displayItems(item)))
                        }
                    </div>
                    
                    
                    <h2 className="red" onClick={handleClick} aria-label="click here to see/hide main course">Main Course</h2>
                    <div className="categoryItems hidden" id="mainCourse">
                        {items.map(item=>(item.category==="mainCourse" && 
                            displayItems(item)))
                        }
                    </div>
                    
                    <h2 className="red" onClick={handleClick} aria-label="click here to see/hide breads">Breads</h2>
                    <div className="categoryItems hidden" id="bread">
                        {items.map(item=>(item.category==="bread" && 
                            displayItems(item)))
                        }
                    </div>
                    
                    <h2 className="red" onClick={handleClick} aria-label="click here to see/hide drinks">Drinks</h2>
                    <div className="categoryItems hidden" id="drink">
                        {items.map(item=>(item.category==="drink" && 
                            displayItems(item)))
                        }
                    </div>
                    
                    <h2 className="red" onClick={handleClick} aria-label="click here to see/hide desserts">Desserts</h2>
                    <div className="categoryItems hidden" id="dessert">
                        {items.map(item=>(item.category==="dessert" && 
                            displayItems(item)))
                        }
                    </div>
                    
                </div>
                
            )
        };
    }

    return(
        <div className="ShowMenu">
            
            <h1>Menu</h1>
            {getItems()} 
            
        </div>
    )
}