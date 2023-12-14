import React, { useContext,useEffect,useState } from "react";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";
import Alert from "@mui/material/Alert";
import CartContext from "../CartContext";
import { Fade } from "@mui/material";
import { Refresh } from "@mui/icons-material";
function Menu() {
  const { open } = useContext(CartContext);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    fetchMenuList();
    console.log(menuList);
   
  }, []);
  async function fetchMenuList() {
    try {
      const response = await fetch("http://localhost:4000/select/plat");
      let data = await response.json();
      
      data = data.map(item => ({
        ...item,
        image: item.image.trim().replace(/^null/, '')
      }));
  
      console.log(data);
      setMenuList(data);
    } catch (error) {
      console.error("Error fetching menu list:", error);
      // Set a default value (empty array) in case of an error
      // You might want to throw the error or handle it appropriately based on your use case
    }

  }
  return (
    <div className="menu">
      <h1 className="menuTitle">
        Notre Carte<hr className="solid"></hr>
      </h1>
      <div className="menuList">
        {menuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              quantite={menuItem.quantite}
              id={menuItem.id}
              restaurant_name={menuItem.restaurant_name}
              id_restaurant={menuItem.restaurant_id}
            />
          );
        })}
      </div>
      {open === true && (
        <Fade in={open}>
          <Alert variant="filled" severity="success" className="alert">
            Article ajoué au panier !
          </Alert>
        </Fade>
      )}
    </div>
  );
}

export default Menu;
