import React from "react";

export default function Order(props){
    const{order,markOrderC,toggleB}=props;
    let date=order.date;//an object
    let dateStr=date.toLocaleDateString();
    let time=order.time; //a number
    let displayTime=  (time>12.5? ((time-12)%1===0?(time-12):(time-12.5)): (time%1===0?time:time-0.5))+":"+ (time%1===0? "00":"30") +" "+ (time>=12?"pm":"am");

    const handleMarkBtn=(id)=>{
        // console.log("going to order-list from order");
        markOrderC(id);
    };
    const toggleBtn=(id)=>{
        // console.log("going to order-list from order");
        toggleB(id);
    };
    let name="Order card my-2 mx-2";
    if(order.completed){
       name="text-decoration-line-through Order card my-2 mx-2";
    }

    return(
        <div className={name} style={{width: 18+'rem'}}>
            <div className="card-header">
                <input className="form-check-input" type="checkbox" onChange={()=>toggleBtn(order._id)} checked={order.completed}/> 
                <span> {order.name}, {order.method}, TOTAL: $ {order.total}</span>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Phone: {order.phone}</li>
                <li className="list-group-item">Email: {order.email}</li>
                <li className="list-group-item">Date: {dateStr} , {displayTime}</li>
                <li className="list-group-item">Comments: {order.comments}</li>
                <li className="list-group-item fw-bold">ITEMS</li>
                
                {order.items.map(item=><li className="list-group-item" key={item.name}>{item.qty} x {item.name}</li>)}
                
                {order.completed? null: <button className="btn btn-dark" onClick={()=>handleMarkBtn(order._id)}>Mark as complete</button> }
                
                
            </ul>
            
        </div>
        
    )
}