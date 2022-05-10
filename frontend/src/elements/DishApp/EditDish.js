import React,{useState} from "react";


export default function EditDish(props){

    const{dish, saveEditedDish, toggleIsEditing}=props;
    const [editedDish,setEditedDish]=useState(dish);

    const handleChange=(e)=>{
        setEditedDish({...editedDish, [e.target.id]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("submitting edited dish");
        saveEditedDish(editedDish, editedDish._id); //send data upto parent-dish
        toggleIsEditing();
    }
    const handleCancel=(e)=>{
        e.preventDefault();
        toggleIsEditing();
    }
    return(
        < >
            {/* <h2>Edit dish</h2> */}
            
            <form className="EditDishForm" onSubmit={handleSubmit}>
                
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-control mb-3" type="text" id="name" value={editedDish.name} required onChange={handleChange}/>

                <label className="form-label" htmlFor="category">Category:</label>
                <select className="form-control mb-3" id="category" required defaultValue={dish.category}onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="mainCourse">Main Course</option>
                    <option value="bread">Breads</option>
                    <option value="drink">Drinks</option>
                    <option value="dessert">Dessert</option>
                </select>
                
                <label className="form-label" htmlFor="price">Price (CAD):</label>
                <input className="form-control mb-3" type="number" id="price" min="0" max="99" step="0.01" required value={editedDish.price} onChange={handleChange}/>

                <label className="form-label" htmlFor="description">Description:</label>
                <textarea className="form-control mb-3" rows="5" cols="5" id="description" value={editedDish.description} required onChange={handleChange}/>
                
                <button type="submit" className="btn btn-success me-3" aria-label="save changes">Save</button>
                <button className="btn btn-danger" onClick={handleCancel} aria-label="cancel changes">Cancel</button>
            </form>
            
        </>
    )
}