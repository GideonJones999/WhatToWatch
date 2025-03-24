import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieInfo from "./movie-info";
import { getRandMovieAPI } from "../util";
import { updateUser, getCurrentUser } from "../userAPI";
import "../movie-rec/movie-rec.css";
import Loading from "./loading/loading";

const MovieRecInfo = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getRandMovieAPI();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        console.log("Done Loading");
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />;
  if (!movieData) return <div>Error loading movie data</div>;
  if (!user) return <Loading />;

  const {
    filmId,
    title,
    tagline,
    description,
    actors,
    poster,
    whereToWatch,
    trailer,
  } = movieData;

  const handleRating = async (rating) => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    if (rating === "Absolutely!") {
      navigate("/rate", {
        state: {
          movieData: {
            filmId,
            title,
            tagline,
            description,
            poster,
            actors,
            rating,
          },
        },
      });
      return;
    } else {
      let updatedNotInterested = user.userNotInterested;
      updatedNotInterested.push(filmId);
      const updatedUser = { ...user, userNotInterested: updatedNotInterested };
      try {
        await updateUser(updatedUser);
        const updatedUserData = await getCurrentUser();
        await setUser(updatedUserData);
        console.log(updatedUserData);
        window.location.reload();
      } catch (error) {
        console.error("Error updating user:", error);
        return;
      }
    }
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

        <div className="watch-container">
          <h4 className="where-to-watch">You can watch this on:</h4>
          <ul>
            {whereToWatch.map((offer) => (
              <li key={offer.provider_name}>
                <a href={offer.url} target="_blank" rel="noopener noreferrer">
                  {offer.provider_name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {trailer && (
          <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
        )}
        {trailer && (
          <iframe
            width="336"
            height="189"
            src={`//www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="movie-trailer"
          ></iframe>
        )}

        <div className="rec-rating">
          <h3>Are you Interested?</h3>
          <button
            id="rating-no"
            className="button-link"
            onClick={() => handleRating("No!")}
          >
            No!
          </button>
          <button
            id="rating-yes"
            className="button-link"
            onClick={() => handleRating("Absolutely!")}
          >
            Absolutely!
          </button>
        </div>
      </div>
    </main>
  );
};

export default MovieRecInfo;
