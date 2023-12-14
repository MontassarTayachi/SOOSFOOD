import "../styles/Cart.css";
import React, { useContext,useState } from "react";
import CartContext from "../CartContext";
import Button from "@mui/material/Button";


function Cart({id}) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const [par, setPar] = useState(false);
  const { items } = useContext(CartContext);
  const formDataToJson = (formData) => {
    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return jsonObject;
  };
  const initform={
    phone: '',
    adress: '',
  }
  const [formData, setFormData] = useState({
    phone: '',
    adress: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    for (const item of items) {
      const Data = new FormData();
      Data.append("personne_id", id);
      Data.append("restaurant_id", item.id_restaurant);
      Data.append("plat_id", item.id);
      Data.append("date_achat", formattedDateTime);
      Data.append("quantite", item.number);
      Data.append("address_personne", formData.adress);
      Data.append("phone_personne", formData.phone);
      const jsonData = formDataToJson(Data);
      console.log(jsonData);
      

      try {
        const response = await fetch('http://localhost:4000/insert/achat', {
          method: 'POST',
          body: JSON.stringify(jsonData),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const responseData = await response.json();
          
          // Handle the response data if needed
        } else {
          throw new Error('Failed to upload achat');
        }
      } catch (error) {
        console.error('Error uploading achat:', error.message);
       
      }
    }
    alert("Votre commande a bien été enregistrée !");

    clearCart();
    setFormData(initform);
    VerifierClose();
  };

  const { clearCart } = useContext(CartContext);
  const VerifierClose = () => {
    setPar(false);
  };
  const VerifierOpen = () => {
    setPar(true);
  };
  const total = items.reduce((accumulator, object) => {
    return accumulator + object.price * object.number;
  }, 0);

  return (   
    <div className="cart">
      {items.length > 0 ? (
        <div className="itemsCart">
          <h1 className="underline">Votre Panier :</h1>
          <ul>
            {items.map((item) => (
              <div key={item.id}>
              <li>
                <h2>
                {item.name} x{item.number}
               
                </h2>
                <h3>{item.price * item.number} TND</h3>
              </li>
              
              </div>
              
            ))}
          </ul>
          
          <span className="total">Total : {total.toFixed(2)} TND</span>
          <div className="d-flex align-items-center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          VerifierOpen();
          // clearCart();
           
        }}
        className="mr-2" // Add margin to the right for spacing
      >
        Commander
      </Button>
      <Button
        type="button"
        variant="info"
        onClick={() => {
          clearCart();
        }}
      >
        Annuler
      </Button>
    </div></div>
      ) : (
        <>
          <h1 className="emptyCartTitle">Votre panier est vide.</h1>
        </>
      )}
      {par &&<div className="Modifier">  
         <button className="buton"onClick={VerifierClose} >X</button>
         <h1>Verification </h1>
         <form>
         <label>Adress</label>
         <input
   type="text"
   name="adress"
   value={formData.adress}
   onChange={handleChange}
   required=""
/>
         <label>Phone</label>
         <input type="text" name="phone" value={formData.phone} onChange={handleChange} required="" ></input>
         <Button className="bout" type="submit" onClick={handleFormSubmit} >Send </Button>
         </form>
         
         </div>}
    </div>
  );
}

export default Cart;
