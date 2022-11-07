import React from "react";
import ActivityCard from "./ActivityCard";
import styles from "./Activities.module.css";

const Activities = ({ activities }) => {
  return (
    <div className={styles.activities}>
      {activities &&
        activities.map((el) => (
          <ActivityCard
            name={el.name}
            duration={el.duration}
            season={el.season}
            dificulty={el.dificulty}
            key={el.name + el.duration}
          />
        ))}
    </div>
  );
};

export default Activities;
