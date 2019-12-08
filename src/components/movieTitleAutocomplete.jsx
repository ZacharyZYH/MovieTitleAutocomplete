import React from "react";
import Pill from "./pill";
import InputTextBox from "./inputTextBox";
import "../css/movieTitleAutocomplete.css";

class MovieTitleAutocomplete extends React.Component {
  state = {
    movieList: [],
    selectedMovies: []
  };

  handleMovieListUpdate = movieList => {
    this.setState({ movieList });
  };

  handlePillDelete = imdbID => {
    const selectedMovies = this.state.selectedMovies.filter(
      movie => movie["imdbID"] !== imdbID
    );
    this.setState({ selectedMovies });
  };

  handleSelect = selectedMovie => {
    const previousLen = this.state.selectedMovies.length;
    let selectedMovies = this.state.selectedMovies.filter(
      movie => movie["imdbID"] !== selectedMovie["imdbID"]
    );
    if (previousLen === selectedMovies.length) {
      if (previousLen >= 5) {
        alert("You cannot add more than 5 movies.");
      } else {
        selectedMovies = [selectedMovie, ...selectedMovies];
      }
    }
    this.setState({ selectedMovies, movieList: [] });
  };

  render() {
    return (
      <div className="container">
        <div className="pill-container">
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
    );
  }
}

export default MovieTitleAutocomplete;
