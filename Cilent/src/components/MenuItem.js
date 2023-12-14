import React from "react";
import Button from "@mui/material/Button";
import { useContext } from "react";
import CartContext from "../CartContext";

function MenuItem({ image, name, price,id,quantite,restaurant_name,id_restaurant }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menuItem">
       <div style={{ backgroundImage: image ? `url(http://localhost:4000/images/${encodeURIComponent(image)}` : 'none' }} className="img"></div>
     <h1> {name} </h1>
      <div>
      <p> Restaurant:   {restaurant_name}</p>
     <p>Quantite: {quantite}     Prix:{price} TND </p>
      <p></p>
      </div>
   
      <Button
        className="btn--menuItem"
        variant="contained"
        color="primary"
        onClick={() => addToCart(id,name, price,restaurant_name,id_restaurant)}
      >
        Ajouter au panier
      </Button>
    </div>
  );
}

export default MenuItem;
