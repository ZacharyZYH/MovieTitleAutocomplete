import React, { Component } from "react";
import "../css/inputTextBox.css";
import DropdownList from "./dropdownList";

const apikey = "bc10700";

class InputTextBox extends Component {
  constructor() {
    super();
    this.state = { text: "jo" };
  }

  state = {
    text: "",
    focus: 0
  };

  clearInput = () => {
    this.setState({ text: "" });
  };

  handleChange = e => {
    this.setState({ text: e.target.value, movieList: [] });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.updateList();
    }, 500);
  };

  handleSelect = movie => {
    this.clearInput();
    this.props.onSelect(movie);
  };

  handleFocus = () => {
    this.setState({ focus: 1 });
  };

  handleBlur = () => {
    this.setState({ focus: 0 });
  };

  render() {
    return (
      <div className="inputTextBox">
        <input
          type="text"
          className="inputTextBox-text"
          cols="30"
          rows="1"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.state.text}
        />
        <DropdownList
          choices={this.props.movieList}
          onSelect={this.handleSelect}
          displayable={this.state.focus}
        ></DropdownList>
      </div>
    );
  }

  getListUrl = keyword =>
    "http://www.omdbapi.com/?s=" + keyword + "&apikey=" + apikey;

  getDetailUrl = title =>
    "http://www.omdbapi.com/?t=" +
    title.replace(/\s/g, "-") +
    "&apikey=" +
    apikey;

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

  updateDetails = movieList => {
    movieList = movieList.map(movie => {
      let url = this.getDetailUrl(movie.Title);

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          let details = {};
          if (responseJson.Response === "True") {
            details = responseJson;
          }
          movie["details"] = details;
          return movie;
        });
    });
  };
}

export default InputTextBox;
