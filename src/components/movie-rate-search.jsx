import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFilmIdFiltered, getFilmData } from "../util";
import MovieRateInfo from "./movie-rate-info";
import "../rate/rate.css";
import Loading from "./loading/loading";

const MovieRateSearch = ({ user, setUser }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movieData, setMovieData] = useState(location.state?.movieData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (movieData) {
      console.log("Updated Movie Data:", movieData);
    }
  }, [movieData]);

  useEffect(() => {
    if (location.state?.movieData && !movieData) {
      setMovieData(location.state.movieData);
    }
  }, [location.state, movieData]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMovieData(null);

    try {
      const filmId = await getFilmIdFiltered(searchQuery);
      if (!filmId) {
        setError("No movie found. Try another title.");
        setLoading(false);
        return;
      }

      const data = await getFilmData(filmId);
      if (!data) {
        setError("Error fetching movie details.");
      } else {
        setMovieData(data);
      }
    } catch (err) {
      console.error("Error searching for movie:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser); // Update the user state in the parent
  };

  return (
    <main>
      <h2>Search for a Movie to Rate</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <Loading />}
      {error && <p className="error-message">{error}</p>}

      {/* Conditional rendering for movieData */}
      {!movieData ? (
        <p>No movie selected. Search for a movie to rate.</p>
      ) : (
        <MovieRateInfo
          movieData={movieData}
          user={user}
          onUserUpdate={handleUserUpdate}
        />
      )}
    </main>
  );
};

export default MovieRateSearch;
