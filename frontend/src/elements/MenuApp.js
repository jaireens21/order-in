import axios from "axios";
import React, {useState,useEffect,useCallback} from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import CartPreferences from "./CartPreferences";
import { useNavigate } from "react-router-dom";

export default function MenuApp(){

    const [items,setItems]=useState(null);
    const [loadSuccess,setLoadSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const [error, setError] = useState(false);//for showing error message to user
    const [success,setSuccess]=useState(false);//for showing success message to user
    const [message,setMessage]=useState("");//to flash a different message for success/error

    const[subtotal,setSubtotal]=useState(0);//subtotal price of order
    
    const taxes=0.13; //current taxes in ontario,Canada
    const [isCheckingOut, setIsCheckingOut]=useState(false);

    const[order,setOrder]=useState([]);//saving entire order in a state called 'order' after user clicks the checkout button

    let navigate = useNavigate();

    const today=new Date();   let currentTimeInHours=today.getHours(); let currentMinutes=today.getMinutes();
    let todayStr=today.toLocaleDateString("en-CA");
    let tomorrow = new Date(); tomorrow.setDate(today.getDate()+1);
    let tomorrowStr=tomorrow.toLocaleDateString("en-CA");

    const openingTime=11; //time in 24 hours format
    const closingTime=22; //time in 24 hrs format
    let slots=[]; const duration=0.5;//30 minute slots for pickup & dine-in
    for (let i=openingTime;i<closingTime;i=i+duration){
        slots.push(i);
    };

    const TIMEOUT_INTERVAL = 60 * 1000; //for axios request

    //function to display error details on console
    const displayError=(err)=>{
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
    }
   

    //get all items from server/db
    const loadData=useCallback(()=>{ 
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setLoadSuccess(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            let dishes=res.data.data;
            setItems(dishes.map(dish=>({...dish,qty:0}))); //store all the dishes in a state called 'items' with qty set to 0 for each item, this will help creating the order later
        })
        .catch(err=>{
            setLoadError(err);
            setLoadSuccess(false);
            console.log("error while fetching menu items");
            displayError(err); //show error on console
        })
    },[TIMEOUT_INTERVAL]);

    //read data from db
    useEffect(()=>{
        loadData();
    },[loadData])

       
    //update item qty to 1 when user clicks on "add to order" button
    const handleAddToOrder=(id)=>{
        setItems(items.map(item=>item._id===id?({...item,qty:1}):item));
    }
    //increase item qty when user click on + button
    const handleIncreaseButton=(id)=>{
        setItems(items.map(item=>item._id===id?({...item,qty:item.qty+1}):item));
    }
    //decrease item qty when user clicks on - button
    const handleDecreaseButton=(id)=>{
        setItems(items.map(item=>item._id===id?({...item,qty:item.qty-1}):item));
    }

    //set item qty to 0 if user clicks on X next to item in cart
    const handleXClick=(id)=>{
        setItems(items.map(item=>item._id===id?({...item,qty:0}):item));
    }

    //find subtotal price of cart(without taxes), as and when the items in the cart change.
    useEffect(()=>{
        if(items){
            setSubtotal(items.reduce((res,item)=>res + (item.price*item.qty),0).toFixed(2)); 
            if(!items.some(item=>item.qty>0)){
                setIsCheckingOut(false); //hide cart preference form if there is no item in the cart
            }
        }
    },[items])

    //when user clicks on the checkout button 
    const handleCheckoutClick=()=>{
        if(items.some(item=>item.qty>0)){//if there are some items with qty>0
            setIsCheckingOut(true);
        }
        setOrder({items:items.filter(item=>item.qty>0)}); //save all items with qty>0 to a state called 'order'
    }
       

    //save order details to db
    const saveOrdertoDB=(order)=>{//add total to the order before saving to db
        axios.post('http://localhost:8010/orders', {...order, total:((subtotal*(1+taxes)).toFixed(2)),completed:false})
        .then(res=>{
            // console.log(res.data.data);
            setSuccess(true);//alert success to user
            setMessage("The order was placed successfully!");//success message
            setError(false);
            navigate('/menu/orderonline/success');
        })
        .catch(err=>{
            setError(true);//alert failure to user
            setMessage(err.message);
            setSuccess(false);
            console.log("error while saving cart/order to db");
            displayError(err);//show error details in console
        })
    }

    //display the data (readingfrom db using axios)
    const getItems = () => {
        if(loadError){ //if there was an error in reading data using axios, show the error
            return (
                <div className="text-center text-danger">
                    <p>Oh no! Something went wrong. {loadError.message}! </p>
                    <p> Please try again later.</p>
                </div>
            );
        }
        else if(!loadSuccess) {
            //if there is no error but loadSuccess is not true yet
            //means we are still waiting for data
            //so we show a spinner to the user
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else {
            //there is no error, & loadSuccess is true
            //we show the data
            return (
                <div className="d-flex justify-content-between">
                    <div>
                        <h2>Appetizers</h2>
                        <div className="d-flex flex-wrap">
                        {items.map(item=>(item.category==="appetizer"&&<MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                        </div>

                        <h2>Main Course</h2>
                        <div className="d-flex flex-wrap">
                        {items.map(item=>(item.category==="mainCourse" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                        </div>

                        <h2>Breads</h2>
                        <div className="d-flex flex-wrap">
                        {items.map(item=>(item.category==="breads" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}
                        </div>

                        <h2>Drinks</h2>
                        <div className="d-flex flex-wrap">
                        {items.map(item=>(item.category==="drinks" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                        </div>

                        <h2>Desserts</h2>
                        <div className="d-flex flex-wrap">
                        {items.map(item=>(item.category==="dessert" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}
                        </div>
                    </div>
                    
                    <div className="mt-5 me-2 w-50 d-flex flex-column align-items-end">
                        <Cart items={items} subtotal={subtotal} handleCheckoutClick={handleCheckoutClick} handleXClick={handleXClick}/>
                    
                        {isCheckingOut && <CartPreferences order={order} setOrder={setOrder} items={items} saveOrdertoDB={saveOrdertoDB} today={today} todayStr={todayStr} tomorrow={tomorrow} tomorrowStr={tomorrowStr} currentTimeInHours={currentTimeInHours} currentMinutes={currentMinutes} slots={slots}/>}
                    </div>

                    
                </div>
            )
        }
    }

    const viewMessage=()=>{
        if(error){
            return(
                <div className=" alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Oh no !</strong> Something went wrong. ( {message} ! )
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                
            );
        }
        if(success){
            return (
                <div className=" alert alert-success alert-dismissible fade show" role="alert">
                    <p><strong>Yay ! </strong> {message}</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            );
        }
    }


    return(
        <div className="MenuApp mx-5 mt-5">
            
            {viewMessage()}
            <h1 className="text-center">Order Online</h1>
            {getItems()} 
            
            
        </div>
        
    )
}