import React from "react";
import "./profile.css";

export default function Profile() {
  return (
    <main>
      <h1>Profile</h1>

      <div class="profile-container">
        <img class="profile-pic" src="/temporary-profile-placeholder-1.jpg" />
        <div class="profile-info">
          <h3 class="profile-name">Profile Name</h3>
          <h4 class="profile-preferred-rating">Preferred Rating: PG-13</h4>
          <h4 class="profile-services-header">Streaming Services:</h4>
          <ul class="profile-services">
            <li class="profile-service">Disney+</li>
            <li class="profile-service">Max</li>
            <li class="profile-service">Netflix</li>
          </ul>
          <h4 class="profile-preferred-genres">Preferred Genres:</h4>
          <ul class="profile-genres">
            <li class="profile-genre">Action</li>
            <li class="profile-genre">Romance</li>
            <li class="profile-genre">Comedy</li>
          </ul>
          <a class="button-link" href="">
            <button id="edit-profile">Edit Profile</button>
          </a>
        </div>
      </div>
    </main>
  );
}
