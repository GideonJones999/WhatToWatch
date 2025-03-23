import React, { useState, useEffect } from "react";
import MovieInfo from "./movie-info";
import { getRandMovieAPI } from "../util";
import "../movie-rec/movie-rec.css";
import Loading from "./loading/loading";

const MovieRecInfo = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [userRating, setUserRating] = useState(""); // State to store the user's rating

  useEffect(() => {
    console.log("getting movie data");
    const fetchMovieData = async () => {
      try {
        const data = await getRandMovieAPI();
        console.log("Fetched movie data:", data);

        // Only update state if data is different
        if (JSON.stringify(data) !== JSON.stringify(movieData)) {
          setMovieData(data);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        console.log("Done Loading");
        setLoading(false);
      }
    };

    fetchMovieData();
    console.log("done fetching");
  }, []); // Runs only once when the component mounts

  if (loading) {
    return <Loading />;
  }

  if (!movieData) {
    return <div>Error loading movie data</div>;
  }

  const { title, tagline, description, actors, poster, whereToWatch, trailer } =
    movieData;

  const handleRating = (rating) => {
    setUserRating(rating); // Set the user rating state
    console.log(`User rating: ${rating}`); // You can replace this with actual logic, like saving the rating or performing an action
  };

  return (
    <main>
      <div className="movie-rec-info">
        <MovieInfo
          poster={poster}
          title={title}
          tagline={tagline}
          description={description}
          actors={actors}
        />
        <h4 className="where-to-watch">
          {"You can watch this on "}
          <ul>
            {whereToWatch.map((offer) => (
              <li key={offer.provider_name}>
                <a href={offer.url} target="_blank" rel="noopener noreferrer">
                  {offer.provider_name}
                </a>
              </li>
            ))}
          </ul>
        </h4>
        {trailer && (
          <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
        )}
        {trailer && (
          <iframe
            width="336"
            height="189"
            src={"//www.youtube.com/embed/" + trailer.key}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="movie-trailer"
          ></iframe>
        )}

        <div className="rec-rating">
          <h3>Are you Interested?</h3>
          <a id="rating-no" className="button-link">
            <button onClick={() => handleRating("No!")}>No!</button>
          </a>
          <a id="rating-mid" className="button-link">
            <button onClick={() => handleRating("Not Now...")}>
              Not Now...
            </button>
          </a>
          <a id="rating-yes" className="button-link">
            <button onClick={() => handleRating("Absolutely!")}>
              Absolutely!
            </button>
          </a>
        </div>

        {userRating && <p>Your Rating: {userRating}</p>}
      </div>
    </main>
  );
};

export default MovieRecInfo;
