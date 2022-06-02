//show dishes with qty>0 and total price of order
//click on checkout button brings up a form "cartPreferences" to fill in customer details & select date & time of order

import React from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Cart(props){
    const {items,handleCheckoutClick,handleXClick,subtotal}=props;
   
    return(
        <div className="Cart">
            
            <h2>CART</h2>
            <table className="cartTable table">
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
                            <tr key={item._id}>
                            <td>{item.qty}</td>
                            <td>{item.name}</td>
                            <td>{(item.price * item.qty).toFixed(2)}</td>
                            <td><button onClick={()=>handleXClick(item._id)} className="removeBtn"><RiDeleteBin6Line /></button></td>
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
                    </>
                    : 
                    <tr><td colSpan="4" className="text-center">Cart is empty!</td></tr>
                    }
                    
                    
                    
                </tbody>
            </table>
            <button className="checkoutBtn btn btn-danger" onClick={handleCheckoutClick}>Checkout</button>
        </div>
    )

}