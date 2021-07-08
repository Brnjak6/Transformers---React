import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Main from "./components/routes/Main";
import { Switch, Route } from "react-router-dom";
import CreateTransformer from "./components/routes/CreateTransformer";
import Details from "./components/routes/Details";
import "./styles/Base.scss";
import { useHistory } from "react-router-dom";
import Search from "./components/routes/Search";
import { SearchProvider } from "./components/context/SearchContext";

function App() {
  const [transformers, setTransformers] = useState([]);
  const [transformer, setTransformer] = useState("");
  const [detailsTransformer, setDetailsTransformer] = useState(false);
  const [editedTransformer, setEditedTransformer] = useState(false);
  const [gearedTransformer, setGearedTransformer] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (transformer.vehicle && transformer.faction) {
      setTransformers([...transformers, transformer]);
      setTransformer("");
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transformer]);

  const addTransformerHandler = (item1, item2) => {
    setTransformer((prevItems) => ({
      ...prevItems,
      vehicle: item1,
      model: item2,
      status: "OK",
      gear: [],
      id: new Date().getUTCMilliseconds(),
    }));
  };

  const addFactionHandler = (e) => {
    setTransformer((prevItems) => ({
      ...prevItems,
      faction: e,
    }));
  };

  const handleDetailsTransformer = (e) => {
    setDetailsTransformer(e);
    history.push("/details");
  };

  const afterEditTransformer = (e) => {
    setTransformers((prevs) =>
      prevs.map((prev) => (prev.id === e.id ? e : prev))
    );
  };
  const afterGearTransformer = (e) => {
    setTransformers((prevItems) =>
      prevItems.map((prev) => (prev.id === e.id ? e : prev))
    );
  };

  return (
    <>
      <SearchProvider>
        <Layout transformers={transformers}>
          <Switch>
            <Route path="/" exact>
              <Main
                transformers={transformers}
                handleDetailsTransformer={handleDetailsTransformer}
              />
            </Route>
            <Route path="/create">
              <CreateTransformer
                addTransformerHandler={addTransformerHandler}
                addFactionHandler={addFactionHandler}
              />
            </Route>
            <Route path="/details">
              <Details
                detailsTransformer={detailsTransformer}
                afterEditTransformer={afterEditTransformer}
                afterGearTransformer={afterGearTransformer}
              />
            </Route>
            <Route path="/search">
              <Search
                transformers={transformers}
                handleDetailsTransformer={handleDetailsTransformer}
              />
            </Route>
          </Switch>
        </Layout>
      </SearchProvider>
    </>
  );
}

export default App;
