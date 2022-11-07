import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div>
      <div className={styles.landing}>
        <div className={styles.logo}>
          <h1>Países alrededor del mundo</h1>
          <Link to="/main">Ingresar</Link>
        </div>
      </div>
    </div>
  );
}
