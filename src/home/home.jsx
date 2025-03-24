import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LastWatchedMovie from "../components/last-watched-movie";
import "./home.css";
import { getFilmData } from "../util";
import { getCurrentUser } from "../userAPI";
import Loading from "../components/loading/loading";

export default function Home() {
  const [user, setUser] = useState(null); // Initialize user state
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndMovies = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch current user
        setUser(currentUser); // Set user data

        if (currentUser?.userRatings) {
          const movieDataPromises = currentUser.userRatings.map((rating) =>
            getFilmData(rating.filmId)
          );

          const movies = await Promise.all(movieDataPromises);
          setUserMovies(movies.filter((movie) => movie !== null));
        }
      } catch (error) {
        console.error("Error fetching user or movies:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!user) {
      console.log("Fetching User");
      fetchUserAndMovies();
    } else {
      setLoading(false);
    }
  }, [user]); // Empty dependency array ensures it runs on initial render only

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
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
      <div className="last-watched-movies-container">
        <h2>Last Watched:</h2>
        {userMovies.map((movie) => {
          const userRating = user.userRatings.find(
            (r) => r.filmId === movie.filmId
          );
          return (
            <LastWatchedMovie
              filmId={movie.filmId}
              title={movie.title}
              tagline={movie.tagline}
              description={movie.description}
              poster={movie.poster}
              actors={movie.actors}
              rating={userRating ? userRating.rating : "N/A"}
            />
          );
        })}
        {userMovies.length === 0 && (
          <>
            <p>Let's Record some of your Favorite Movies!</p>{" "}
            <NavLink className="button-link" to="/rate">
              <button id="home-to-rating">What Do I Like?</button>
            </NavLink>
          </>
        )}
      </div>
    </main>
  );
}
