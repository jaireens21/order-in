import axios from "axios";
import React, {useState,useEffect} from "react";
// import { v4 as uuidv4 } from 'uuid';
import Dish from "./Dish";
import AddDish from "./AddDish";

 export default function Menu(){
    const [dishes,setDishes]=useState(null);
    const [error, setError] = useState(null);//for showing error details to user
    const TIMEOUT_INTERVAL = 60 * 1000; //for axios request
    
    //get existing data from server/db
    const loadData=()=>{
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setDishes(res.data.data);
            setError(null);
        })
        .catch(err=>{
            //if the server sent a status code in 400s or 500s, it is treated as an error(rejected promise)
            setError(err);//for displaying error to user
            console.log("error while fetching all the dishes");
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
        })

    }
    //run on load
    useEffect(()=>{
        loadData();
    },[])

    //show error to user
    const getErrorView = () => {
        if (error.message.includes('timeout')) {
            return (
            <div className="text-center ">
                <p>This is taking too long. Please try again later.</p>
            </div>);
        }else{ 
            return (
            <div className="text-center ">
                <p>Oh no! Something went wrong. {error.message}! </p>
                <button className="btn btn-primary" onClick={loadData}>
                Try again
                </button>
            </div>
            )
        }
    }

    //show a spinner while data is being fetched thru axios
    const getDishes = () => {
        if(dishes) {
          return (
            <div className="DishList">
                {dishes.map(dish=>( <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
            </div>
          )
        }else {
          return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
          )
        }
    }

    const saveNewDish=(newDish)=>{
        //send to server for updating DB
        axios.post('http://localhost:8010/api',newDish)
        .then(res=>{
            setDishes([...dishes,res.data.data]); //update local state to re-render list of dishes
            //FLASH A SUCCESS MESSAGE OR STH
        })
        .catch(err=>{
            console.log("axios detected error while saving a new dish");
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
        })
    }

    const removeDish=(id)=>{
        axios.delete(`http://localhost:8010/api/${id}`)
        .then(res=>{
            setDishes(dishes.filter(dish=>dish._id!==id));//update local state to re-render list of dishes
        })
        .catch(err=>{
            console.log("axios detected error while deleting a dish");
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
        })
    }


    const saveDish=(editedDish,id)=>{
        axios.put(`http://localhost:8010/api/${id}`,editedDish)
        .then(res=>{
            setDishes(dishes.map(dish=>dish._id===id?editedDish :dish));//update local state
        })
        .catch(err=>{
            console.log("axios detected error while updating a dish");
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
        })
    }

    
    
    return(
        <div>
        
        <div className="list">
                      
            <AddDish saveNewDish={saveNewDish}/>

            {/* <div className="DishList">
                {dishes.map(dish=>( <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
            </div> */}

            {error? getErrorView() : getDishes()}
            
        </div>
        </div>
    )
 }