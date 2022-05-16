import React, {useState} from "react";

export default function AddDish(props){
    const {saveNewDish,toggleIsAdding}=props;

    const initialState={name:"",category:"",description:"",price:0};
    const [newDish,setNewDish]=useState(initialState);

    const handleChange=(e)=>{
        setNewDish({...newDish, [e.target.id]: e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        saveNewDish(newDish);//save data in parent state
        setNewDish(initialState);//reset input fields
        toggleIsAdding();
    }

    const handleCancel=(e)=>{
        e.preventDefault();
        toggleIsAdding();
    }

     return(
         <div className="AddDish">
            <h2>Add a new dish</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="name">Enter name of dish:</label>
                <input className="form-control mb-3" type="text" id="name" value={newDish.name} required onChange={handleChange}/>

                <label className="form-label" htmlFor="category">Select a category:</label>
                <select className="form-control mb-3" id="category" required value={newDish.category} onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="mainCourse">Main Course</option>
                    <option value="bread">Breads</option>
                    <option value="drink">Drinks</option>
                    <option value="dessert">Dessert</option>
                </select>
                
                <label className="form-label" htmlFor="price">Enter price of dish (CAD):</label>
                <input className="form-control mb-3" type="number" id="price" min="0" max="999" step="0.01" required value={newDish.price} onChange={handleChange}/>

                <label className="form-label" htmlFor="description">Enter Description of dish:</label>
                <input className="form-control mb-3" type="text" id="description" value={newDish.description} required onChange={handleChange}/>

                <button type="submit" className="btn btn-success mb-3 me-3">Add dish</button>
                <button onClick={handleCancel} className="btn btn-danger mb-3" aria-label="cancel adding a new dish">Cancel</button>
            </form>
            
         </div>
         
     )
 }