import React, { useState,useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/Ajouter_plat.css'


function Ajouter_palt({namer,idr}) {
  
 

  const [preview, setPreview] = useState(null);
  const [Image, SetImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    await SetImageName();
    // Move the alert statement inside SetImageName
    
    const renamedImage = new File([file], Image, {
      type: file.type,
    });
    setSelectedImage(renamedImage);
    setPreview(URL.createObjectURL(file));
  };
  
  const SetImageName = async () => {
  try {
    const response1 = await fetch("/max/id_plat");
    const jsonData1 = await response1.json();
    const name = jsonData1.max + namer + ".jpg";
    SetImage(name);
    console.log('Image set to:', name);
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
};
useEffect(() => {
  const SetImageName = async () => {
    try {
      const response1 = await fetch("/max/id_plat");
      const jsonData1 = await response1.json();
      const name = jsonData1.max + namer + ".jpg";
      SetImage(name);
      console.log('Image set to:', name);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  }; 
  SetImageName();
}, [namer]);

  
  
  const handleRefresh = () => {
    const rr={
      namePlat: "",
      price: "",
      restaurant_id: idr,
      description: "",
      quantite: "",}
      setFormData(rr);
      SetImage("");
      setSelectedImage(null);
   
  };


  const [formData, setFormData] = useState({
    namePlat: "",
    price: "",
    restaurant_id: idr,
    description: "",
    quantite: "",
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
    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }


    const {
      namePlat, price, restaurant_id, description, quantite
    } = formData;

    try {
      const body = { namePlat, Image,price, restaurant_id, description, quantite };
      const response = await fetch('http://localhost:4000/insert/plat', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Plat ajouté avec succès!');
        setPreview(null);
       
        
      } else {
        console.error('Erreur lors de l\'ajout du plat:', response.statusText);
        alert('Erreur lors de l\'ajout du plat.', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plat:', error);
      alert('Erreur lors de l\'ajout du plat.', error);
    }

    const data = new FormData();
    data.append('selectedImage', selectedImage);


    try {
      const response = await fetch('http://localhost:4000/test', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        
        console.log("uploading image:")
        
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image: ' + error.message);
    }
    
    handleRefresh();
  };

  return (
    <div>

      <Navbar Navbarname="Ajouter un Plat" name={namer} />
      <div className="contact">

        <div className="leftSide">
          {preview && <img src={preview} alt="Aperçu de l'image" style={{ maxWidth: '82vh', maxHeight: '82vh' }} />}
          {!preview && <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

        </div>
        <div className="rightSide">
          <h1>
            Ajouter un Plat<hr className="solid"></hr>
          </h1>
          <form enctype="multipart/form-data" onSubmit={handleFormSubmit}>
            <label>Nom du Plat:</label>
            <input type="text" name="namePlat" value={formData.namePlat} onChange={handleChange} required />
            <label>Prix du Plat:</label>
            <input type="text" name='price' value={formData.price} onChange={handleChange} required />
            <label>Descreption du Plat:</label>
            <textarea rows={3} name='description' value={formData.description} onChange={handleChange} required></textarea>

            <label>Quantité:</label>
            <input type="text" name='quantite' value={formData.quantite} onChange={handleChange} required />
            <input className='inputfile'  name='selectedImage' type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Ajouter le Plat </button>
          </form>
        </div>



      </div>
    </div>
  );
}

export default Ajouter_palt;
