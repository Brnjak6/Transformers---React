import React, { useContext } from "react";
import styles from "../../styles/Main.module.scss";
import { useHistory } from "react-router-dom";
import AutobotMain from "../svg/AutobotMain";
import DeceptionMain from "../svg/DeceptionMain";
import { SearchContext } from "../context/SearchContext";

function Main({ transformers, handleDetailsTransformer }) {
  const [search, setSearch] = useContext(SearchContext);

  let history = useHistory();

  const createTransformerHandler = () => {
    history.push("/create");
  };

  const filterHandler = (e) => {
    const filterSearch = transformers.filter((trans) => trans.faction === e);
    if (filterSearch.length === 0) {
      return alert("Autobots are not recruited in your base yet");
    } else {
      setSearch(filterSearch);
      history.push("/search");
    }
  };

  if (transformers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.background}></div>
        <h1>We are in a need of new transformers</h1>
        <button
          className={styles.button_main}
          onClick={() => createTransformerHandler()}
        >
          Recruit
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.filter}>
          <button
            onClick={() => filterHandler("Deception")}
            className={`${styles.filter__button} ${styles.filter__button_deception}`}
          >
            Deception
          </button>
          <button
            onClick={() => filterHandler("Autobot")}
            className={styles.filter__button}
          >
            Autobot
          </button>
        </div>
        <div className={styles.background}></div>
        <div className={styles.items}>
          {transformers.map((transformer) => (
            <div className={styles.transformer} key={Math.random()}>
              <div className={styles.header}>
                {transformer.faction === "Deception" ? (
                  <DeceptionMain />
                ) : (
                  <AutobotMain />
                )}
                <p
                  style={{
                    color:
                      transformer.faction === "Deception" ? "#4f5a9e" : "red",
                  }}
                >
                  {transformer.faction}
                </p>
              </div>

              <h2>{transformer.model}</h2>

              <h4
                className={styles.details}
                onClick={() => handleDetailsTransformer(transformer)}
              >
                Details
              </h4>
              <div
                className={`${styles.status} ${
                  transformer.status === "OK"
                    ? styles.ok
                    : transformer.status === "MIA"
                    ? styles.mia
                    : styles.injured
                }`}
              >
                {transformer.status}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Main;
