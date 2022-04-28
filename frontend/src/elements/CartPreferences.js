import React from 'react';

export default function CartPreferences(props){
    const {order,setOrder,saveOrdertoDB, today, todayStr, tomorrow, tomorrowStr, currentTimeInHours, currentMinutes, slots}=props;

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
    let orderDateStr=new Date(order.date).toLocaleDateString("en-CA");
    if(orderDateStr===todayStr){
        options=slots.map(slot=>(slot>=(currentTimeInHours + currentMinutes/60 + 0.5))?
        // assuming restaurant  needs 30 minutes (0.5 hours)to prepare a meal
            <option key={slot}value={slot}>
                { slot>12.5? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>
            :null
        );
    }else{
        options=slots.map(slot=>(<option key={slot}value={slot}>
                { slot>12.5? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>));
    };
    
    

return(
    <div className="w-50 ms-3 CartPreferences">
        <h2>Please fill in details & preferences</h2>
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
                <option value={today}>Today: {todayStr}</option>
                <option value={tomorrow}>Tomorrow: {tomorrowStr}</option>
                
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
