import React from "react";

const DropdownList = props => 
    <select className="custom-select" id={props.id}>{props.data.map((x,y) => <option key={y} value={x}>{x}</option>)}</select>;

export default DropdownList;

