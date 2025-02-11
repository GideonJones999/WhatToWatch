import React from "react";
import { NavLink } from "react-router-dom";

const LastWatchedMovie = ({
  title,
  tagline,
  description,
  poster,
  actors,
  rating,
}) => {
  return (
    <div className="movie-last-watched">
      <img
        className="last-watched-poster"
        src={poster}
        alt={`${title} Poster`}
      />

      <div className="last-watched-info">
        <h3 className="last-watched-name">{title}</h3>
        <h5 className="last-watched-tag">{tagline}</h5>
        <p className="last-watched-description">{description}</p>
        <h4 className="last-watched-featuring">Featuring:</h4>
        <ul className="last-watched-actors">
          {actors.map((actor, index) => (
            <li key={index} className="last-watched-actor">
              {actor}
            </li>
          ))}
        </ul>
        <h4 className="last-watched-personal-rating">
          Your Rating:
          <span className="last-watched-star-rating">{rating}</span>
        </h4>
        <NavLink className="button-link" to="/rate">
          <button id="home-to-rating">See More</button>
        </NavLink>
      </div>
    </div>
  );
};

export default LastWatchedMovie;
