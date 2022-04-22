import axios from "axios";
import React, {useState} from "react";
// import { v4 as uuidv4 } from 'uuid';
import Dish from "./Dish";
import AddDish from "./AddDish";

 export default function Menu(){
    const [dishes,setDishes]=useState([]);

    //get existing data from server/db
    useState(()=>{
        axios.get('http://localhost:8010/api')
        .then(res=>setDishes(res.data.data))
        .catch(err=>{
            console.log(err);
            //HANDLE THE ERROR!!!!
        })
    },[])

    const saveNewDish=(newDish)=>{
        //send to server for updating DB
        axios.post('http://localhost:8010/api',newDish)
        .then(res=>{
            setDishes([...dishes,res.data.data]); //update local state to re-render list of dishes
            //FLASH A SUCCESS MESSAGE OR STH
        })
        .catch(err=>{
            console.log('error while saving new dish to database',err);
            //HANDLE THE ERROR!!!!
        })
    }

    const removeDish=(id)=>{
        axios.delete(`http://localhost:8010/api/${id}`)
        .then(res=>{
            setDishes(dishes.filter(dish=>dish._id!==id));//update local state to re-render list of dishes
        })
        .catch(err=>{
            console.log('error while deleting dish from database',err);
            //HANDLE THE ERROR!!!!
        })
    }


    const saveDish=(editedDish,id)=>{
        axios.put(`http://localhost:8010/api/${id}`,editedDish)
        .then(res=>{
            setDishes(dishes.map(dish=>dish._id===id?editedDish :dish));//update local state
        })
        .catch(err=>console.log('error while saving dish details to database',err))
    }

    
    
    return(
        <div>
        
        <div className="list">
                      
            <AddDish saveNewDish={saveNewDish}/>

            <div className="DishList">
                {dishes.map(dish=>( <Dish key={dish._id} dish={dish} saveDish={saveDish} removeDish={removeDish}/>))}
            </div>
            
        </div>
        </div>
    )
 }