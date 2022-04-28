import React from "react";
import Order from "./Order";

export default function OrderList(props){
    const{orders,heading}=props;

    return (
    <div className="mt-3">
        <h2>{heading} Orders</h2>
        {orders.length>0?
            <div className="d-flex">
                {orders.map(order=><Order key={order._id} order={order} />)}
            </div>
            :<h3>No Orders yet!</h3>
        }
    </div>
        
    )
}