import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false); // MUI alert

  const addToCart = (id, name, price, nom_restaurant,id_restaurant) => {
    // Check if the item is already in the cart
    const objIndex = items.findIndex((obj) => obj.name === name);
  
    // If the item is not in the cart, add it
    if (objIndex < 0) {
      setItems((prevState) => [
        ...prevState,
        { id, name, price, nom_restaurant,id_restaurant, number: 1 },
      ]);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } else {
      // If the item is already in the cart, increment its quantity
      items[objIndex].number++;
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  };
  
  

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, open, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
