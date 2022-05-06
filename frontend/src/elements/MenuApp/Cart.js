import React from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Cart(props){
    const {items,handleCheckoutClick,handleXClick,subtotal}=props;
   
    return(
        <div className="Cart">
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
                                <li className="list-group-item" key={item._id}>{item.name} ( {item.qty} ) : $ {(item.price * item.qty).toFixed(2)}<button onClick={()=>handleXClick(item._id)} className="btn"><RiDeleteBin6Line/></button></li>
                            ))}
                            <li className="list-group-item" key="subtotal">SUB-TOTAL : $ {subtotal}</li>
                            <li className="list-group-item" key="taxes">Taxes (13%) : $ {(subtotal*0.13).toFixed(2)}</li>
                            <li className="list-group-item" key="total"><strong>TOTAL : $ {(subtotal*1.13).toFixed(2)}</strong></li>
                        </div>
                        
                        : //if there is no item in the cart
                        <li className="list-group-item">Cart is empty!</li>
                    }
                    
                    
                </ul>
                <button className="btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Qty</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.some(item=>item.qty>0)?
                    
                    <>
                    {items.map(item=>(
                        item.qty>0 && 
                        <tr>
                        <td>{item.qty}</td>
                        <td>{item.name}</td>
                        <td>{(item.price * item.qty).toFixed(2)}</td>
                        <td><button onClick={()=>handleXClick(item._id)} className="btn"><RiDeleteBin6Line/></button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2">SUB-TOTAL :</td>
                        <td colSpan="2">$ {subtotal}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Taxes (13%) : </td>
                        <td colSpan="2">$ {(subtotal*0.13).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>TOTAL :</strong></td>
                        <td colSpan="2"><strong>$ {(subtotal*1.13).toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="4"><button className="checkout btn btn-danger" onClick={handleCheckoutClick}>Checkout</button></td>
                    </tr>
                    </>
                    : <tr><td colSpan="4" className="text-center">Cart is empty!</td></tr>
                    }
                    
                    
                    
                </tbody>
            </table>
        </div>
    )

}