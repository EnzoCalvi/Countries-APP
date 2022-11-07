import React from "react";
import styles from "./NavBar.module.css";

export default function NavBar({ length, set, prev, next }) {
  let buttons = [];
  for (let i = 0; i < length; i++) {
    buttons.push(
      <button value={i * 10} onClick={(e) => set(e)} key={i * 10}>
        {i + 1}
      </button>
    );
  }

  return (
    <div className={styles.navbar}>
      <button onClick={prev}>
        <span className="material-icons">navigate_before</span>
      </button>
      {buttons}
      <button onClick={next}>
        <span className="material-icons">navigate_next</span>
      </button>
    </div>
  );
}
