import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Profile</h1>

      <div className="profile-container">
        <img
          className="profile-pic"
          src="/temporary-profile-placeholder-1.jpg"
        />
        <div className="profile-info">
          <h3 className="profile-name">Profile Name</h3>
          <h4 className="profile-preferred-rating">Preferred Rating: PG-13</h4>
          <h4 className="profile-services-header">Streaming Services:</h4>
          <ul className="profile-services">
            <li className="profile-service">Disney+</li>
            <li className="profile-service">Max</li>
            <li className="profile-service">Netflix</li>
          </ul>
          <h4 className="profile-preferred-genres">Preferred Genres:</h4>
          <ul className="profile-genres">
            <li className="profile-genre">Action</li>
            <li className="profile-genre">Romance</li>
            <li className="profile-genre">Comedy</li>
          </ul>
          <a className="button-link" href="">
            <button id="edit-profile">Edit Profile</button>
          </a>
          <a className="button-link" onClick={handleLogout} id="logout-button">
            <button>Log Out</button>
          </a>
        </div>
      </div>
    </main>
  );
}
