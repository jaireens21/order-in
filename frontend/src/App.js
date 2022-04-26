import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import DishApp from "./elements/DishApp";
import Navbar from './elements/Navbar';
import Menu from './elements/Menu';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<DishApp/>}/>
        <Route path='/order' element={<Menu/>}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
