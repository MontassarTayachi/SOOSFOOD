 import Sidebar from './Composent/Sidebar';
import Menu from './Composent/Menu';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Composent/Ajouter_plat';
import User from './Composent/UserProfile';
import Ajouter_palt from './Composent/Ajouter_plat';
import Comande from './Composent/Comande';
import Plat from './Composent/Plat';
import {useState } from "react";
import Login from './Composent/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(  );
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const dataLogin = (nom,key) => {
    setName(nom);
    setId(key);
  };
  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
   
    <div>
      <div >
      <BrowserRouter>
      <Routes>
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} setData={dataLogin} />} />}
          </Routes>
         { isLoggedIn &&
     < Sidebar >
      <Routes>
        <Route path="/" element={<Menu namer={name} idr={id} />} />
        <Route path="/Menu" element={<Menu  namer={name} idr={id}/>} />
        <Route path="/product" element={<Ajouter_palt  namer={name} idr={id} />} />
        <Route path="/user" element={<User  namer={name} idr={id}/>} />
        <Route path="/plat" element={<Plat  namer={name} idr={id} />} />
        <Route path="/cmd" element={<Comande  namer={name} idr={id}/>} />
      </Routes>
   </Sidebar>}
      
     
    </BrowserRouter>
      </div>
    
    </div>
  );
}

export default App;
