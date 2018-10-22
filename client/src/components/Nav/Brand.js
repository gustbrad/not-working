import React from "react";

const Brand = props => (
    <div id="logo">
        <a className="navbar-brand">{props.children}</a>
    </div>
);

export default Brand;