import React from "react";
import LastWatchedMovie from "./last-watched-movie";
import { NavLink } from "react-router-dom";
import MovieInfo from "./movie-info";

const MovieRecInfo = () => {
  const getRandMovie = () => {
    return {
      title: "Spider-Man: No Way Home",
      tagline: "The Multiverse unleashed.",
      description:
        "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      actors: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
      trailer: "https://youtu.be/1mTjfMFyPi8",
      poster:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      whereToWatch: "Starz",
      watchLink:
        "https://therokuchannel.roku.com/details/e7c1c173526e5ea0930e70a731ee0776/spider-man-no-way-home",
    };
  };

  const {
    title,
    tagline,
    description,
    actors,
    trailer,
    poster,
    whereToWatch,
    watchLink,
  } = getRandMovie();

  function getYouTubeId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  const trailerID = getYouTubeId(trailer);

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
          <a href={watchLink} target="_blank">
            {whereToWatch}
          </a>
        </h4>
        <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
        <iframe
          width="336"
          height="189"
          src={"//www.youtube.com/embed/" + trailerID}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
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
    </main>
  );
};

export default MovieRecInfo;
