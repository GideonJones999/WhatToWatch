import React from "react";
import LastWatchedMovie from "./last-watched-movie";
import { NavLink } from "react-router-dom";

const MovieRecInfo = ({
  title,
  tagline,
  description,
  poster,
  actors,
  watchLink,
  whereToWatch,
  trailer,
}) => {
  return (
    <div className="movie-rec-info">
      <LastWatchedMovie
        poster={poster}
        title={title}
        tagline={tagline}
        description={description}
        actors={actors}
      />
      <h4 className="where-to-watch">
        You can watch this on
        <a href={watchLink} target="_blank">
          {whereToWatch}
        </a>
      </h4>
      <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
      <iframe
        width="336"
        height="189"
        src={trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        className="movie-trailer"
      ></iframe>
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
  );
};

export default MovieRecInfo;
