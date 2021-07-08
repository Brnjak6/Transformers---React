import React, { useState } from "react";
import ChooseFaction from "../ChooseFaction";
import ChooseVehicle from "../ChooseVehicle";

function CreateTransformer({ addTransformerHandler, addFactionHandler }) {
  const [faction, setFaction] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const factionHandler = (e) => {
    setFaction(e);
    addFactionHandler(e);
  };

  const vehicleHandler = (e) => {
    setVehicle(e);
  };

  if (!faction) {
    return <ChooseFaction factionHandler={factionHandler} />;
  } else if (faction && !vehicle) {
    return (
      <ChooseVehicle
        vehicleHandler={vehicleHandler}
        addTransformerHandler={addTransformerHandler}
      />
    );
  }
}

export default CreateTransformer;
