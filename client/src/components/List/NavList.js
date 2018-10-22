import React from "react";

const NavList = ({ children }) => {
  return (
    <div className="collapse navbar-collapse navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
        {children}
      </ul>
    </div>
  );
};

export default NavList;