import "../styles/Navbar.css";
import React, { useState } from "react";
import Logo from "../assets/SOS FOOT.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [toggleButtonClass, setToggleButtonClass] = useState(true);
  const [navLinksClass, setNavLinksClass] = useState(true);

  const toggleButtonFct = (event) => {
    event.preventDefault();
    setNavLinksClass(!navLinksClass);
    setToggleButtonClass(!toggleButtonClass);
  };
  const NavLinksFct = (event) => {
    event.preventDefault();
    setNavLinksClass(!navLinksClass);
    setToggleButtonClass(true);
  };

  return (
    <div className="navbar">
      <p
        href="#"
        className={toggleButtonClass ? "toggle-button" : "toggle-button active"}
        onClick={toggleButtonFct}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </p>
      <img src={Logo} alt="Logo" />
      <div className={navLinksClass ? "navbar-links" : "navbar-links active"}>
        <ul onClick={NavLinksFct}>
          <li>
            <Link to="/Home">Acceuil</Link>
          </li>
          <li>
            <Link to="/Menu">Carte</Link>
          </li>
          <li>
            <Link to="/About">À propos</Link>
          </li>
          <li>
            <Link to="/Panier">Panier</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
