import React from "react";

const MovieInfo = ({ title, tagline, description, poster, actors }) => {
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
      </div>
    </div>
  );
};

export default MovieInfo;
