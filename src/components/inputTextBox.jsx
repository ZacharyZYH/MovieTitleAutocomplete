import React, { Component } from "react";
import DropdownList from "./dropdownList";
import "../css/inputTextBox.css";

const apikey = "bc10700";

class InputTextBox extends Component {
  state = {
    text: "",
    focus: 0
  };

  clearInput = () => {
    this.setState({ text: "" });
  };

  handleChange = e => {
    this.setState({ text: e.target.value, movieList: [] });
    if (this.inputTimer) {
      clearTimeout(this.inputTimer);
    }
    this.inputTimer = setTimeout(() => {
      this.updateList();
    }, 500);
  };

  handleSelect = movie => {
    this.clearInput();
    this.props.onSelect(movie);
    setTimeout(() => {
      this.textInput.focus();
    }, 100);
  };

  handleFocus = () => {
    this.setState({ focus: 1 });
  };

  handleBlur = () => {
    this.setState({ focus: 0 });
  };

  getListUrl = keyword =>
    "http://www.omdbapi.com/?s=" + keyword + "&apikey=" + apikey;

  updateList = () => {
    let url = this.getListUrl(this.state.text);

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        let movieList = [];
        if (responseJson.Response === "True") {
          movieList = responseJson.Search;
        }
        this.props.onMovieListChange(movieList);
      });
  };

  render() {
    return (
      <div className="inputTextBox">
        <input
          type="text"
          className="inputTextBox-text"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.state.text}
          ref={input => {
            this.textInput = input;
          }}
        />
        <DropdownList
          choices={this.props.movieList}
          onSelect={this.handleSelect}
          displayable={this.state.focus}
        ></DropdownList>
      </div>
    );
  }
}

export default InputTextBox;
