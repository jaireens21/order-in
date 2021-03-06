//a form that collects customer info , special requests & date/time of order (after customer clicks on "checkout" in Cart)
//when customer clicks on place order, order is written to db, email is sent to customer & customer is redirected to /success where "cartSuccess.js" is displayed

import React from 'react';
import { useAlert } from 'react-alert';

export default function CartForm(props){
    const alert = useAlert();
    const {order,setOrder,saveOrdertoDB, today, todayStr, tomorrow, tomorrowStr, currentTimeInHours, currentMinutes, slots, handleGoBackBtn}=props;

    //add cart form' details to 'order' state
    const handleChange=(e)=>{
        setOrder({...order,[e.target.id]:e.target.value});
    }

    //When user clicks on "place order",
    //first validate phone number & email.
    //If validation goes through, save order details to DB
    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(order);

        let phoneNumber=document.getElementById("phone").value;
        let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        //permitted formats: 1234567890, 123-456-7890, 123.456.7890, 123 456 7890, (123) 456 7890

        let emailID=document.getElementById("email").value;
        // eslint-disable-next-line
        let emailRegex=/(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;

        if(emailRegex.test(emailID)){
            if (phoneRegex.test(phoneNumber)) {
                let formattedPhoneNumber = phoneNumber.replace(phoneRegex, "($1) $2-$3"); //convert phone number to a standard format, (123) 456-7890
                saveOrdertoDB({...order, phone:formattedPhoneNumber}); //save order details to DB via parent(orderonlineapp)
            }else{
             alert.error("Invalid phone number!");}
        }else {
            alert.error("Invalid Email!");
        }
    };

    //Display time slot options, depending on the day selected by the user
    let options=[];
    let orderDateStr=new Date(order.date).toLocaleDateString("en-CA");
    if(orderDateStr===todayStr){ //If the day selected is today, current time has to be taken into consideration
        options=slots.map(slot=>(slot>=(currentTimeInHours + currentMinutes/60 + 0.5))?
        // assuming restaurant  needs 30 minutes (0.5 hours)to prepare a meal
            <option key={slot}value={slot}>
                { slot>12.5? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>
            :null
        );
    }else{//if selected day is NOT today, show all slots
        options=slots.map(slot=>(<option key={slot}value={slot}>
                { slot>12.5? ((slot-12)%1===0?(slot-12):(slot-12.5)): (slot%1===0?slot:slot-0.5)}:{slot%1===0? "00":"30"} {slot>=12?"pm":"am"}
            </option>));
    };
    

    return(
        <div className="CartForm">
            <h2>Please fill in:</h2>
            
            <form  onSubmit={handleSubmit} >
                <label className="form-label" htmlFor="name">Name:</label>
                <input className="form-control" type="text" id="name" required onChange={handleChange} />
                
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-control" type="email" id="email" required onChange={handleChange} />

                <label className="form-label" htmlFor="phone">Phone:</label>
                <input className="form-control" type="tel" id="phone" placeholder="10 digit phone number" required onChange={handleChange} />  

                <label className="form-label" htmlFor="comments">Comments (optional):</label>
                <textarea className="form-control" rows="1" cols="3" id="comments" placeholder='Example: No Cutlery' onChange={handleChange} />

                <label className="form-label" htmlFor="category">Ordering method:</label>
                <select className="form-control" id="method" required onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="pickup">Pickup</option>
                    <option value="dinein">Dine-in</option>
                </select>
                <label className="form-label" htmlFor="date">Date</label>
                <select className="form-control" id="date" required onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value={today}>Today: {todayStr}</option>
                    <option value={tomorrow}>Tomorrow: {tomorrowStr}</option>
                    
                </select>
                <label className="form-label" htmlFor="time">Time</label>
                <select className="form-control" id="time" required onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    {options}
                    
                </select>

                <button type="submit" className="placeOrderBtn btn btn-primary" >Place Order</button>
                <button className="goBackBtn btn btn-secondary" onClick={handleGoBackBtn} >Go Back</button>         
            </form>
            
        </div>
    )

}
