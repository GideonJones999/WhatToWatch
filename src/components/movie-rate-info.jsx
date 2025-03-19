import React, { useState } from "react";
import MovieInfo from "./movie-info";
import { updateUser, getCurrentUser } from "../../service/userAPI";
import "../rate/rate.css";

const MovieRateInfo = ({ user, movieData, onUserUpdate }) => {
  const [selectedRating, setSelectedRating] = useState(movieData?.rating || 0);

  if (!movieData) {
    return (
      <main>
        <p>No movie selected. Search for a movie to rate.</p>
      </main>
    );
  }

  const { filmId, title, tagline, description, poster, actors, trailer } =
    movieData;

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error("User is not defined.");
      return;
    }

    // Ensure userRatings is an array
    let updatedRatings = Array.isArray(user.userRatings)
      ? [...user.userRatings]
      : [];

    // Check if the movie already has a rating
    const existingIndex = updatedRatings.findIndex((r) => r.id === filmId);
    if (existingIndex !== -1) {
      updatedRatings[existingIndex].rating = selectedRating;
    } else {
      updatedRatings = [
        { filmId, rating: selectedRating },
        ...user.userRatings,
      ];
    }

    // Create a new user object with updated ratings
    const updatedUser = {
      ...user,
      userRatings: updatedRatings,
    };

    try {
      const response = await updateUser(updatedUser);
      console.log("User updated successfully:", response);
      const updatedUserData = await getCurrentUser();
      if (updatedUserData) {
        onUserUpdate(updatedUserData); // Update the parent component with the new user data
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <main>
      <div className="movie-rate-info">
        <MovieInfo
          title={title}
          tagline={tagline}
          description={description}
          poster={poster}
          actors={actors}
        />

        {trailer && (
          <>
            <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
            <iframe
              width="336"
              height="189"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="movie-trailer"
            ></iframe>
          </>
        )}

        <div className="ratings">
          <h3>Your Rating:</h3>
          <div className="rate">
            {[...Array(10)].map((_, i) => {
              const starValue = 10 - i;
              return (
                <React.Fragment key={starValue}>
                  <input
                    type="radio"
                    id={`star${starValue}`}
                    name="rate"
                    value={starValue}
                    checked={selectedRating === starValue}
                    onChange={handleRatingChange}
                  />
                  <label
                    htmlFor={`star${starValue}`}
                    title={`${starValue} stars`}
                  >
                    {starValue} stars
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="button-link"
          id="movie-rating-submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default MovieRateInfo;
