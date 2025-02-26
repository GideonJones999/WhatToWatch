import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import MovieInfo from "./movie-info";
import { getRandMovie, getUserData, setUserRatings } from "../util";
import "../rate/rate.css";

const MovieRateInfo = ({}) => {
  const location = useLocation();
  const movieData = location.state || getRandMovie();
  const { title, tagline, description, poster, actors } = movieData;

  if (!title) {
    return (
      <main>
        <p>No movie data available. Please navigate from the home page.</p>
      </main>
    );
  }

  const user = getUserData();
  const ratingNumb = parseInt(user.userRatings[title]) || 0; // Retrieve existing rating, default to 0
  const [selectedRating, setSelectedRating] = useState(ratingNumb);

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value)); // Update selected rating
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserRatings(title, selectedRating); // Save the rating
    console.log(`Rating for "${title}" set to ${selectedRating}`);
  };

  console.log(location.state);

  return (
    <main>
      <div className="movie-rate-info">
        <MovieInfo
          title={title}
          tagline={tagline}
          description={description}
          poster={poster}
          actors={actors}
        />
        <div className="ratings">
          <h3>Your Rating:</h3>
          <div className="rate">
            {[...Array(10)].map((_, i) => {
              const starValue = 10 - i; // Stars go from 10 to 1
              return (
                <React.Fragment key={starValue}>
                  <input
                    type="radio"
                    id={`star${starValue}`}
                    name="rate"
                    value={starValue}
                    defaultChecked={ratingNumb === starValue} // Set default checked state
                    onChange={handleRatingChange}
                  />
                  <label
                    htmlFor={`star${starValue}`}
                    title={`${starValue} stars`}
                  >
                    {starValue} stars
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          className="button-link"
          id="movie-rating-submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default MovieRateInfo;
