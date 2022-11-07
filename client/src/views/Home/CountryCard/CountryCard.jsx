import React from "react";
import styles from "./CountryCard.module.css";

const CountryCard = ({ name, id, flag, continent }) => {
  return (
    <div className={styles.card}>
      <img src={flag} alt="No img" className={styles.flag} />
      <h2>{name}</h2>
      <h3>{continent}</h3>
    </div>
  );
};

export default CountryCard;
