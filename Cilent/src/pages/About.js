import "../styles/About.css";
import React from "react";
import Chopsticks from "../assets/Chopsticks.jpg";

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${Chopsticks})` }}
      ></div>
      <div className="aboutBottom">
        <h1>
          À propos de nous<hr className="solid"></hr>
        </h1>
        <p>
        Bienvenue sur sos food  Notre plateforme en ligne vous offre une expérience de restauration universitaire sans tracas. Que vous soyez un étudiant pressé ou un amateur de délices culinaires, sos food  vous permet de parcourir les menus appétissants de divers restaurants universitaires et de passer des commandes en un clin d'œil, sans besoin d'inscription préalable.

        </p>
        <br></br>
        <p>Explorez une variété de plats alléchants, des classiques aux créations uniques, et profitez de la commodité de la commande en ligne. Vous avez le choix entre la livraison à votre porte ou le retrait rapide sur le campus, selon vos préférences.</p>
        <br></br>
        <p>Découvrez une nouvelle façon de savourer des repas délicieux sans tracas ni files d'attente interminables.sos food vous connecte aux saveurs de la restauration universitaire avec simplicité, rapidité et une large gamme de choix. Rejoignez-nous dès aujourd'hui pour une expérience culinaire inégalée sur le campus!




</p>
      </div>
    </div>
  );
}

export default About;
