import React from "react";
import "./movie-rec.css";

export default function Recommend() {
  return (
    <main>
      <h1>Recommendation</h1>
      <div className="movie-last-watched">
        <img className="last-watched-poster" src="/endgamePoster.jpg" />
        <div className="last-watched-info">
          <h3 className="last-watched-name">Avengers: Endgame</h3>
          <h5 className="last-watched-tag">Avenge the fallen.</h5>
          <p className="last-watched-description">
            After the devastating events of Avengers: Infinity War, the universe
            is in ruins due to the efforts of the Mad Titan, Thanos. With the
            help of remaining allies, the Avengers must assemble once more in
            order to undo Thanos' actions and restore order to the universe once
            and for all, no matter what consequences may be in store.
          </p>
          <h4 className="last-watched-featuring">Featuring:</h4>
          <ul className="last-watched-actors">
            <li className="last-watched-actor">Robert Downey Jr.</li>
            <li className="last-watched-actor">Chris Evans</li>
          </ul>
          <h4 className="where-to-watch">
            You can watch this on
            <a
              href="https://www.disneyplus.com/movies/marvel-studios-avengers-endgame/aRbVJUb2h2Rf"
              target="_blank"
            >
              Disney+
            </a>
          </h4>
          <h4 className="movie-trailer-tease">Watch the Trailer Here:</h4>
          <iframe
            width="336"
            height="189"
            src="https://www.youtube.com/embed/TcMBFSGVi1c?si=pskXyNabMNwIj8bN"
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
      </div>
    </main>
  );
}
