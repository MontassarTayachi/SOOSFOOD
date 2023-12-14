
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,        
}from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { GoListOrdered } from "react-icons/go"
import image from "../assets/restaurent.png"   

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Menu",
            name:"Dashboard",
            icon:<FaTh/>
        },
      
        {
            path:"/product",
            name:"Add plat",
            icon:<MdAdd />
        },
        {
            path:"/plat",
            name:"Plat",
            icon:< IoRestaurant/>
        },
        
      {
        path:"/cmd",
        name:"List commande",
        icon:< GoListOrdered/>
    },
   
    ]
    return (
        <div className="container-fluid  bg-dark min-vh-100 ">
           <div style={{width: isOpen ? "220px" : "50px"}} className="sidebar pd-4">
               <div className="top_section">
                   <img style={{display: isOpen ? "block" : "none"}} src={image}className="logo"></img>
                   <div style={{marginLeft: isOpen ? "0px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className=' bg-dark '><div className='row'><div style={{width: isOpen ? "190px" : "0px"}}></div><div className='col'>{children}</div></div></main>
        </div>
    );
};

export default Sidebar;