import React, { Component } from "react";
import "../css/dropdownList.css";

class DropdownList extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          "dropdownList-container " +
          (this.props.choices.length && this.props.displayable
            ? "dropdownList-show"
            : "dropdownList-hide")
        }
      >
        <ul className="dropdownList">
          {this.props.choices.map(movie => (
            <li
              key={movie["imdbID"]}
              className="dropdownList-item"
              onMouseDown={() => this.props.onSelect(movie)}
            >
              {movie["Title"]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DropdownList;
