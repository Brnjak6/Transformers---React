import React, { useState, useEffect } from "react";
import styles from "../../styles/Details.module.scss";
import Deception from "../svg/Deception";
import Autobot from "../svg/Autobot";
import { useHistory } from "react-router-dom";

function Details({
  detailsTransformer,
  afterEditTransformer,
  afterGearTransformer,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [availableTransformers, setAvailableTransformers] = useState(false);
  const [airGroup, setAirGroup] = useState(false);
  const [landGroup, setLandGroup] = useState(false);
  const [seaGroup, setSeaGroup] = useState(false);
  const [chosenTransformer, setChosenTransformer] = useState(false);
  const [activeTransformer, setActiveTransformer] = useState(false);
  const [input, setInput] = useState("");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  let history = useHistory();

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/damirsehic/transformers-api/db")
      .then((res) => res.json())
      .then((data) => setAvailableTransformers(data));
    setActiveTransformer(detailsTransformer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (availableTransformers) {
      const airItemsOnly = availableTransformers.vehicleTypes.filter(
        (item) => item.group === "Air"
      );
      setAirGroup(airItemsOnly);

      const landItemsOnly = availableTransformers.vehicleTypes.filter(
        (item) => item.group === "Land"
      );
      setLandGroup(landItemsOnly);
      const seaItemsOnly = availableTransformers.vehicleTypes.filter(
        (item) => item.group === "Sea"
      );
      setSeaGroup(seaItemsOnly);
    } else {
      return;
    }
  }, [availableTransformers]);

  const gearSubmitHandler = (e) => {
    e.preventDefault();
    if (activeTransformer.gear.length >= 4) {
      return alert("Maximum number of gear reached");
    } else if (input.length === 0) {
      return alert("Input missing");
    } else if (input.length > 13) {
      return alert("Keep your gear simple");
    } else {
      const newGearAdd = { ...activeTransformer };
      newGearAdd.gear.push(input);
      afterGearTransformer(newGearAdd);
      setInput("");
      console.log(detailsTransformer);
    }
  };
  const gearDeleteHandler = (e) => {
    const previousState = { ...activeTransformer };
    const itemToDelete = previousState.gear.indexOf(e);
    previousState.gear.splice(itemToDelete, 1);
    afterEditTransformer(previousState);
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const confirmChangesHandler = () => {
    if (!chosenTransformer) {
      history.push("/");
    } else {
      const newTransformer = detailsTransformer;
      delete newTransformer.model;
      delete newTransformer.vehicle;
      newTransformer.model = chosenTransformer[1];
      newTransformer.vehicle = chosenTransformer[0];
      setActiveTransformer(newTransformer);
      history.push("/");
    }
  };

  const statusHandler = (e) => {
    const previousState = { ...activeTransformer };
    delete previousState.status;
    previousState.status = e;
    const updatedState = previousState;
    console.log(updatedState);
    setActiveTransformer(updatedState);
    afterEditTransformer(updatedState);
    setIsStatusOpen(false);
  };

  const statusStyleHandler = () => {
    if (detailsTransformer.status === "OK") {
      return "green";
    } else if (detailsTransformer.status === "MIA") {
      return "grey";
    } else {
      return "red";
    }
  };

  if (!activeTransformer) {
    return (
      <div className={styles.centering}>
        <div className={styles.background}></div>
        <h2>Loading</h2>;
      </div>
    );
  } else {
    return (
      <>
        <div
          className={
            activeTransformer.vehicle === "plane" ||
            activeTransformer.vehicle === "Plane" ||
            activeTransformer.vehicle === "helicopter" ||
            activeTransformer.vehicle === "Helicopter"
              ? styles.background_air
              : activeTransformer.vehicle === "boat" ||
                activeTransformer.vehicle === "Boat" ||
                activeTransformer.vehicle === "submarine" ||
                activeTransformer.vehicle === "Submarine"
              ? styles.background_sea
              : styles.background_land
          }
        ></div>
        <div className={styles.container}>
          <div className={styles.faction}>
            {activeTransformer.faction === "Deception" ? (
              <>
                <Deception />
                <p style={{ color: "#4f5a9e" }}>Deception</p>
              </>
            ) : (
              <>
                <Autobot />
                <p style={{ color: "red" }}>Autobot</p>
              </>
            )}
          </div>
          <div className={styles.edits}>
            <div className={styles.edit_box}>
              <div className={styles.detail_items}>
                <div className={styles.info}>{activeTransformer.model}</div>
                <div className={styles.info}>{activeTransformer.vehicle}</div>
                <div
                  className={styles.info}
                  style={{ color: statusStyleHandler() }}
                >
                  {activeTransformer.status}
                </div>
              </div>

              <div
                className={styles.edit_button}
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </div>
            </div>
          </div>
          <div className={styles.gear}>
            {activeTransformer.gear ? (
              activeTransformer.gear.map((g) => (
                <div key={Math.random()} className={styles.gear_box}>
                  <div
                    className={styles.gear_delete}
                    onClick={() => gearDeleteHandler(g)}
                  >
                    x
                  </div>
                  <div>{g}</div>
                </div>
              ))
            ) : (
              <div>No Gear yet</div>
            )}
          </div>
          <form className={styles.add_gear} onSubmit={gearSubmitHandler}>
            <input
              className={styles.input}
              type="text"
              placeholder="Add Gear"
              onChange={inputHandler}
              value={input}
            />
            <button className={styles.submit_gear} onClick={gearSubmitHandler}>
              +
            </button>
          </form>
        </div>
        {isEditOpen &&
          (availableTransformers === false ? (
            <h2>Loading</h2>
          ) : (
            <>
              <div
                className={styles.modal_overlay}
                onClick={() => setIsEditOpen(false)}
              ></div>
              <div className={styles.selection_modal}>
                <div className={styles.choices}>
                  <h2>Air</h2>
                  {airGroup.map((item, i) => (
                    <div key={i + 20}>
                      <div
                        tabIndex={i + 12}
                        className={styles.option}
                        onClick={() =>
                          setChosenTransformer([item.type, item.model])
                        }
                      >
                        <h4>{item.type}</h4>
                        <p>{item.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.choices}>
                  <h2>Land</h2>
                  {landGroup.map((item, i) => (
                    <div key={i + 10}>
                      <div
                        tabIndex={i + 1}
                        className={styles.option}
                        onClick={() =>
                          setChosenTransformer([item.type, item.model])
                        }
                      >
                        <h4>{item.type}</h4>
                        <p>{item.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.choices}>
                  <h2>Sea</h2>
                  {seaGroup.map((item, i) => (
                    <div key={i + 30}>
                      <div
                        tabIndex={2 + 3}
                        className={styles.option}
                        onClick={() =>
                          setChosenTransformer([item.type, item.model])
                        }
                      >
                        <h4>{item.type}</h4>
                        <p>{item.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className={styles.choices}></div>
                </div>
                <div
                  className={styles.status_button}
                  onClick={() => setIsStatusOpen(true)}
                >
                  Change Status
                </div>
                <div
                  className={styles.confirm_button}
                  onClick={() => confirmChangesHandler()}
                >
                  Confirm
                </div>
              </div>
              {isStatusOpen && (
                <>
                  <div className={styles.status_modal}>
                    <h3>What is the condition of the transformer?</h3>
                    <div className={styles.status_choices}>
                      <div
                        className={styles.ok_option}
                        onClick={() => statusHandler("OK")}
                      >
                        OK
                      </div>
                      <div
                        className={styles.injured_option}
                        onClick={() => statusHandler("INJURED")}
                      >
                        INJURED
                      </div>
                      <div
                        className={styles.mia_option}
                        onClick={() => statusHandler("MIA")}
                      >
                        MIA
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
      </>
    );
  }
}

export default Details;
