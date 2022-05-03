import React from "react";

export default function Cart(props){
    const {items,handleCheckoutClick,handleXClick,subtotal}=props;
   
    return(
        <div className="Cart mb-5 w-100">
            <div className="card">
                <div className="card-header text-center fw-bold fs-5">
                    CART
                </div>
                <ul className="list-group list-group-flush">
                    {items.some(item=>item.qty>0)?
                        //if there is some item in the cart
                        <div>
                            {items.map(item=>(
                                item.qty>0 && //donot show item if qty=0
                                <li className="list-group-item" key={item._id}>{item.name} ({item.qty}) : $ {(item.price * item.qty).toFixed(2)}<button onClick={()=>handleXClick(item._id)} className="btn">X</button></li>
                            ))}
                            <li className="list-group-item" key="subtotal">Sub-total : $ {subtotal}</li>
                            <li className="list-group-item" key="taxes">Taxes (13%) : $ {(subtotal*0.13).toFixed(2)}</li>
                            <li className="list-group-item" key="total">Total : $ {(subtotal*1.13).toFixed(2)}</li>
                        </div>
                        
                        : //if there is no item in the cart
                        <li className="list-group-item">Cart is empty!</li>
                    }
                    
                    
                </ul>
                <button className="btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
                </div>
        </div>
    )

}