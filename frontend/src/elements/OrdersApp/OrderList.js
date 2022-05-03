import React from "react";
import Order from "./Order";

export default function OrderList(props){
    const{orders,heading,toggleTick,id}=props;

    
    const toggleB=(id)=>{
        // console.log("going to orderlistapp from order-list");
        toggleTick(id);
    }

    return (
    <div className="mt-3">
        <h2>{heading} Orders</h2>
        {orders.length>0?
            <div className="d-flex flex-wrap" id={id}>
                {orders.map(order=><Order key={order._id} order={order} toggleB={toggleB}/>)}
            </div>
            :<h3>No Orders yet!</h3>
        }
    </div>
        
    )
}