import React from "react";
import "../css/dropdownList.css";

const DropdownList = props => {
  return (
    <div
      className={
        "dropdownList-container " +
        (props.choices.length && props.displayable
          ? "dropdownList-show"
          : "dropdownList-hide")
      }
    >
      <ul className="dropdownList">
        {props.choices.map(movie => (
          <li
            key={movie["imdbID"]}
            className="dropdownList-item"
            onMouseDown={() => props.onSelect(movie)}
          >
            {movie["Title"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
