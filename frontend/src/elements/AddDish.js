import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

 export default function AddDish(){
    let navigate = useNavigate();

    const [dish,setDish]=useState({name:"",category:"",description:"",price:0});

    const handleChange=(e)=>{
        setDish({...dish, [e.target.id]: e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        //console.log('dish',dish);
        //send data to node for saving to db
        axios.post('http://localhost:8010/add',dish)
        .then(res=>{
            //console.log(res.data);
            //FLASH a success message
            //redirect to menu page
            navigate('/menu');
        })
        .catch(err=>{
            console.log(err);
            //FLASH an error message
            //redirect to add a dish page
            navigate('/add');
        });
    }

     return(
         <div className="newDish w-50 mx-auto my-5">
            <h1>Add a new dish</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="name">Enter name of dish:</label>
                <input className="form-control mb-3" type="text" id="name" required onChange={handleChange}/>

                <label className="form-label" htmlFor="category">Select a category:</label>
                <select className="form-control mb-3" id="category" required onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="mainCourse">Main Course</option>
                    <option value="breads">Breads</option>
                    <option value="drinks">Drinks</option>
                    <option value="dessert">Dessert</option>
                </select>
                

                <label className="form-label" htmlFor="description">Enter Description of dish:</label>
                <input className="form-control mb-3" type="text" id="description" required onChange={handleChange}/>

                <label className="form-label" htmlFor="price">Enter price of dish (CAD):</label>
                <input className="form-control mb-3" type="number" id="price" min="0" max="99" step="0.01" required onChange={handleChange}/>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            
         </div>
         
     )
 }