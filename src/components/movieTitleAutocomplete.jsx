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
    if (previousLen === selectedMovies.length) {
      if (previousLen >= 5) {
        alert("You cannot add more than 5 movies.");
      } else {
        // selectedMovies.push(selectedMovie);
        selectedMovies = [selectedMovie].concat(selectedMovies);
      }
    }
    this.setState({ selectedMovies, movieList: [] });
  };

  render() {
    return (
      <div>
        <div id="1" cols="30" rows="1" className="movieTitleAutocomplete">
          <div className="movieTitleAutocomplete-pill-container">
            {this.state.selectedMovies.map(movie => (
              <Pill
                key={movie["imdbID"]}
                id={movie["imdbID"]}
                text={movie["Title"]}
                onDelete={this.handlePillDelete}
              />
            ))}
          </div>
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
