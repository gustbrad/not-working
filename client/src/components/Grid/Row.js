import React from "react";

const Row = props => (
  <div className={"row"} id={props.id}>
    {props.children}
  </div>
);

export default Row;