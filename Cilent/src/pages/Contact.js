import React from "react";
import ContactImage from "../assets/cuisine.jpg";
import "../styles/Contact.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${ContactImage})` }}
      ></div>
      <div className="rightSide">
        <h1>
          Contactez-nous<hr className="solid"></hr>
        </h1>
        <form id="contact-form" method="POST">
          <label htmlFor="name">Nom</label>
          <input name="name" placeholder="Entrer votre nom..." type="text" />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Entrer votre email..."
            type="email"
          />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Entrer votre message..."
            name="message"
            required
          ></textarea>
          <button type="submit">
            Envoyer <DoubleArrowIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
