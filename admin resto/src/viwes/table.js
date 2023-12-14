import React, { useState, useEffect } from 'react';
import '../styles/Tablecom.css';
import { Button } from "react-bootstrap";

function Tablecom({ id }) {
  const [listes, setListes] = useState(null);
  const [x, setX] = useState(null);
  const [nomPlat, setNomPlat] = useState("");
  const [idAchat, setIdAchat] = useState("");
  const [idplat, setIdplat] = useState("");
  const [prixPlat, setPrixPlat] = useState("");
  const [quantite, setQuantite] = useState("");
  const [PrixTotal, setPrixTotal] = useState("");

const setvaleur= (id,nom,prix,quantite,idachat) =>{ 
 setNomPlat(nom);
 setIdplat(id);
 setQuantite(quantite);
 setPrixPlat(prix);
 setIdAchat(idachat);
 const p=prix*quantite;
 setPrixTotal(p);
 
}

  const open = () => {
    setX(true);
  }

  const close = () => {
    setX(false);
  }
  const Modifierquantite =async () => {
    try {
      await  fetch(`http://localhost:4000/modifier/plat/quantite/${idplat}/-${quantite}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error modifier quantite:", error.message);
    }

  }

  const deleteAchat=async () =>{
    try {
      await  fetch(`http://localhost:4000/delete/achat/${idAchat}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error  delete achat :", error.message);
    }
  }
  const deleteAchat1=async () =>{
    try {
      await  fetch(`http://localhost:4000/delete/achate/${idAchat}`, {
        method: "POST"
      });
      
    } catch (error) {
      console.error("Error  delete achat :", error.message);
    }
  }

  const Ipmortdata = async () => {
    console.log(id)
    try {
      
      const response = await fetch(`http://localhost:4000/select/achat/${id}`,{
        method: "GET"
      });
      const data = await response.json();
      setListes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Ipmortdata();
  }, []);

  return (
    <>
    <div className="dy">
      <h1> Liste Commande <hr className="solid" /></h1>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">N° Commande</th>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listes && listes.map((liste, key) => (
            <tr className="pace" key={key}>
              <td>
                <label className="control control--checkbox">
                  <input type="checkbox" />
                  <div className="control__indicator"></div>
                </label>
              </td>
              <td>{liste.achat_id}</td>
              <td className="pl-0">
                <div className="d-flex align-items-center">
                  <a href="#">{liste.personne_nom}</a>
                </div>
              </td>
              <td>{liste.date_achat}</td>
              <td>{liste.phone_personne}</td>
              <td>{liste.address_personne}</td>
              <td><Button type="button"  onClick={() =>{open();setvaleur(liste.plat_id,liste.plat_nom,liste.plat_prix,liste.quantite,liste.achat_id);}} className="btn btn-success rounded-circle"><i className="bi bi-eye"></i> </Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {x &&<div className="Mod">  
         <button className="buton"onClick={close} >X</button>
         <h1>Commande </h1>
         <p>{nomPlat} X {quantite}</p> 
         <p>Prix: {prixPlat} TND</p>
         <p>Prix Totale: {PrixTotal} TND</p>        
         <button type="button" className="btn btn-success m-3" onClick={() => { Modifierquantite(); deleteAchat1(); Ipmortdata(); close(); }}
><i className="bi bi-file-check-fill"></i> Valider</button>
         <button type="button" className="btn btn-danger m-3" onClick={() => { deleteAchat(); Ipmortdata(); close(); }}><i className="bi bi-x-circle-fill" ></i> Anulle </button>
         
         
         </div>}
    </>

  );
}

export default Tablecom;
