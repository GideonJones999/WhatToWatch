import React from "react";
import "./rate.css";

export default function Rate() {
  return (
    <main>
      <h1>Rate</h1>
      <div class="movie-last-watched">
        <img
          class="last-watched-poster"
          src="https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
        />
        <div class="last-watched-info">
          <h3 class="last-watched-name">Avengers: Endgame</h3>
          <h5 class="last-watched-tag">Avenge the fallen.</h5>
          <p class="last-watched-description">
            After the devastating events of Avengers: Infinity War, the universe
            is in ruins due to the efforts of the Mad Titan, Thanos. With the
            help of remaining allies, the Avengers must assemble once more in
            order to undo Thanos' actions and restore order to the universe once
            and for all, no matter what consequences may be in store.
          </p>
          <h4 class="last-watched-featuring">Featuring:</h4>
          <ul class="last-watched-actors">
            <li class="last-watched-actor">Robert Downey Jr.</li>
            <li class="last-watched-actor">Chris Evans</li>
          </ul>
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
      </div>
    </main>
  );
}
