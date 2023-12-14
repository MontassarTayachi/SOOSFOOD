import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
function MenuItem({ image, name, price,descreption,id,quantite,function1,function2,function3 }) {
  
  
  const handleDelete = async () => {
    try {
      // Make a DELETE request to your API endpoint
      await  fetch(`http://localhost:4000/delete/plat/${id}`, {
        method: "DELETE"
      });
      function3();
      alert("Plat Supprimer");
      
    } catch (error) {
      console.error("Error deleting menu item:", error.message);
    }
  };

  return (
    <div>
       <div className="menuItem">
      <div style={{ backgroundImage: image ? `url(http://localhost:4000/images/${encodeURIComponent(image)}` : 'none' }} className="img"></div>
      <h5> {name} </h5>
      <p>quantite: {quantite} </p>
      <p> price :{price} TND</p>
      <div>
      <Button onClick={() => { function2(); function1(name,id,image); }}>Modifier</Button>
     <Button variant="danger" onClick={handleDelete}>Delete</Button>
     
    
      </div>
      
         </div>
         
    </div>
   
  );
}

export default MenuItem;
