import React from "react";
import useToggleState from "../hooks/useToggleState";
import EditFormDish from "./EditFormDish";

export default function Dish(props){
    const{dish, saveDish, removeDish}=props;

    const [isEditing, toggleIsEditing]=useToggleState(false);

    const saveEditedDish=(editedDish,id)=>{
        saveDish(editedDish,id);
    }

    
    return(isEditing?
        //if editing, show a form to edit the dish
        <EditFormDish dish={dish} toggleIsEditing={toggleIsEditing} saveEditedDish={saveEditedDish}/>
        :
        //if not editing, simply display the dish
        <div className="Dish">
            
            <ul>
                <li>Name: {dish.name}</li>
                <li>Category: {dish.category}</li>
                <li>Price (CAD): {dish.price}</li>
                <li>Description: {dish.description}</li>
                <li><button onClick={toggleIsEditing}><i className="material-icons">edit</i></button></li>
                <li><button onClick={()=>removeDish(dish.id)}><i className="material-icons">delete</i></button></li>
            </ul>
         
        </div>
    )
}
