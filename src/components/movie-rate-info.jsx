import React from "react";
import LastWatchedMovie from "./last-watched-movie";
import { NavLink } from "react-router-dom";

const MovieRateInfo = ({ title, tagline, description, poster, actors }) => {
  return (
    <div className="movieRateInfo">
      <LastWatchedMovie
        title={title}
        tagline={tagline}
        description={description}
        poster={poster}
        actors={actors}
      />
      <div class="ratings">
        <h3>Your Rating:</h3>
        <div class="rate">
          <input type="radio" id="star10" name="rate" value="10" />
          <label for="star10" title="10 stars">
            10 stars
          </label>
          <input type="radio" id="star9" name="rate" value="9" />
          <label for="star9" title="9 stars">
            9 stars
          </label>
          <input type="radio" id="star8" name="rate" value="8" />
          <label for="star8" title="8 stars">
            8 stars
          </label>
          <input type="radio" id="star7" name="rate" value="7" />
          <label for="star7" title="7 stars">
            7 stars
          </label>
          <input type="radio" id="star6" name="rate" value="6" />
          <label for="star6" title="6 stars">
            6 stars
          </label>
          <input type="radio" id="star5" name="rate" value="5" />
          <label for="star5" title="5 stars">
            5 stars
          </label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label for="star4" title="4 stars">
            4 stars
          </label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label for="star3" title="3 stars">
            3 stars
          </label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label for="star2" title="2 stars">
            2 stars
          </label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label for="star1" title="1 star">
            1 star
          </label>
        </div>
      </div>
      <input type="submit" class="button-link" />
    </div>
  );
};

export default MovieRateInfo;
