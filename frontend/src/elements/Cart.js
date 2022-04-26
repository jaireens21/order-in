import React, {useState} from "react";



export default function Cart(props){
    const {order,handleCheckoutClick,handleXClick,total}=props;
   
  

    return(
        <div className="Cart">
            <div className="card" style={{width: 18+'rem'}}>
                <div className="card-header">
                    Order Details
                </div>
                <ul className="list-group list-group-flush">
                    {order.length>0?
                        order.map(item=>(
                            item.qty>0 && //donot show item if qty=0
                            <li className="list-group-item" key={item._id}>{item.name} ({item.qty}) : $ {(item.price * item.qty).toFixed(2)}<button onClick={()=>handleXClick(item._id)} className="btn">X</button></li>
                            
                        ))
                        :<li className="list-group-item">Cart is empty!</li>
                    }
                    <li className="list-group-item" key="total">Total : $ {total}</li>
                    
                </ul>
                <button className="btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
                </div>
        </div>
    )

}