import React from "react";
import "./List.css";

const NavListItem = props => (
  <li className="nav-item">
    {props.children}
  </li>
);

export default NavListItem;