import React, { useState, useEffect } from "react";
import styles from "../styles/CreateTransformer.module.scss";
import CarSvg from "./svg/CarSvg";
import PlaneSvg from "./svg/PlaneSvg";
import HelicopterSvg from "./svg/HelicopterSvg";
import BoatSvg from "./svg/BoatSvg";
import SubmarineSvg from "./svg/SubmarineSvg";
import TruckSvg from "./svg/TruckSvg";
import { useHistory } from "react-router-dom";

function ChooseVehicle({ addTransformerHandler }) {
  let history = useHistory();
  const [isLandSelected, setIsLandSelected] = useState(false);
  const [isAirSelected, setIsAirSelected] = useState(false);
  const [isSeaSelected, setIsSeaSelected] = useState(false);
  const [isPlaneSelected, setIsPlaneSelected] = useState(false);
  const [isHelicopterSelected, setIsHelicopterSelected] = useState(false);
  const [isBoatSelected, setIsBoatSelected] = useState(false);
  const [isMarineSelected, setIsMarineSelected] = useState(false);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [selectedPlaneStyle, setSelectedPlaneStyle] = useState("");
  const [selectedHeliStyle, setSelectedHeliStyle] = useState("");
  const [selectedMarineStyle, setSelectedMarineStyle] = useState("");
  const [selectedBoatStyle, setSelectedBoatStyle] = useState("");
  const [selectedCarStyle, setSelectedCarStyle] = useState("");
  const [selectedTruckStyle, setSelectedTruckStyle] = useState("");
  const [toConfirmStyle, setToConfirmStyle] = useState("");
  const [isTruckSelected, setIsTruckSelected] = useState(false);
  const [isCarSelected, setIsCarSelected] = useState(false);
  const [chosenVehicles, setChosenVehicles] = useState(false);
  const [chosenVehicle, setChosenVehicle] = useState("");
  const [chosenModel, setChosenModel] = useState(null);
  const [modelReady, setModelReady] = useState({
    air: "",
    land: "",
    sea: "",
  });

  const selectAirModel = () => {
    if (modelReady.air === "") {
      return;
    } else {
      fetch(
        "https://my-json-server.typicode.com/damirsehic/transformers-api/db"
      )
        .then((res) => res.json())
        .then((data) => {
          const vehicleGroup = data.vehicleTypes.filter(
            (vehicle) => vehicle.group === "Air"
          );

          const planes = vehicleGroup.filter(
            (vehicle) => vehicle.type === "Plane"
          );
          const helicopters = vehicleGroup.filter(
            (vehicle) => vehicle.type === "Helicopter"
          );
          const finalChoice = isPlaneSelected ? planes : helicopters;
          setChosenVehicles(finalChoice);
          setChosenVehicle(isPlaneSelected ? "plane" : "helicopter");
        });

      setIsSelectionOpen(!isSelectionOpen);
    }
  };

  const selectSeaModel = () => {
    if (modelReady.sea === "") {
      return;
    } else {
      fetch(
        "https://my-json-server.typicode.com/damirsehic/transformers-api/db"
      )
        .then((res) => res.json())
        .then((data) => {
          const vehicleGroup = data.vehicleTypes.filter(
            (vehicle) => vehicle.group === "Sea"
          );

          const boat = vehicleGroup.filter(
            (vehicle) => vehicle.type === "Boat"
          );
          const submarine = vehicleGroup.filter(
            (vehicle) => vehicle.type === "Submarine"
          );
          const finalChoice = isBoatSelected ? boat : submarine;
          setChosenVehicles(finalChoice);
          setChosenVehicle(isBoatSelected ? "boat" : "submarine");
        });

      setIsSelectionOpen(!isSelectionOpen);
    }
  };

  const selectLandModel = () => {
    if (modelReady.land === "") {
      return;
    } else {
      fetch(
        "https://my-json-server.typicode.com/damirsehic/transformers-api/db"
      )
        .then((res) => res.json())
        .then((data) => {
          const vehicleGroup = data.vehicleTypes.filter(
            (vehicle) => vehicle.group === "Land"
          );

          const car = vehicleGroup.filter((vehicle) => vehicle.type === "Car");
          const truck = vehicleGroup.filter(
            (vehicle) => vehicle.type === "Truck"
          );
          const finalChoice = isCarSelected ? car : truck;
          setChosenVehicles(finalChoice);
          setChosenVehicle(isCarSelected ? "car" : "truck");
        });

      setIsSelectionOpen(!isSelectionOpen);
    }
  };

  const selectModelHandler = (e) => {
    setChosenModel(e);
    setToConfirmStyle(styles.opacity);
  };

  const planeHandler = () => {
    setIsPlaneSelected(!isPlaneSelected);
    setSelectedPlaneStyle(styles.vehicle_selected);
    setSelectedHeliStyle("");
    setIsHelicopterSelected(false);
    setModelReady({ ...modelReady, air: styles.option_available });
  };
  const helicopterHandler = () => {
    setIsPlaneSelected(false);
    setSelectedHeliStyle(styles.vehicle_selected);
    setSelectedPlaneStyle("");
    setIsHelicopterSelected(!isHelicopterSelected);
    setModelReady({ ...modelReady, air: styles.option_available });
  };
  const marineHandler = () => {
    setIsBoatSelected(false);
    setSelectedMarineStyle(styles.vehicle_selected);
    setSelectedBoatStyle("");
    setIsBoatSelected(false);
    setIsMarineSelected(!isMarineSelected);
    setModelReady({ ...modelReady, sea: styles.option_available });
  };
  const boatHandler = () => {
    setIsMarineSelected(false);
    setSelectedBoatStyle(styles.vehicle_selected);
    setSelectedMarineStyle("");
    setIsBoatSelected(!isBoatSelected);
    setModelReady({ ...modelReady, sea: styles.option_available });
  };
  const carHandler = () => {
    setIsTruckSelected(false);
    setSelectedCarStyle(styles.vehicle_selected);
    setSelectedTruckStyle("");
    setIsCarSelected(!isCarSelected);
    setModelReady({ ...modelReady, land: styles.option_available });
  };
  const truckHandler = () => {
    setIsCarSelected(false);
    setSelectedTruckStyle(styles.vehicle_selected);
    setSelectedCarStyle("");
    setIsTruckSelected(!isTruckSelected);
    setModelReady({ ...modelReady, land: styles.option_available });
  };

  const pushTransformer = (e) => {
    if (!chosenModel) {
      return;
    } else {
      addTransformerHandler(chosenVehicle, chosenModel);
      history.push("/");
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h1>Choose a vehicle</h1>
        <div className={styles.choices}>
          {isAirSelected !== true ? (
            <div className={styles.air} onClick={() => setIsAirSelected(true)}>
              <div className={styles.description}>
                <h4>Air</h4>
              </div>
            </div>
          ) : (
            <div className={styles.confirm}>
              <div className={styles.vehicle_box}>
                <div
                  className={`${styles.option} ${selectedPlaneStyle}`}
                  onClick={() => planeHandler()}
                >
                  <PlaneSvg />
                  <p>Plane</p>
                </div>
                <div
                  className={`${styles.option} ${selectedHeliStyle}`}
                  onClick={() => helicopterHandler()}
                >
                  <HelicopterSvg />
                  <p>Helicopter</p>
                </div>
              </div>
              <div
                className={`${styles.selection} ${modelReady.air}`}
                onClick={() => selectAirModel()}
              >
                Select a model
              </div>
            </div>
          )}
          {isSeaSelected !== true ? (
            <div className={styles.sea} onClick={() => setIsSeaSelected(true)}>
              <div className={styles.description}>
                <h4>Sea</h4>
              </div>
            </div>
          ) : (
            <div className={styles.confirm}>
              <div className={styles.vehicle_box}>
                <div
                  className={`${styles.option} ${selectedMarineStyle}`}
                  onClick={() => marineHandler()}
                >
                  <SubmarineSvg />
                  <p>Submarine</p>
                </div>
                <div
                  className={`${styles.option} ${selectedBoatStyle}`}
                  onClick={() => boatHandler()}
                >
                  <BoatSvg />
                  <p>Boat</p>
                </div>
              </div>
              <div
                className={`${styles.selection} ${modelReady.sea}`}
                onClick={() => selectSeaModel()}
              >
                Select a model
              </div>
            </div>
          )}
          {isLandSelected !== true ? (
            <div
              onClick={() => setIsLandSelected(true)}
              className={styles.ground}
            >
              <div className={styles.description}>
                <h4>Land</h4>
              </div>
            </div>
          ) : (
            <div className={styles.confirm}>
              <div className={styles.vehicle_box}>
                <div
                  className={`${styles.option} ${selectedCarStyle}`}
                  onClick={() => carHandler()}
                >
                  <CarSvg />
                  <p>Car</p>
                </div>
                <div
                  className={`${styles.option} ${selectedTruckStyle}`}
                  onClick={() => truckHandler()}
                >
                  <TruckSvg />
                  <p>Truck</p>
                </div>
              </div>
              <div
                className={`${styles.selection} ${modelReady.land}`}
                onClick={() => selectLandModel()}
              >
                Select a model
              </div>
            </div>
          )}
        </div>
      </div>
      {isSelectionOpen &&
        (chosenVehicles === false ? (
          <h2>Loading</h2>
        ) : (
          <section>
            <div
              className={styles.modal_overlay}
              onClick={() => (
                // eslint-disable-next-line no-sequences
                setIsSelectionOpen(!isSelectionOpen),
                setChosenModel(null),
                setToConfirmStyle("")
              )}
            ></div>
            <div className={styles.selection_modal}>
              <h3>Choose a model </h3>
              <div className={styles.model_container}>
                {chosenVehicles.map((vehicle, i) => (
                  <div
                    tabIndex={i}
                    key={i}
                    className={styles.model_item}
                    onClick={() => selectModelHandler(vehicle.model)}
                  >
                    <p>{vehicle.model}</p>
                  </div>
                ))}
              </div>
              <div
                className={`${styles.confirm_button} ${toConfirmStyle}`}
                onClick={() => pushTransformer()}
              >
                Confirm
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}

export default ChooseVehicle;
