import axios from "axios";
import React, {useState,useEffect, useCallback} from "react";
import useToggleState from "../hooks/useToggleState";
import Dish from "./Dish";
import AddDish from "./AddDish";

 export default function DishApp(){
    const [dishes,setDishes]=useState(null);

    const [successLoad,setSuccessLoad]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const [success,setSuccess]=useState(false);//for showing success message to user
    const [error, setError] = useState(null);//for showing error details to user

    const[message,setMessage]=useState("");//to display a different success message everytime

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

    //function to display initial loading error to user
    const getErrorView = (err) => {
        return (
            <div className="text-danger">
                <p>Oh no! Something went wrong. ( {err.message} ) </p>
                <p> Please try again later.</p>
                
            </div>
        );
    }

    //function to alert success to user
    const alertSuccess = () => {
        return (
            <div className="w-50 alert alert-success alert-dismissible fade show" role="alert">
                <p><strong>Yay! </strong> {message}</p>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        );
    }

    //function to alert failure to user
    const alertFailure = (err) => {
        return (
            <div className="w-50 alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oh no!</strong> Something went wrong: {err.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        );
    }

    //get existing data from server/db
    const loadData=useCallback(()=>{ //useCallback used to resolve a warning of missing dependencies in useEffect
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccessLoad(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            setDishes(res.data.data); //show dishes 
        })
        .catch(err=>{
            setLoadError(err);
            console.log("error while fetching all the dishes");
            displayError(err); //show error on console
        })
    },[TIMEOUT_INTERVAL])

    //fetch initial data on load
    useEffect(()=>{
        loadData();
    },[loadData])

    
    //show a spinner while initial data is being loaded/fetched thru axios
    const getDishes = () => {
        if(!successLoad) {//show a spinner
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else{
            return (//show data
                <div className="DishList">
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

    const saveNewDish=(newDish)=>{
        //send to server for updating DB
        axios.post('http://localhost:8010/api',newDish)
        .then(res=>{
            setSuccess(true);//alert success to user
            setMessage("The dish was added successfully!");//success message
            setError(null);
            setDishes([...dishes,res.data.data]); //update local state to re-render list of dishes
        })
        .catch(err=>{
            setError(err);//alert failure to user
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
            setError(null);
            setDishes(dishes.filter(dish=>dish._id!==id));//update local state to re-render list of dishes
        })
        .catch(err=>{
            setError(err);//alert failure to user
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
            setError(null);
            setDishes(dishes.map(dish=>dish._id===id?editedDish :dish));//update local state to re render list with new data
        })
        .catch(err=>{
            setError(err);//alert failure to user
            setSuccess(false);
            console.log("axios detected error while updating a dish");
            displayError(err);//show error details in console
        })
    }

    return(
        <div className="w-50 mx-auto mt-5">
            
            {error && alertFailure(error) }  
            {success && alertSuccess()}

            <button className="btn btn-success" onClick={toggleIsAdding} >Add A New Dish</button>         
            {isAdding && <AddDish saveNewDish={saveNewDish} toggleIsAdding={toggleIsAdding}/>}

            {loadError? getErrorView(loadError) : getDishes()} 
            {/* if there is an error while loading data, show that error */}
            {/* else show the loaded data & button to add a new dish */}
        
        </div>
    );
}