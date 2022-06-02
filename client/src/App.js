import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import Layout from './elements/Layout';
import Home from './elements/Home';
import ShowMenu from './elements/ShowMenuApp/ShowMenu';
import OrderOnlineApp from './elements/OrderOnlineApp/OrderOnlineApp';
import CartSuccess from './elements/OrderOnlineApp/CartSuccess';

import LayoutOwner from './elements/OwnerApp/LayoutOwner';
import LoginApp from './elements/OwnerApp/LoginApp/LoginApp';
import RegisterApp from './elements/OwnerApp/RegisterApp';
import ProtectedRoutes from './elements/OwnerApp/ProtectedRoutes';
import DishApp from "./elements/DishApp/DishApp";
import OrderListApp from './elements/OrdersApp/OrderListApp';

import {useEffect, useState} from 'react';

function App() {
  let initialLoginStatus= JSON.parse(window.sessionStorage.getItem("loginStatus")) || false;
  const [isLoggedIn, setIsLoggedIn]=useState(initialLoginStatus); 
  //it does NOT reset to default whenever the browser is refreshed thanks to sessionStorage 
  //this state is exposed in the browser & can be changed on client-side
  //but we do have login-protected backend routes for accessing orders,dishes

  useEffect(()=>{
    window.sessionStorage.setItem("loginStatus", isLoggedIn);
  }, [isLoggedIn]);
  //if loggedIn status changes, reflect in the sessionStorage too
  
  
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='menu' element={<ShowMenu/>}/>
          <Route path='orderonline' element={<OrderOnlineApp/>}/>
          <Route path='orderonline/success' element={<CartSuccess/>}/>
        </Route>


        <Route path="/owner" element={<LayoutOwner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>

          <Route index element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path='login' element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>

          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}> {/* login protect dish & order routes */}
            <Route path='dishes' element={<DishApp/>}/>
            <Route path='orders' element={<OrderListApp/>} /> 
          </Route>
          
        </Route>


        <Route path='/admin/register' element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}> {/* login protect new user registration route */}
          <Route index element={<RegisterApp/>}/>
        </Route>

        {/* catch-all for non-existent routes */}
        <Route path="*" element={
            <main style={{ padding: "1rem", marginLeft:"40%", marginTop:"20vh"}}>
              <p>OOPS! There's nothing here!</p>
              <a href="/" style={{color:"blue"}}>Click here to go to home page</a>
            </main>
          }
        />
 

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
