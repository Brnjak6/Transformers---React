import React from "react";
import Navigation from "./Navigation";

function Layout(props) {
  return (
    <div>
      <Navigation transformers={props.transformers} />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
