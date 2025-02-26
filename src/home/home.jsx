import React from "react";
import { NavLink } from "react-router-dom";
import LastWatchedMovie from "../components/last-watched-movie";
import "./home.css";

export default function Home() {
  return (
    <main>
      <div className="last-watched-movies-container">
        <h2>Last Watched:</h2>

        <LastWatchedMovie
          title="Titanic"
          tagline="Nothing on Earth could come between them."
          description="101-year-old Rose DeWitt Bukater tells the story of her life
              aboard the Titanic, 84 years later. A young Rose boards the ship
              with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De
              Rossi win third-class tickets aboard the ship. Rose tells the
              whole story from Titanic's departure through to its death—on its
              first and last voyage—on April 15, 1912."
          poster="https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
          actors={["Leonardo DiCaprio", "Kate Winslet"]}
          rating="6"
        />

        <LastWatchedMovie
          poster="https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
          title="Avengers: Endgame"
          tagline="Avenge the fallen."
          description="After the devastating events of Avengers: Infinity War, the
              universe is in ruins due to the efforts of the Mad Titan, Thanos.
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos' actions and restore order to the
              universe once and for all, no matter what consequences may be in
              store."
          actors={["Robert Downey Jr.", "Chris Evans"]}
          rating="10"
        />
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
