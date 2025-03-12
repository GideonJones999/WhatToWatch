import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieInfo from "./movie-info";
import {
  getRandMovieAPI,
  getUserData,
  setUserRatings,
  getFilmData,
} from "../util";
import "../rate/rate.css";

const MovieRateInfo = () => {
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let data = location.state || (await getRandMovieAPI(1));
        if (typeof data === "number") {
          // If getRandMovieAPI returns an ID instead of movie data, fetch full movie data
          data = await getFilmData(data);
        }

        if (!data || !data.title) {
          throw new Error("Invalid movie data received");
        }

        setMovieData(data);
        const user = getUserData();
        setSelectedRating(parseInt(user.userRatings[data.title]) || 0);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [location.state]);

  if (loading)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  if (!movieData) {
    return (
      <main>
        <p>No movie data available. Please navigate from the home page.</p>
      </main>
    );
  }

  const { title, tagline, description, poster, actors, trailer } = movieData;

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserRatings(title, selectedRating);
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

        {/* Trailer Section */}
        {trailer && (
          <>
            <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
            <iframe
              width="336"
              height="189"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="movie-trailer"
            ></iframe>
          </>
        )}

        {/* Ratings Section */}
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
