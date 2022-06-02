import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../../hooks/useToggleState";
import Dish from "./Dish";
import AddDish from "./AddDish";
import { useAlert } from 'react-alert';
import "./DishApp.css";
import displayError from "../../utils/displayError";
import { axiosInstance, TIMEOUT_INTERVAL} from "../../utils/axiosInstance";


export default function DishApp(){
    const alert = useAlert();

    const [dishes,setDishes]=useState(null);

    const [loadSuccess,setLoadSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const [isAdding, toggleIsAdding]=useToggleState(false);
    
              
    //read existing data from server/db
    const loadData=useCallback(()=>{ 
        axiosInstance.get('/api', { timeout: TIMEOUT_INTERVAL, withCredentials: true })
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
    },[]);

    
    //useEffect runs on first render & every update
    useEffect(()=>{
        loadData(); //read data from db
    },[loadData]) 
    //loadData is a dependency for this useEffect hook
    //But, the 'loadData' function makes the dependency (loadData) change on every render. To fix this, wrap the definition of 'loadData' in its own useCallback() Hook that will return a memoized function

    //send to server for updating DB
    const saveNewDish=(newDish)=>{
       axiosInstance.post('/api',newDish,{ withCredentials: true })
        .then(res=>{
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
        axiosInstance.delete(`/api/${id}`,{ withCredentials: true })
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
        axiosInstance.put(`/api/${id}`,editedDish,{ withCredentials: true })
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
                    <button className="btn btn-success my-3" onClick={toggleIsAdding}>Add A New Dish</button>         
                    
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