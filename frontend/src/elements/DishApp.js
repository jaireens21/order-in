import axios from "axios";
import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../hooks/useToggleState";
import Dish from "./Dish";
import AddDish from "./AddDish";


 export default function DishApp(){
    const [dishes,setDishes]=useState(null);

    const [successLoad,setSuccessLoad]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const [error, setError] = useState(false);//for showing error message to user
    const [success,setSuccess]=useState(false);//for showing success message to user
    const[message,setMessage]=useState("");//to flash a different message for success/error

    
    
    const [isAdding, toggleIsAdding]=useToggleState(false);
    
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

    
    //read existing data from server/db
    const loadData=useCallback(()=>{ 
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccessLoad(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            setDishes(res.data.data); //save all fetched dishes into state called "dishes"
            //setState will cause a re-render
        })
        .catch(err=>{
            setLoadError(err);
            setSuccessLoad(false);
            console.log("error while fetching all the dishes");
            displayError(err); //show error on console
        })
    },[TIMEOUT_INTERVAL])

    
    //useEffect runs on first render & every update
    useEffect(()=>{
        loadData(); //read data from db
    },[loadData]) 
    //loadData is a dependency for this useEffect hook
    //But, the 'loadData' function makes the dependency (loadData) change on every render. To fix this, wrap the definition of 'loadData' in its own useCallback() Hook that will return a memoized function

    
    const getDishes = () => {
        if(loadError){//if there was an error in reading data using axios, show the error
            return (
                <div className="text-danger">
                    <p>Oh no! Something went wrong. ( {loadError.message} ) </p>
                    <p> Please try again later.</p>
                </div>
            );
        }
        else if(!successLoad) {
            //if there is no error but successLoad is not true yet
            //means we are still waiting for data
            //so we show a spinner to the user
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else{
            //there is no error, & successLoad is true
            //we show the data
            return (
                <div>
                    <button className="btn btn-success" onClick={toggleIsAdding} >Add A New Dish</button>         
                    {isAdding && <AddDish saveNewDish={saveNewDish} toggleIsAdding={toggleIsAdding}/>}

                    <h2>Appetizers</h2>
                    {dishes.map(dish=>(dish.category==="appetizer" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}

                    <h2>Main Course</h2>
                    {dishes.map(dish=>(dish.category==="mainCourse" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}

                    <h2>Breads</h2>
                    {dishes.map(dish=>(dish.category==="breads" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}

                    <h2>Drinks</h2>
                    {dishes.map(dish=>(dish.category==="drinks" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}

                    <h2>Desserts</h2>
                    {dishes.map(dish=>(dish.category==="dessert" && <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
                </div>
            )
        }
    }

    const flashMessage=()=>{
        if(error){
            return(
                <div className=" alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Oh no!</strong> Something went wrong. ( {message} ! )
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        } 
        if(success){
            return (
                <div className=" alert alert-success alert-dismissible fade show" role="alert">
                    <p><strong>Yay! </strong> {message}</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        }
    }



    const saveNewDish=(newDish)=>{
        //send to server for updating DB
        axios.post('http://localhost:8010/api',newDish)
        .then(res=>{
            setSuccess(true);//alert success to user
            setMessage("The dish was added successfully!");//success message
            setError(false);
            //setDishes([...dishes,res.data.data]); //update local state to re-render list of dishes
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            setError(true);//alert failure to user
            setMessage(err.message);
            setSuccess(false);
            console.log("axios detected error while saving a new dish");
            displayError(err);//show error details in console
        })
    }

    const removeDish=(id)=>{
        axios.delete(`http://localhost:8010/api/${id}`)
        .then(res=>{
            setSuccess(true);//alert success to user
            setMessage("The dish was deleted!");//success message
            setError(false);
            //setDishes(dishes.filter(dish=>dish._id!==id));//update local state to re-render list of dishes
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            setError(true);//alert failure to user
            setMessage(err.message); //error message
            setSuccess(false);
            console.log("axios detected error while deleting a dish");
            displayError(err);//show error details in console
        })
    }


    const saveDish=(editedDish,id)=>{
        axios.put(`http://localhost:8010/api/${id}`,editedDish)
        .then(res=>{
            setSuccess(true);//alert success to user
            setMessage("The dish was updated successfully!");//success message
            setError(false);
            //setDishes(dishes.map(dish=>dish._id===id?editedDish :dish));//update local state to re render list with new data
            //do NOT do this
            //if multiple users add dishes to the db at the same time, user may see stale data
            //better to fetch data again using loadData()
            loadData();
        })
        .catch(err=>{
            setError(true);//alert failure to user
            setMessage(err.message);
            setSuccess(false);
            console.log("axios detected error while updating a dish");
            displayError(err);//show error details in console
        })
    }

    return(
        <div className="w-50 mx-auto mt-5">
            
            {flashMessage()}

            {getDishes()} 
            
        
        </div>
    );
}