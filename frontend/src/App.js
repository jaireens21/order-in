import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ListOfDishes from "./elements/ListOfDishes";
// import Layout from './elements/Layout';
// import Home from './elements/Home';
// import AddDish from './elements/AddDish';
// import EditDish from './elements/EditDish';
// import Menu from './elements/Menu';
// import Login from './elements/Login';
// import Logout from './elements/Logout';
// import Signup from './elements/Signup';
// import Account from './elements/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListOfDishes/>}>
          {/* <Route index element={<Home/>}/>
          <Route path='add' element={<AddDish/>}/>
          <Route path='menu' element={<Menu/>} />
          <Route path='edit/:id' element={<EditDish/>} />
          <Route path='login' element={<Login/>} />
          <Route path='logout' element={<Logout/>} />
          <Route path='signup' element={<Signup/>} />
          <Route path='users/:id' element={<Account/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
