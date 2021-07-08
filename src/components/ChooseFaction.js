import React from "react";
import styles from "../styles/CreateTransformer.module.scss";
import Autobot from "./svg/Autobot";
import Deception from "./svg/Deception";

function ChooseFaction({ factionHandler }) {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h1>Choose a faction</h1>
        <div className={styles.choices}>
          <section
            className={styles.autobot}
            onClick={() => factionHandler("Autobot")}
          >
            <Autobot />
            <h4>Autobot</h4>
          </section>
          <section
            onClick={() => factionHandler("Deception")}
            className={styles.deception}
          >
            <Deception />
            <h4>Deception</h4>
          </section>
        </div>
      </div>
    </>
  );
}

export default ChooseFaction;
