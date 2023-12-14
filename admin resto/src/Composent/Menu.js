import React,{useEffect, useState } from "react";
import Navbar from './Navbar'
import '../styles/table.css'
import Barchart from "../viwes/chart";


function Menu(props) {
  const [plat_name, setplat_name] = useState();
  const [personne_nom, setpersonne_nom] = useState();
  const [hour_of_day, sethour_of_day] = useState();
  useEffect(() => {
    const Ipmortdata = async () => {
      try {
        const response = await fetch(`http://localhost:4000/most/plat/` + props.idr, {
          method: "POST",
        });
        const data = await response.json();
        setplat_name(data.plat_name);

        const response3 = await fetch(`http://localhost:4000/most/heur/` + props.idr, {
          method: "POST",
        });
        const data3 = await response3.json();
        sethour_of_day(data3.hour_of_day);

        const response2 = await fetch(`http://localhost:4000/most/client/` + props.idr, {
          method: "POST",
        });
        const data2 = await response2.json();
        setpersonne_nom(data2.personne_nom);
      } catch (error) {
        console.log(error);
      }
    };

    Ipmortdata(); // Call Ipmortdata within the useEffect

    // You may want to include props.idr in the dependency array if it's used inside Ipmortdata
  }, [props.idr]);
  
  return (
 <div className='px-20  bg-dark'>
  <Navbar Navbarname="Dashborad" name={props.namer}/>
  <div className="ag-format-container">
  <div className="ag-courses_box">
    <div className="ag-courses_item">
      <a href="1" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
           Le plat le plus vendu  
        </div>
        <div className="ag-courses-item_date-box">
        Name:
          <span className="ag-courses-item_date">
          {plat_name}
          </span>
        </div>

        
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="2" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        Le client Fidel 
        </div>
        <div className="ag-courses-item_date-box">
          Name:
          <span className="ag-courses-item_date">
          {personne_nom}
          </span>
        </div>

      </a>
    </div>

    <div className="ag-courses_item">
      <a href="1" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        Montre la plus demandée
        </div>

        <div className="ag-courses-item_date-box">
          Start:
          <span className="ag-courses-item_date">
           {hour_of_day}:00
          </span>
        </div>
      </a>
    </div>
    <div className="ttt" >
       <Barchart name={props.namer} id={props.idr}></Barchart>
    </div>
   
</div></div>
  
  </div>
  )
}


export default Menu