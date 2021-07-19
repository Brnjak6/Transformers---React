import React, { useState, useContext } from "react";
import SearchSvg from "./svg/SearchSvg";
import HomeSvg from "./svg/HomeSvg";
import { useHistory } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";

function Navigation({ transformers }) {
  const [input, setInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useContext(SearchContext);
  let history = useHistory();

  const createTransformerHandler = () => {
    history.push("/create");
  };

  const searchHandler = (e) => {
    e.preventDefault();

    const filterSearch = transformers.filter(
      (trans) => trans.model === e.target[0].defaultValue
    );
    if (filterSearch.length === 0) {
      return alert(
        'No results found in your Cyber Base. Search with uppercase. Example: "Kamov" or "Jetboat"'
      );
    } else {
      setSearch(filterSearch);
      history.push("/search");
    }
  };
  const searchClickHandler = (e) => {
    const filterSearch = transformers.filter((trans) => trans.model === input);
    if (filterSearch.length === 0) {
      return alert(
        'No results found. Search with uppercase. Example: "Kamov" or "Jetboat"'
      );
    } else {
      setSearch(filterSearch);
      history.push("/search");
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="navigation">
      <div className="button_box">
        <button onClick={() => createTransformerHandler()}>Recruit</button>
      </div>
      <h1 className="main-title" onClick={() => history.push("/")}>
        CyberBase
      </h1>
      <div className="home-button" onClick={() => history.push("/")}>
        <HomeSvg />
      </div>
      <div className="search">
        <div className="search_items">
          <form className="form_submit" onSubmit={searchHandler}>
            <input
              onChange={inputHandler}
              value={input}
              type="search"
              placeholder="Search Base"
            />
            <div className="search_button" onClick={() => searchClickHandler()}>
              <SearchSvg />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
