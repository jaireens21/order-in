import React, {useState} from "react";


export default function MenuItem(props){
    const{item,handleIncreaseButton,handleDecreaseButton,handleAddToOrder}=props;
    
    const [isAdding, setIsAdding]=useState(false);

    const handleClick=(id)=>{
        setIsAdding(true);
        handleAddToOrder(id);
    }
        
    return(
        <div className="MenuItem">
           
            <div className="card mb-3 ms-3" style={{width: 18 + 'rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">$ {item.price}</h6>
                    <p className="card-text">{item.description}</p>
                    {(!isAdding || item.qty===0)? //do not show + - buttons if qty=0
                        <button className="btn btn-success" onClick={()=>handleClick(item._id)}>Add to Order</button>
                        :<div>
                            <button className="btn btn-dark me-3" onClick={()=>handleIncreaseButton(item._id)}>+</button>
                            {item.qty}
                            <button className="btn btn-dark ms-3" onClick={()=>handleDecreaseButton(item._id)}>-</button>
                        </div>
                    }
                </div>
            </div>
         
        </div>
    )
}
