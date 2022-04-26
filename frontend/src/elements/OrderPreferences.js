import React from 'react';

export default function OrderPreferences(props){
    const {order,setOrder,saveOrdertoDB, today, tomorrow, currentTimeInHours, slots}=props;

    //add details of the person ordering the food to 'order'
    const handleChange=(e)=>{
        setOrder({...order,[e.target.id]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //clear the form fields
        console.log(order);
        saveOrdertoDB(order); //save order details to DB via parent
       //redirect to 'order placed' page
    }
    let options=[];
    if(order.date===today){
        options=slots.map(slot=>(slot>currentTimeInHours+0.6 ? 
            <option key={slot}value={slot}>
                { slot>12? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>
            :null));
    }else{
        options=slots.map(slot=>(<option key={slot}value={slot}>
                { slot>12.5? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>));
    }
    

return(
    <div className="w-50 ms-3 OrderPreferences">
        <h1>Contact</h1>
        <form  onSubmit={handleSubmit} >
            <label className="form-label" htmlFor="name">Name:</label>
            <input className="form-control mb-3" type="text" id="name" aria-label="enter name" required onChange={handleChange} />
            
            <label className="form-label" htmlFor="email">Email:</label>
            <input className="form-control mb-3" type="email" id="email" aria-label="enter email address" required onChange={handleChange} />

            <label className="form-label" htmlFor="phone">Phone:</label>
            <input className="form-control mb-3" type="tel" id="phone" aria-label="enter phone number"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" required onChange={handleChange} />  

            <label className="form-label" htmlFor="comments">Comments (optional):</label>
            <textarea className="form-control mb-3" rows="5" cols="5" id="comments" aria-label='enter optional comments' placeholder='Example: No Cutlery' onChange={handleChange} />

            <label className="form-label" htmlFor="category">Ordering method:</label>
            <select className="form-control mb-3" id="method" required onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value="pickup">Pickup</option>
                <option value="dinein">Dine-in</option>
            </select>
            <label className="form-label" htmlFor="date">Date</label>
            <select className="form-control mb-3" id="date" required onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value={today}>Today</option>
                <option value={tomorrow}>Tomorrow</option>
                
            </select>
            <label className="form-label" htmlFor="time">Time</label>
            <select className="form-control mb-3" id="time" required onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {options}
                
            </select>

            <button type="submit" className="btn btn-primary me-3">Place Order</button>
            
        </form>
        
    </div>
)

}
