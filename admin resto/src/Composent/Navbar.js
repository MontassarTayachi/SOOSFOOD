import React from 'react'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import  image  from '../photo/SOS FOOT.png'
import '../styles/navbar.css'

function Navbar(props) {
  return (
   <nav className="navbar navbar-expand-sm navbar-dark rounded"> 
   <img className='' src={image} alt='img' style={{ width: '100px', height: '100px',margin:'0px' }}/>
   <p className='text-white'><strong>{props.Navbarname}</strong></p>
       <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
           aria-expanded="false" aria-label="Toggle navigation"> <i className='bi bi-justify'></i></button>
       <div className="collapse navbar-collapse" id="collapsibleNavId">
           <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle text-white" href="0" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.name}</a>
                   <div className="dropdown-menu" aria-labelledby="dropdownId">
                       <a className="dropdown-item" href="0">profile</a>
                       <a className="dropdown-item" href="0">Setting</a>
                       <a className="dropdown-item" href="0">logout</a>
                   </div>
               </li>
           </ul>
          
       </div>
   </nav>
  )
}

export default Navbar