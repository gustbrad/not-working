import React from "react";

const Button = props => (
    <button className={"btn-outline-secondary external " + props.className}>
        {props.label}
    </button>
);

export default Button;