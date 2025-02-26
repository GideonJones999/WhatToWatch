import React from "react";
import LastWatchedMovie from "./last-watched-movie";
import { NavLink, useLocation } from "react-router-dom";
import MovieInfo from "./movie-info";

const MovieRateInfo = ({}) => {
  const location = useLocation();
  const { title, tagline, description, poster, actors, rating } =
    location.state || {};

  if (!title) {
    return (
      <main>
        <p>No movie data available. Please navigate from the home page.</p>
      </main>
    );
  }

  const ratingNamb = parseInt(rating);

  console.log(location.state);

  return (
    <main>
      <div className="movieRateInfo">
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
                    defaultChecked={ratingNamb === starValue} // Set default checked state
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
        <input type="submit" className="button-link" />
      </div>
    </main>
  );
};

export default MovieRateInfo;
