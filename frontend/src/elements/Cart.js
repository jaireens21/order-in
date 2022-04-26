import React from "react";



export default function Cart(props){
    const {items,handleCheckoutClick,handleXClick,total}=props;
   
  

    return(
        <div className="Cart">
            <div className="card" style={{width: 18+'rem'}}>
                <div className="card-header">
                    Order Details
                </div>
                <ul className="list-group list-group-flush">
                    {items.some(item=>item.qty>0)?
                        <div>
                            {items.map(item=>(
                                item.qty>0 && //donot show item if qty=0
                                <li className="list-group-item" key={item._id}>{item.name} ({item.qty}) : $ {(item.price * item.qty).toFixed(2)}<button onClick={()=>handleXClick(item._id)} className="btn">X</button></li>
                            ))}
                            <li className="list-group-item" key="subtotal">Sub-total : $ {total}</li>
                            <li className="list-group-item" key="taxes">Taxes (13%) : $ {(total*0.13).toFixed(2)}</li>
                            <li className="list-group-item" key="total">Total : $ {(total*1.13).toFixed(2)}</li>
                        </div>
                        
                        :<li className="list-group-item">Cart is empty!</li>
                    }
                    
                    
                </ul>
                <button className="btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
                </div>
        </div>
    )

}