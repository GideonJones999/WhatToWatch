import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LastWatchedMovie from "../components/last-watched-movie";
import "./home.css";
import { getUserData, getRandMovieAPI, getFilmData, getFilmId } from "../util";

export default function Home() {
  const user = getUserData();
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const userRatings = user.userRatings; // Get user ratings from the data
      const movieDataPromises = [];

      // Loop through the userRatings and fetch movie data
      for (let movieName in userRatings) {
        const filmId = await getFilmId(movieName); // Get filmId for the movie
        if (filmId) {
          // Fetch movie details if filmId is found
          movieDataPromises.push(getFilmData(filmId));
        }
      }

      // Wait for all the movie data to be fetched
      const movies = await Promise.all(movieDataPromises);

      // Filter out any null responses
      setUserMovies(movies.filter((movie) => movie !== null));
    };

    fetchMovies(); // Call the fetch function when the component mounts
  }, []);

  return (
    <main>
      <div className="last-watched-movies-container">
        <h2>Last Watched:</h2>
        {userMovies.map((movie) => (
          <LastWatchedMovie
            key={movie.filmId}
            title={movie.title}
            tagline={movie.tagline}
            description={movie.description}
            poster={movie.poster}
            actors={movie.actors}
            rating={user.userRatings[movie.title]}
          />
        ))}
      </div>
      <div id="home-buttons">
        <NavLink className="button-link" to="/recommend">
          <button id="home-to-rec">What Should I Watch?</button>
        </NavLink>
        <NavLink className="button-link" to="/group">
          <button id="home-to-group">What Should We Watch?</button>
        </NavLink>
        <NavLink className="button-link" to="/rate">
          <button id="home-to-rating">What Do I Like?</button>
        </NavLink>
      </div>
    </main>
  );
}
