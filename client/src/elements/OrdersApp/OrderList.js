//order list- past, todays & upcoming orders

import React from "react";
import Order from "./Order";

export default function OrderList(props){
    const{orders,toggleTick,id,heading}=props;

    
    const toggleB=(id)=>{
        // console.log("going to orderlistapp from order-list");
        toggleTick(id);
    }

    return (
        <div className="OrderList" id={id}>
            {orders.length>0? orders.map(order=><Order key={order._id} order={order} toggleB={toggleB} heading={heading}/>) :<><h3 className="red mt-5 mb-3 mx-auto border-bottom">No Orders yet!</h3>  </>}
        </div>
        
    )
}