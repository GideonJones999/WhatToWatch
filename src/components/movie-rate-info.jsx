import React, { useState } from "react";
import MovieInfo from "./movie-info";
import { getUserData, setUserRatings } from "../util";
import "../rate/rate.css";

const MovieRateInfo = ({ movieData }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  if (!movieData) {
    return (
      <main>
        <p>No movie selected. Search for a movie to rate.</p>
      </main>
    );
  }

  const { filmId, title, tagline, description, poster, actors, trailer } =
    movieData;
  const user = getUserData();

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserRatings(filmId, selectedRating);
    console.log(`Rating for "${title}" set to ${selectedRating}`);
  };

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

        {trailer && (
          <>
            <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
            <iframe
              width="336"
              height="189"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="movie-trailer"
            ></iframe>
          </>
        )}

        <div className="ratings">
          <h3>Your Rating:</h3>
          <div className="rate">
            {[...Array(10)].map((_, i) => {
              const starValue = 10 - i;
              return (
                <React.Fragment key={starValue}>
                  <input
                    type="radio"
                    id={`star${starValue}`}
                    name="rate"
                    value={starValue}
                    checked={selectedRating === starValue}
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
