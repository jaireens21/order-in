import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import DishApp from "./elements/DishApp/DishApp";
import Navbar from './elements/Navbar';
import NavbarOwner from './elements/NavbarOwner';
import MenuApp from './elements/MenuApp/MenuApp';
import OrderListApp from './elements/OrderApp/OrderListApp';
import Home from './pages/Home';
import OrderPlacedSuccess from './elements/MenuApp/OrderPlacedSuccess';
import LoginApp from './elements/LoginApp/LoginApp';
import RegisterApp from './elements/LoginApp/RegisterApp';
// import OwnerApp from './elements/LoginApp/OwnerApp';
import ShowMenu from './elements/ShowMenu';
import {useState} from 'react';
import ProtectedRoutes from './ProtectedRoutes';



function App() {

  const [isLoggedIn, setIsLoggedIn]=useState(false); //this state is exposed in the browser & can be changed --Redux might be a better solution
  //but we have login-protected backend routes too
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />}/>
          <Route path='menu' element={<ShowMenu/>}/>
          <Route path='orderonline' element={<MenuApp/>}/>
          <Route path='orderonline/success' element={<OrderPlacedSuccess/>}/>
          
          
        </Route>


        
        <Route path="/owner" element={<NavbarOwner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
          <Route index element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='login' element={<LoginApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path='register' element={<RegisterApp/>}/>
          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}> {/* login protect dish & order routes */}
            <Route path='dishes' element={<DishApp/>}/>
            <Route path='orders' element={<OrderListApp/>} /> 
          </Route>
        </Route>
        
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
