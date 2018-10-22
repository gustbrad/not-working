import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavList from "../List/NavList";
import NavListItem from "../List/NavListItem";
import Brand from "./Brand";


const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <NavList>
      <NavListItem>
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/findmusician" className={window.location.pathname === "/findmusician" ? "nav-link active" : "nav-link"}>
          Find Musicians
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/findband" className={window.location.pathname === "/findband" ? "nav-link active" : "nav-link"}>
          Find Bands
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/login" className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}>
          Log In
          </Link>
      </NavListItem>
    </NavList>
    <Brand>
      Ensemble Me
    </Brand>
    <NavList>
      <NavListItem>
        <Link to="/signupband" className={window.location.pathname === "/signupband" ? "nav-link active" : "nav-link"}>
          Sign up
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/about" className={window.location.pathname === "/about" ? "nav-link active" : "nav-link"}>
          About Us
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/team" className={window.location.pathname === "/team" ? "nav-link active" : "nav-link"}>
          Team
          </Link>
      </NavListItem>
      <NavListItem>
        <Link to="/contact" className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"}>
          Contact
          </Link>
      </NavListItem>
    </NavList>
  </nav>
);

export default Nav;