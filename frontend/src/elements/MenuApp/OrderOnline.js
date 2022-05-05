import React from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import CartPreferences from "./CartPreferences";

export default function OrderOnline(props){
    const {items,handleAddToOrder,handleIncreaseButton,handleDecreaseButton,handleCheckoutClick,handleXClick,subtotal,order,setOrder,saveOrdertoDB,today, todayStr,tomorrow,tomorrowStr,currentTimeInHours,currentMinutes,slots }=props;

    return(
    
        <div className="d-flex justify-content-between">
            <div>
                <h1 className="text-center">DISHES</h1>
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