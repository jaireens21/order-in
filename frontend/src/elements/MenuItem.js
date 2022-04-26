import React, {useEffect, useState} from "react";
import useToggleState from "../hooks/useToggleState";


export default function MenuItem(props){
    const{item,setOrder}=props;
    const [qty, setQty]=useState(0);
    const [isAdding, toggleIsAdding]=useToggleState(false);

    const handleIncreaseButton=()=>{
        setQty(prevQty=>prevQty+1);
    }
    const handleDecreaseButton=()=>{
        setQty(prevQty=>prevQty-1);
    }

    const handleAddToOrder=()=>{
        toggleIsAdding();
        setQty(1);
        setOrder(prevOrder=>[...prevOrder,{...item,qty:1}]);
    }

    useEffect(()=>{
        setOrder(prevOrder=>prevOrder.map(orderItem=>orderItem._id===item._id?{...orderItem,qty:qty}:orderItem));
    },[qty])
    //update order whenever an item's qty changes
        
    return(
        <div className="MenuItem">
           
            <div className="card mb-3 mx-auto" style={{width: 18 + 'rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">$ {item.price}</h6>
                    <p className="card-text">{item.description}</p>
                    {(!isAdding || qty===0)? //do not show + - buttons if qty=0
                        <button className="btn btn-success" onClick={handleAddToOrder}>Add to Order</button>
                        :<div>
                            <button className="btn btn-dark me-3" onClick={handleIncreaseButton}>+</button>
                            {qty}
                            <button className="btn btn-dark ms-3" onClick={handleDecreaseButton}>-</button>
                        </div>
                    }
                </div>
            </div>
         
        </div>
    )
}
