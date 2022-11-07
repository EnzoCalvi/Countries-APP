import React from "react";
import styles from "./Activities.module.css";

const ActivityCard = ({ name, season, dificulty, duration }) => {
  let showDificulty = "";
  if (dificulty === 1) showDificulty = "Muy baja";
  else if (dificulty === 2) showDificulty = "Baja";
  else if (dificulty === 3) showDificulty = "Media";
  else if (dificulty === 4) showDificulty = "Alta";
  else if (dificulty === 5) showDificulty = "Muy Alta";
  else showDificulty = "No medida";
  return (
    <div className={styles.activityCard}>
      <h2>{name}</h2>
      <h3>
        <span>Duracion: </span>
        {duration}hs
      </h3>
      <h3>
        <span>Temporada: </span>
        {season}
      </h3>
      <h3>
        <span>Dificultad: </span>
        {showDificulty}
      </h3>
    </div>
  );
};

export default ActivityCard;
