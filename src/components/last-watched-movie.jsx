import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MovieInfo from "./movie-info";

const LastWatchedMovie = ({
  title,
  tagline,
  description,
  poster,
  actors,
  rating,
}) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/rate", {
      state: { title, tagline, description, poster, actors, rating },
    });
  };

  return (
    <div className="movie-last-watched">
      <MovieInfo
        title={title}
        tagline={tagline}
        description={description}
        poster={poster}
        actors={actors}
      />
      <div className="last-watched-info">
        <h4 className="last-watched-personal-rating">
          Your Rating:
          <span className="last-watched-star-rating">
            {" " + rating + "/10"}
          </span>
        </h4>
        <button className="button-link" id="home-to-rating" onClick={handleNav}>
          See More
        </button>
      </div>
    </div>
  );
};

export default LastWatchedMovie;
