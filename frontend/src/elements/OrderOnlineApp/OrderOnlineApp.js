import axios from "axios";
import React, {useState,useEffect,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import OrderOnlineItem from "./OrderOnlineItem";
import Cart from "./Cart";
import CartForm from "./CartForm";
import "./OrderOnlineApp.css";


export default function OrderOnlineApp(){
    const alert = useAlert();

    const [items,setItems]=useState(null);
    const [loadSuccess,setLoadSuccess]=useState(false); //to decide whether to show spinning loader or data
    const [loadError,setLoadError]=useState(null); //for showing loading error to user with button to try reloading

    const[subtotal,setSubtotal]=useState(0);//subtotal price of order
    
    const taxes=0.13; //current taxes in ontario,Canada
    const [isCheckingOut, setIsCheckingOut]=useState(false);

    const[order,setOrder]=useState([]);//saving entire cart in a state called 'order' after user clicks the checkout button

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
            console.log(err.response.status, err.response.data, err.response.headers);
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
   

    //get all menu items from server/db
    const loadData=useCallback(()=>{ 
        axios.get('http://localhost:8010/api', { timeout: TIMEOUT_INTERVAL })
        .then(res=>{
            setLoadSuccess(true);//to decide whether to show spinning loader or data
            setLoadError(null);
            let dishes=res.data.data;
            setItems(dishes.map(dish=>({...dish,qty:0}))); //store all the dishes in a state called 'items' with qty set to 0 for each item
            //this will help in creating the order later
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
    
    //when user clicks on "go back" on cart form
    const handleGoBackBtn=()=>{
        setIsCheckingOut(false);
        document.querySelector(".cartForm").classList.add("hidden");
    }

    //save order to db
    const saveOrdertoDB=(order)=>{//add total  price to the order before saving to db
        axios.post('http://localhost:8010/orders', {...order, total:((subtotal*(1+taxes)).toFixed(2)),completed:false})
        .then(res=>{
            // console.log(res.data.data);
            alert.success("Order placed!")

            //navigate to success page
            navigate('/menu/orderonline/success',{state: {emailSent:res.data.emailSent}}); // passing data through to success page
        })
        .catch(err=>{
            alert.error(`Oh No! Order could not be placed. ${err.message}`)
            console.log("error while saving cart/order details to db");
            displayError(err);//show error details in console
        })
    }

    //when user clicks on a category in the left pane
    const handleCategoryClick=(e)=>{
        
        //reset so that only the para actually clicked has a class of clicked
        document.querySelectorAll(".sideNav p").forEach(para=>para.classList.remove("clicked"));
        e.target.classList.add("clicked");

        //reset so that only the category actually clicked is not hidden
        document.querySelectorAll(".list").forEach(list=>list.classList.contains("hidden")? list : list.classList.add("hidden"));
        switch (e.target.innerHTML) {
            case 'Appetizers':
                document.getElementById("appetizers").classList.remove("hidden");
                break;
            case 'Main Course':
                document.getElementById("mainCourse").classList.remove("hidden");
                break;
            case 'Drinks':
                document.getElementById("drinks").classList.remove("hidden");
                break;
            case 'Breads':
                document.getElementById("breads").classList.remove("hidden");
                break;
            case 'Desserts':
                document.getElementById("desserts").classList.remove("hidden");
                break;
            default:
                document.getElementById("appetizers").classList.toggle("hidden");
        }
    }

    //display the data (reading from db using axios)
    const getItems = () => {
        if(loadError){ //if there was an error in reading data using axios, show the error
            return (
                <div className="text-center ">
                    <h1 className="text-danger mb-5">Oh no! Something went wrong. {loadError.message}! </h1>
                    <h2> Please try refreshing the page.</h2>
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
            //we display the data
            return (
                <div className="flexContainer">
                    <div className="sideNav">
                        <p className="clicked" onClick={handleCategoryClick}>Appetizers</p>
                        <p onClick={handleCategoryClick}>Main Course</p>
                        <p onClick={handleCategoryClick}>Breads</p>
                        <p onClick={handleCategoryClick}>Drinks</p>
                        <p onClick={handleCategoryClick}>Desserts</p>
                        {/* <p onClick={handleClick}>View All</p> */}
                        
                    </div>
                    <div className="itemList">
                        <div className="list " id="appetizers">
                            <h2>Appetizers</h2>
                            <div className="d-flex flex-wrap">
                            {items.map(item=>(item.category==="appetizer"&&<OrderOnlineItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                            </div>
                        </div>
                        <div className="list hidden" id="mainCourse">
                            <h2>Main Course</h2>
                            <div className="d-flex flex-wrap">
                            {items.map(item=>(item.category==="mainCourse" && <OrderOnlineItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                            </div>
                        </div>
                        <div className="list hidden" id="breads">
                            <h2>Breads</h2>
                            <div className="d-flex flex-wrap">
                            {items.map(item=>(item.category==="breads" && <OrderOnlineItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}
                            </div>
                        </div>
                        <div className="list hidden" id="drinks">
                            <h2>Drinks</h2>
                            <div className="d-flex flex-wrap">
                            {items.map(item=>(item.category==="drinks" && <OrderOnlineItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton} />))}
                            </div>
                        </div>
                        <div className="list hidden" id="desserts">
                            <h2>Desserts</h2>
                            <div className="d-flex flex-wrap">
                            {items.map(item=>(item.category==="dessert" && <OrderOnlineItem key={item._id} item={item} handleAddToOrder={handleAddToOrder} handleIncreaseButton={handleIncreaseButton} handleDecreaseButton={handleDecreaseButton}/>))}
                            </div>
                        </div>

                    </div>
                    <div className="cartDiv">
                        <Cart items={items} subtotal={subtotal} handleCheckoutClick={handleCheckoutClick} handleXClick={handleXClick}/>
                
                        {isCheckingOut && <CartForm order={order} setOrder={setOrder} items={items} saveOrdertoDB={saveOrdertoDB} today={today} todayStr={todayStr} tomorrow={tomorrow} tomorrowStr={tomorrowStr} currentTimeInHours={currentTimeInHours} currentMinutes={currentMinutes} slots={slots} handleGoBackBtn={handleGoBackBtn}/>}
                    </div>

                </div>
            )
        }
    }

    
    return(
        <div className="OrderOnlineApp">
            
            <h1 className="text-center">Order Online</h1>
            {getItems()} 
            
        </div>
    )
}