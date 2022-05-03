import React from "react";
import useToggleState from "../../hooks/useToggleState";
import EditDish from "./EditDish";

export default function Dish(props){
    const{dish, saveDish, removeDish}=props;

    const [isEditing, toggleIsEditing]=useToggleState(false);

    const saveEditedDish=(editedDish,id)=>{
        saveDish(editedDish,id);//send data upto parent -dish app
    }
    const confirmDeleteDish=(id,e)=>{
        let result= window.confirm ('Are you sure you want to delete this dish?');//popup to confirm user intention
        if(!result){
            e.preventDefault();
        }else{
            removeDish(id);
        }
    }
    
    return(isEditing?
        //if editing, show a form to edit the dish
        <EditDish dish={dish} toggleIsEditing={toggleIsEditing} saveEditedDish={saveEditedDish}/>
        :
        //if not editing, simply display the dish
        <div className="Dish">
            
            <div className="card mb-3 me-3" style={{width: 18 + 'rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{dish.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">$ {dish.price}</h6>
                    <p className="card-text">{dish.description}</p>
                    <button className="btn btn-primary me-3" onClick={toggleIsEditing}>Edit</button>
                    <button className="btn btn-danger" onClick={(e)=>confirmDeleteDish(dish._id,e)}>Delete</button>
                </div>
            </div>
         
        </div>
    )
}
