import React, { useContext } from "react";
import styles from "../../styles/Main.module.scss";
import AutobotMain from "../svg/AutobotMain";
import DeceptionMain from "../svg/DeceptionMain";
import { SearchContext } from "../context/SearchContext";

function Search({ transformers, handleDetailsTransformer }) {
  const [search, setSearch] = useContext(SearchContext);

  if (search.length === 0) {
    return <h2>No data, yet</h2>;
  } else {
    return (
      <>
        <div className={styles.search}></div>
        <div className={styles.items}>
          {search.map((transformer) => (
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

export default Search;
