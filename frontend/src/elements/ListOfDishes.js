import axios from "axios";
import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Dish from "./Dish";
import AddDish from "./AddDish";

 export default function Menu(){
    const [dishes,setDishes]=useState([]);

    //GET DATA FROM SERVER/DB
    useState(()=>{
        axios.get('/api')
        .then(res=>setDishes(res.data.data))
        .catch(err=>{
            console.log(err);
            //HANDLE THE ERROR!!!!
        })
    },[])

    const saveDish=(editedDish,id)=>{
        setDishes(dishes.map(dish=>dish.id===id?editedDish :dish));
        //SEND TO SERVER FOR UPDATING DB
    }

    const saveNewDish=(newDish)=>{
        setDishes([...dishes,{...newDish,id:uuidv4()}]);
        //SEND TO SERVER FOR UPDATING DB
    }

    const removeDish=(id)=>{
        console.log("removing id:",id);
        setDishes(dishes.filter(dish=>dish.id!==id));
        ////SEND TO SERVER FOR UPDATING DB
    }
    
    return(
        <div>
        
        <div className="menu">
            <h1>List of all the dishes served by us</h1>
            
            <AddDish saveNewDish={saveNewDish}/>

            <div className="DishList">
                {dishes.map(dish=>( <Dish key={dish.id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
            </div>
            
        </div>
        </div>
    )
 }