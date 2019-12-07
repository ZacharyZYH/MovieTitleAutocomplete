import React, { Component } from "react";
import "../css/movieTitleAutocomplete.css";
import "../css/pill.css";
import Pill from "./pill";
import InputTextBox from "./inputTextBox";

class MovieTitleAutocomplete extends Component {
  state = {
    movieList: [],
    selectedMovies: []
  };

  handleMovieListUpdate = movieList => {
    this.setState({ movieList });
  };

  handlePillDelete = imdbID => {
    let selectedMovies = this.state.selectedMovies.filter(
      movie => movie["imdbID"] !== imdbID
    );
    this.setState({ selectedMovies });
  };

  handleSelect = selectedMovie => {
    let previousLen = this.state.selectedMovies.length;
    let selectedMovies = this.state.selectedMovies.filter(
      movie => movie["imdbID"] !== selectedMovie["imdbID"]
    );
    if (previousLen === selectedMovies.length && previousLen < 5) {
      selectedMovies.push(selectedMovie);
    }
    this.setState({ selectedMovies, movieList: [] });
  };

  render() {
    return (
      <div>
        <div
          name="nnnn"
          id="1"
          cols="30"
          rows="1"
          className="movieTitleAutocomplete m-2 border"
        >
          {this.state.selectedMovies.map(movie => (
            <Pill
              key={movie["imdbID"]}
              id={movie["imdbID"]}
              text={movie["Title"]}
              onDelete={this.handlePillDelete}
            />
          ))}
          <InputTextBox
            onMovieListChange={this.handleMovieListUpdate}
            movieList={this.state.movieList}
            onSelect={this.handleSelect}
          />
        </div>
      </div>
    );
  }
}

export default MovieTitleAutocomplete;
