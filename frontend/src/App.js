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



function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />}/>
          <Route path='menu' element={<ShowMenu/>}/>
          <Route path='orderonline' element={<MenuApp/>}/>
          <Route path='orderonline/success' element={<OrderPlacedSuccess/>}/>
          <Route path='owner/login' element={<LoginApp/>}/>
          <Route path='owner/register' element={<RegisterApp/>}/>
          
        </Route>



        <Route path="/owner" element={<NavbarOwner />}>
          <Route path=":id" element={<LoginApp/>}/>
          {/* <Route path='dishes' element={<DishApp/>}/>
          <Route path='orders' element={<OrderListApp/>} /> */}
        </Route>
        
 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
