import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import Layout from './elements/Layout';
import Home from './pages/Home';
import ShowMenu from './elements/ShowMenuApp/ShowMenu';
import OrderOnlineApp from './elements/OrderOnlineApp/OrderOnlineApp';
import CartSuccess from './elements/OrderOnlineApp/CartSuccess';

import LayoutOwner from './elements/OwnerApp/LayoutOwner';
import LoginApp from './elements/OwnerApp/LoginApp';
import RegisterApp from './elements/OwnerApp/RegisterApp';
import ProtectedRoutes from './elements/OwnerApp/ProtectedRoutes';
import DishApp from "./elements/DishApp/DishApp";
import OrderListApp from './elements/OrdersApp/OrderListApp';

import {useState} from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn]=useState(false); //this state is exposed in the browser & can be changed on client-side
  //it resets to default whenever the browser is refreshed --Redux might be a better solution
  //but we do have login-protected backend routes 
  
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
          <Route index element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='login' element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}> {/* login protect dish & order routes */}
            <Route path='dishes' element={<DishApp/>}/>
            <Route path='orders' element={<OrderListApp/>} /> 
            <Route path='register' element={<RegisterApp/>}/>
          </Route>
        </Route>
        
        {/* catch-all for non-existent routes */}
        <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
