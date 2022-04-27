import axios from "axios";
import React, {useState,useEffect} from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import CartPreferences from "./CartPreferences";

export default function MenuApp(){

    const [items,setItems]=useState(null);
    const [success,setSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [error,setError]=useState(null); //for showing loading error to user with a button to try reloading

    
    const[subtotal,setSubtotal]=useState(0);//subtotal price of order
    
    let taxes=0.13; //current taxes in ontario,Canada
    const [isCheckingOut, setIsCheckingOut]=useState(false);

    const[order,setOrder]=useState([]);//saving entire order in a state called 'order' after user clicks the checkout button

    let today=new Date();   let currentTimeInHours=today.getHours(); let currentMinutes=today.getMinutes();
    // today.setUTCHours(10); today.setUTCMinutes(0); today.setUTCSeconds(0); today.setUTCMilliseconds(0);
    let todayStr=today.toLocaleDateString("en-CA");
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    // tomorrow.setUTCHours(10);tomorrow.setUTCMinutes(0);tomorrow.setUTCSeconds(0);tomorrow.setUTCMilliseconds(0);
    //setting time of today & tomorrow as the same time so that we can sort based on dates
    let tomorrowStr=tomorrow.toLocaleDateString("en-CA");

    let openingTime=11; //time in 24 hours format
    let closingTime=22; //time in 24 hrs format
    let slots=[]; let duration=0.5;
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
    //function to display initial loading error to user, with a button to try reloading data
    const getErrorView = (err) => {
        return (
        <div className="text-center text-danger">
            <p>Oh no! Something went wrong. {err.message}! </p>
            <button className="btn btn-primary" onClick={loadData}> Try again </button>
        </div>
        )
        
    }

    //get all items from server/db
    const loadData=()=>{ 
        //useCallback may be used to resolve warning of missing dependencies in useEffect
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setSuccess(true);//to decide whether to show spinning loader or data
            setError(null);
            let dishes=res.data.data;
            setItems(dishes.map(dish=>({...dish,qty:0}))); //store all the dishes in a state called 'items' with qty set to 0 for each item, this will help creating the order later
            
        })
        .catch(err=>{
            setError(err);
            console.log("error while fetching menu items");
            displayError(err); //show error on console
        })
    }

    //fetch initial data on load
    useEffect(()=>{
        loadData();
    },[])

       
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

    //find total price of cart, as and when the items in the cart change.
    useEffect(()=>{
        if(items){
            setSubtotal(items.reduce((res,item)=>res + (item.price*item.qty),0).toFixed(2)); 
            if(!items.some(item=>item.qty>0)){
                setIsCheckingOut(false); //hide order preferenece form if there is no item in the cart
            }
        }
        
    },[items])

    //when user clicks checkout button, save all items with qty>0 to a state called 'order'
    const handleCheckoutClick=()=>{
        if(items.some(item=>item.qty>0)){
            setIsCheckingOut(true);
        }
        setOrder({items:items.filter(item=>item.qty>0)});
        
    }
       

    //save order details to db
    const saveOrdertoDB=(order)=>{
        axios.post('http://localhost:8010/orders', {...order, total:((subtotal*(1+taxes)).toFixed(2))})
        .then(res=>{
            console.log(success,res.data.data);
            //SHOW success message, saying that the order is placed
            
        })
        .catch(err=>{
            console.log(err);
            //FLASH error message
        })
    }

    //show a spinner while initial data is being loaded/fetched thru axios
    const getItems = () => {
        if(!success) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="ItemList ms-3">
                    <h2>Appetizers</h2>
                    {items.map(item=>(item.category==="appetizer"&&<MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}

                    <h2>Main Course</h2>
                    {items.map(item=>(item.category==="mainCourse" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}

                    <h2>Breads</h2>
                    {items.map(item=>(item.category==="breads" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}

                    <h2>Drinks</h2>
                    {items.map(item=>(item.category==="drinks" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}

                    <h2>Desserts</h2>
                    {items.map(item=>(item.category==="dessert" && <MenuItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}

                    <Cart items={items} subtotal={subtotal} handleCheckoutClick={handleCheckoutClick} handleXClick={handleXClick}/>
                    
                    {isCheckingOut && <CartPreferences order={order} setOrder={setOrder} items={items} saveOrdertoDB={saveOrdertoDB} today={today} todayStr={todayStr} tomorrow={tomorrow} tomorrowStr={tomorrowStr} currentTimeInHours={currentTimeInHours} currentMinutes={currentMinutes} slots={slots}/>}
                </div>
            )
        }
    }
    return(
        <div>
            {error? getErrorView(error) : getItems()} 
            {/* if there is an error while loading data, show that error */}
            {/* else show the loaded data */}
            
        </div>
        
    )
}