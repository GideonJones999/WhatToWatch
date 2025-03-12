import React from "react";
import { NavLink } from "react-router-dom";

import "./group.css";

export default function Group() {
  return (
    <main>
      <h1>Group</h1>
      <div className="group-container">
        <h3>Group Members:</h3>
        <ul>
          <li>
            <h4>Person 1</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 2</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 3</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 4</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 5</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 6</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 7</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 8</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 9</h4>
            <a href="#">Remove</a>
          </li>
          <li>
            <h4>Person 10</h4>
            <a href="#">Remove</a>
          </li>
        </ul>
        <a id="share-group" className="button-link">
          {" "}
          <button>Share</button>{" "}
        </a>
        <NavLink className="button-link" to="/recommend">
          <button id="group-get-rec">Get your Group Recommendation</button>
        </NavLink>
      </div>
    </main>
  );
}
