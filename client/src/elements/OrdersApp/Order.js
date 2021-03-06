//displays detials of every order, alongwith a checkbox to mark order as completed
//checkbox is not visible for past orders

import React from "react";

export default function Order(props){
    const{order,toggleB,heading}=props;
    let date=order.date;//an object
    let dateStr=date.toLocaleDateString();
    let time=order.time; //a number
    let displayTime=  (time>12.5? ((time-12)%1===0?(time-12):(time-12.5)): (time%1===0?time:time-0.5))+":"+ (time%1===0? "00":"30") +" "+ (time>=12?"pm":"am");

   
    const toggleBtn=(id)=>{
        // console.log("going to order-list from order");
        toggleB(id);
    };
    let name="Order card";
    if(order.completed){
       name="text-decoration-line-through Order card";
    }

    return(
        <div className={name}>
            
            <table className="table mb-0 text-start">
                <thead>
                    <tr>
                    <th scope="col">
                        {heading!=="past" && <input className="form-check-input" type="checkbox" onChange={()=>toggleBtn(order._id)} checked={order.completed} aria-label="mark order as completed"/> } 
                        
                    </th>
                    <th scope="col">{order.name.toUpperCase()}, {order.method.toUpperCase()}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th scope="row">TOTAL</th>
                        <td colSpan="2">$ {order.total}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phone</th>
                        <td>{order.phone}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{order.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Date</th>
                        <td>{dateStr} , {displayTime}</td>
                    </tr>
                    <tr>
                        <th scope="row">Comments</th>
                        <td>{order.comments? order.comments :"---"}</td>
                    </tr>
                    
                    
                </tbody>
            </table>

            <ul className="list-group list-group-flush mt-0 text-start">
                <li className="list-group-item fw-bold ps-2">ITEMS</li>
                {order.items.map(item=><li className="list-group-item ps-2" key={item.name}>{item.qty} x {item.name}</li>)}
            </ul>
            
        </div>
        
    )
}