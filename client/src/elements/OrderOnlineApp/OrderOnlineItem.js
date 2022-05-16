//every dish becomes a orederOnlineItem , complete with its own qty buttons

import React, {useState} from "react";


export default function OrderOnlineItem(props){
    const{item,handleIncreaseButton,handleDecreaseButton,handleAddToOrder}=props;
    
    const [isAdding, setIsAdding]=useState(false);//state to help show/hide + - buttons

    const handleClick=(id)=>{
        setIsAdding(true);
        handleAddToOrder(id);
    }
        
    return(
        <div className="OrderOnlineItem">
            <div className="leftSide">
                <p><strong>{item.name}</strong></p>
                <p>{item.description}</p>
                    
            </div>
            <div className="rightSide">
                <p><strong>${item.price}</strong></p>
                <div>
                    {(!isAdding || item.qty===0)? //do not show + - buttons if qty=0
                    <button className="addBtn btn btn-success" onClick={()=>handleClick(item._id)}>Add to Order</button>
                    :<div>
                        <button className="qtyBtn btn btn-dark" onClick={()=>handleDecreaseButton(item._id)} aria-label="click to decrease quantity">-</button>
                        {item.qty}
                        <button className="qtyBtn btn btn-dark" onClick={()=>handleIncreaseButton(item._id)} aria-label="click to increase quantity">+</button>
                    </div>
                    }
                </div> 
            </div>
                    
                    
                
            
         
        </div>
    )
}
