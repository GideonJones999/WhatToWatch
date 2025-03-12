import React, { useState, useEffect } from "react";
import MovieInfo from "./movie-info";
import { getRandMovieAPI } from "../util";
import "../movie-rec/movie-rec.css";
import Loading from "./loading/loading";

const MovieRecInfo = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getRandMovieAPI(1);
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []); // Runs only once when the component mounts

  if (loading) {
    return <Loading />;
  }

  if (!movieData) {
    return <div>Error loading movie data</div>;
  }

  const { title, tagline, description, actors, poster, whereToWatch, trailer } =
    movieData;

  console.log(movieData);

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
            <button>No!</button>
          </a>
          <a id="rating-mid" className="button-link">
            <button>Not Now...</button>
          </a>
          <a id="rating-yes" className="button-link">
            <button>Absolutely!</button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default MovieRecInfo;
