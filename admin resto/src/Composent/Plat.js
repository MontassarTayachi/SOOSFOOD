import React, { useState,useEffect } from 'react';
import MenuItem from "../viwes/MenuItem";
import "../styles/Menu.css";
import Navbar from "./Navbar";
import { Button } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
function Plat({namer,idr}) {
  const [menuList, setmenuList] = useState([]);
  const relodedata = async () =>{
    let test=null
    try {
  
      const response = await fetch("/select/plat/"+idr);
      test = await response.json();
      
    
      // Clean up the "image" property in each item
      test = test.map(item => ({
        ...item,
        image: item.image.trim().replace(/^null/, '')
      }));
      
    } catch (err) {
      console.error(err.message);
      test = []; // Set a default value (empty array) in case of an error
    }
    setmenuList(prevState => test);
  }
  useEffect(() => {
    relodedata();
}, []);





  const [selectedImage, setselectedImage] = useState(null);
  const [quantiteModifer, setQuantiteModifier] = useState(null);
  const [nomModifier, setNomModifier] = useState(null);
  const [prixModifier, setPrixModifier] = useState(null);
  const [nom, setName] = useState(false);
  const [imagebd, setImagebd] = useState(null);
  const [id, setId] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const handleNomChange = (event) => {
    setNomModifier(event.target.value);
  };
  const handlePrixChange = (event) => {
    setPrixModifier(event.target.value);
  };
  const handlequantiteChange = (event) => {
    setQuantiteModifier(event.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const renamedImage = new File([file], imagebd, {
      type: file.type,
    });
    setselectedImage(renamedImage);
  };
  const Modifiername = (test,id,image) => {
    setName(test);
    setId(id);
    setImagebd(image)
  };
  const ModifierClose = () => {
    setPreview(false);
  };
  const ModifierOpen = () => {
    setPreview(true);
  };
  const Modifiernom =async () => {
    try {
      await  fetch(`http://localhost:4000/modifier/plat/nom/${id}/${nomModifier}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error modifier nom du  plat:", error.message);
    }

  }
  const Modifierprix =async () => {
    try {
      await  fetch(`http://localhost:4000/modifier/plat/price/${id}/${prixModifier}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error modifier prix du  plat:", error.message);
    }

  }
  const Modifierquantite =async () => {
    try {
      await  fetch(`http://localhost:4000/modifier/plat/quantite/${id}/${quantiteModifer}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error modifier prix du  plat:", error.message);
    }

  }
  const Modifierimage =async () => {
    const data = new FormData();
    data.append('selectedImage', selectedImage);


    try {
      const response = await fetch('http://localhost:4000/test', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        
        
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image: ' + error.message);
    }
  }
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (prixModifier !== null) {
      await Modifierprix();
    }
    if (nomModifier !== null) {
      await Modifiernom();
    }
  
    if (quantiteModifer !== null) {
      await Modifierquantite();
    }
    if(selectedImage !== null){
      await Modifierimage();
    }
    alert("Modification reussi")
    relodedata();
    
  };
  
  
  return (
    <div >
      
      <div className="narbar"><Navbar Navbarname="Plat" name={namer}/></div>
    
      <div className="menu">
      <h1 className="menuTitle">
        Notre Plat<hr className="solid"></hr>
      </h1>
      <div className="menuList">
        {menuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              descreption={menuItem.description}
              price={menuItem.price}
              quantite={menuItem.quantite}
              id={menuItem.id}
              function1={Modifiername}
              function2={ModifierOpen}
              function3={relodedata}
            />
          );
        })}
      </div>  
      {preview &&<div className="Modifier">  
         <button className="buton" onClick={ModifierClose}><IoCloseSharp /></button>
         <h1> {nom} </h1><hr className="solid"></hr>
         <form>
         <label>Nom de Plat</label>
         <input type="text" name="nomModifier" value={nomModifier} onChange={handleNomChange} ></input>
         <label>Prix de Plat</label>
         <input type="text" name="prixModifier" value={prixModifier} onChange={handlePrixChange}></input>
         <label>Image de Plat</label>
         <input className='inputfile'  name='selectedImage' type="file" accept="image/*" onChange={handleImageChange} />
         <label>Ajouter ou rajouter de  Stoke</label>
         <input type="number" name="quantiteModifer" value={quantiteModifer}onChange={handlequantiteChange}></input>
         <Button className="bout" type="submit" onClick={handleSubmit}>Modifier le Plat </Button>
         </form>
         
         </div>}
    </div>
        



    </div>
    
  );
}

export default Plat;