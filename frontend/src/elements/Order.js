import React from "react";

export default function Order(props){
    const{order}=props;
    let date=order.date;
    let dateStr=new Date(date).toLocaleDateString();
   let time=order.time;
   let displayTime=  (time>12.5? ((time-12)%1===0?(time-12):(time-12.5)): (time%1===0?time:time-0.5))+":"+ (time%1===0? "00":"30") +" "+ (time>=12?"pm":"am");

    return(
        <div className="Order card" style={{width: 18+'rem'}}>
            <div className="card-header">
                {order.name}, {order.method}, $ {order.total}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{order.phone} , {order.email}</li>
                <li className="list-group-item">{dateStr} , {displayTime}</li>
                <li className="list-group-item">{order.comments}</li>
                
                {order.items.map(item=><li className="list-group-item" key={item.name}>{item.qty} x {item.name}</li>)}
                {/* ALSO DISPLAY ORDER TOTAL */}
            </ul>
            
        </div>
    )
}