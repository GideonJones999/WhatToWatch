import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LastWatchedMovie from "../components/last-watched-movie";
import "./home.css";
import { getUserData, getRandMovieAPI, getFilmData, getFilmId } from "../util";
import Loading from "../components/loading/loading";

export default function Home(user) {
  console.log(user);
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRatings = user.user?.userRatings || [];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const userRatings = user.user.userRatings; // Get user ratings
        console.log(userRatings);
        const movieDataPromises = userRatings.map((rating) =>
          getFilmData(rating.filmId)
        );

        const movies = await Promise.all(movieDataPromises);
        setUserMovies(movies.filter((movie) => movie !== null));
      } catch (error) {
        console.error("Error fetching user movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!loading) {
    console.log(userMovies);
  }

  return (
    <main>
      <div className="last-watched-movies-container">
        <h2>Last Watched:</h2>
        {userMovies.map((movie) => {
          // const userRating = );
          const userRating = userRatings.find((r) => r.filmId === movie.filmId);

          return (
            <LastWatchedMovie
              id={movie.filmId}
              title={movie.title}
              tagline={movie.tagline}
              description={movie.description}
              poster={movie.poster}
              actors={movie.actors}
              rating={userRating ? userRating.rating : "N/A"}
            />
          );
        })}
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
