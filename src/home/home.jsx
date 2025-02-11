import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <main>
      <div className="last-watched-movies-container">
        <h2>Last Watched:</h2>

        <div className="movie-last-watched">
          <img className="last-watched-poster" src="/titanicMoviePoser.jpg" />

          <div className="last-watched-info">
            <h3 className="last-watched-name">Titanic</h3>
            <h5 className="last-watched-tag">
              Nothing on Earth could come between them.
            </h5>
            <p className="last-watched-description">
              101-year-old Rose DeWitt Bukater tells the story of her life
              aboard the Titanic, 84 years later. A young Rose boards the ship
              with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De
              Rossi win third-class tickets aboard the ship. Rose tells the
              whole story from Titanic's departure through to its death—on its
              first and last voyage—on April 15, 1912.
            </p>
            <h4 className="last-watched-featuring">Featuring:</h4>
            <ul className="last-watched-actors">
              <li className="last-watched-actor">Leonardo DiCaprio</li>
              <li className="last-watched-actor">Kate Winslet</li>
            </ul>
            <h4 className="last-watched-personal-rating">
              Your Rating:
              <span className="last-watched-star-rating">******</span>
            </h4>
            <NavLink className="button-link" to="/rate">
              <button id="home-to-rating">See More</button>
            </NavLink>
          </div>
        </div>

        <div className="movie-last-watched">
          <img className="last-watched-poster" src="/endgamePoster.jpg" />

          <div className="last-watched-info">
            <h3 className="last-watched-name">Avengers: Endgame</h3>
            <h5 className="last-watched-tag">Avenge the fallen.</h5>
            <p className="last-watched-description">
              After the devastating events of Avengers: Infinity War, the
              universe is in ruins due to the efforts of the Mad Titan, Thanos.
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos' actions and restore order to the
              universe once and for all, no matter what consequences may be in
              store.
            </p>
            <h4 className="last-watched-featuring">Featuring:</h4>
            <ul className="last-watched-actors">
              <li className="last-watched-actor">Robert Downey Jr.</li>
              <li className="last-watched-actor">Chris Evans</li>
            </ul>
            <h4 className="last-watched-personal-rating">
              Your Rating:
              <span className="last-watched-star-rating">**********</span>
            </h4>
            <NavLink className="button-link" to="/rate">
              <button id="home-to-rating">See More</button>
            </NavLink>
          </div>
        </div>
      </div>

      <div id="home-buttons">
        <NavLink className="button-link" to="/recommend">
          <button id="home-to-rec">What Should I Watch?</button>
        </NavLink>
        <NavLink className="button-link" to="/group">
          <button id="home-to-group">What Should We Watch?</button>
        </NavLink>
        <NavLink className="button-link" to="/rate">
          <button id="home-to-rating">What Do I Like?</button>
        </NavLink>
      </div>
    </main>
  );
}
