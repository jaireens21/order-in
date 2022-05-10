import axios from "axios";
import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../../hooks/useToggleState";
import Dish from "./Dish";
import AddDish from "./AddDish";
import { useAlert } from 'react-alert';
import "./DishApp.css";



 export default function DishApp(){
    const alert = useAlert();

    const [dishes,setDishes]=useState(null);

    const [loadSuccess,setLoadSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const [isAdding, toggleIsAdding]=useToggleState(false);
    
    
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

    
    //read existing data from server/db
    const loadData=useCallback(()=>{ 
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL, withCredentials: true })
        .then(res=>{
            setLoadSuccess(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            setDishes(res.data.data); //save all fetched dishes into state called "dishes"
            //setState will cause a re-render
        })
        .catch(err=>{
            setLoadError(err);
            setLoadSuccess(false);
            console.log("error while fetching all the dishes");
            displayError(err); //show error on console
        })
    },[TIMEOUT_INTERVAL]);

    
    //useEffect runs on first render & every update
    useEffect(()=>{
        loadData(); //read data from db
    },[loadData]) 
    //loadData is a dependency for this useEffect hook
    //But, the 'loadData' function makes the dependency (loadData) change on every render. To fix this, wrap the definition of 'loadData' in its own useCallback() Hook that will return a memoized function

    const saveNewDish=(newDish)=>{
        //send to server for updating DB
        axios.post('http://localhost:8010/api',newDish,{ withCredentials: true })
        .then(res=>{
            // window.alert("The dish was added successfully!");
            alert.success("Dish added successfully!");
            
            //setDishes([...dishes,res.data.data]); //update local state to re-render list of dishes
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            alert.error(`Oh no! Could not save the dish! ${err.message}`);
            console.log("error while saving new dish");
            displayError(err);//show error details in console
        })
    }

    const removeDish=(id)=>{
        axios.delete(`http://localhost:8010/api/${id}`,{ withCredentials: true })
        .then(res=>{
            alert.success("Dish deleted!");
            //setDishes(dishes.filter(dish=>dish._id!==id));//update local state to re-render list of dishes
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            alert.error(`Oh no! Could not delete that dish! ${err.message}`);
            console.log("error while deleting dish");
            displayError(err);//show error details in console
        })
    }


    const saveDish=(editedDish,id)=>{
        axios.put(`http://localhost:8010/api/${id}`,editedDish,{ withCredentials: true })
        .then(res=>{
            alert.success("Dish updated!");

            //setDishes(dishes.map(dish=>dish._id===id?editedDish :dish));//update local state to re render list with new data
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            alert.error(`Oh no! Could not update the dish! ${err.message}`);
            console.log("error while updating dish");
            displayError(err);//show error details in console
        })
    }

    const handleCategoryClick=(e)=>{
        e.target.innerHTML= (e.target.innerHTML.includes("▼") ? e.target.innerHTML.replace("▼", "▲"): e.target.innerHTML.replace("▲","▼"));
        if(e.target.innerHTML.includes('Appetizers')){
            document.getElementById("appetizer").classList.toggle("hidden");
        }else if(e.target.innerHTML.includes('Main Course')){
            document.getElementById("mainCourse").classList.toggle("hidden");
        }else if(e.target.innerHTML.includes('Breads')){
            document.getElementById("bread").classList.toggle("hidden");
        }else if(e.target.innerHTML.includes('Drinks')){
            document.getElementById("drink").classList.toggle("hidden");
        }else if(e.target.innerHTML.includes('Desserts')){
            document.getElementById("dessert").classList.toggle("hidden");
        }
    }
    
    const getDishes = () => {
        if(loadError){//if there was an error in reading data using axios, show the error
            return (
                <div className="text-center mx-auto">
                    <h1 className="text-danger mb-5">Oh no! Something went wrong. ( {loadError.message} ) </h1>
                    
                    <h2> Please try refreshing the page.</h2>
                </div>
            );
        }
        else if(!loadSuccess) {
            //if there is no error but loadSuccess is not true yet
            //means we are still waiting for data
            //so we show a spinner to the user
            return (
                <div className="text-center mx-auto">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else{
            //there is no error, & loadSuccess is true
            //we show the data
            return (
                <>
                    <h1 className="text-center">DISHES</h1>
                    <button className="btn btn-success mb-3" onClick={toggleIsAdding}>Add A New Dish</button>         
                    {isAdding && <AddDish saveNewDish={saveNewDish} toggleIsAdding={toggleIsAdding}/>}

                    <h2 onClick={handleCategoryClick}>Appetizers ▼</h2>
                    <div className="d-flex flex-wrap hidden" id="appetizer">
                    {dishes.map(dish=>(dish.category==="appetizer" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
                    </div>
                    

                    <h2 onClick={handleCategoryClick}>Main Course ▼</h2>
                    <div className="d-flex flex-wrap hidden" id="mainCourse">
                    {dishes.map(dish=>(dish.category==="mainCourse" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
                    </div>

                    <h2 onClick={handleCategoryClick}>Breads ▼</h2>
                    <div className="d-flex flex-wrap hidden" id="bread">
                    {dishes.map(dish=>(dish.category==="bread" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish} />))}
                    </div>

                    <h2 onClick={handleCategoryClick}>Drinks ▼</h2>
                    <div className="d-flex flex-wrap hidden" id="drink">
                    {dishes.map(dish=>(dish.category==="drink" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish} />))}
                    </div>

                    <h2 onClick={handleCategoryClick}>Desserts ▼</h2>
                    <div className="d-flex flex-wrap hidden" id="dessert">
                    {dishes.map(dish=>(dish.category==="dessert" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish} />))}
                    </div>
                </>
            )
        }
    }

    
    return(
        <div className="DishApp">
            
            {getDishes()} 
            
        </div>
    );
}