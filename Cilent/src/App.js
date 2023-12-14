import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {useState } from "react";
import Login from "./pages/Login";
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} setData={dataLogin} />} />}
          </Routes>
         { isLoggedIn &&
         <CartProvider>
         
         <Navbar /> 
          <Routes>
            <Route path="/" element={<Home name={name}/>} />
            <Route path="/Home" element={<Home name={name}  />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Panier" element={<Cart  id={id} />} />           
          </Routes>
          <Footer />
        
        </CartProvider>}
     
       
      </BrowserRouter>
    </div>
  );
}

export default App;
