import axios from "axios";
import React, {useState} from "react";

 export default function Menu(){
    const [dishes,setDishes]=useState({});
    useState(()=>{
        axios.get('/api')
        .then(res=>setDishes(res.data.data))
        .catch(err=>{
            console.log(err);
            //HANDLE THE ERROR!!!!
        })
    },[])

     return(
         <div className="menu">
            <h1>Menu</h1>
            <h2>Display all dishes</h2>
            <ul>
                {dishes.map(dish=>(
                    <li key={dish._id}>{dish.name}</li>
                ))}
            </ul>
         </div>
         
     )
 }