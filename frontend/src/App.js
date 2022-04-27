import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import DishApp from "./elements/DishApp";
import Navbar from './elements/Navbar';
import MenuApp from './elements/MenuApp';
import OrderListApp from './elements/OrderListApp';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/owner/dishes' element={<DishApp/>}/>
        <Route path='/owner/orders' element={<OrderListApp/>} />
        <Route path='/menu/order' element={<MenuApp/>}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
