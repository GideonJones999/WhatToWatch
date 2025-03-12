import React, { useState } from "react";
import { getFilmId, getFilmIdFiltered, getFilmData } from "../util";
import MovieRateInfo from "./movie-rate-info";
import "../rate/rate.css";
import Loading from "./loading/loading";

const MovieRateSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      {movieData && <MovieRateInfo movieData={movieData} />}
    </main>
  );
};

export default MovieRateSearch;
