import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { getUserData, setUserData } from "../util";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const profile = getUserData();

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const editProfile = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const saveProfile = () => {
    setUserData(
      tempProfile.userName,
      tempProfile.userRating,
      tempProfile.userServices,
      tempProfile.userGenres,
      tempProfile.userPicture
    );
    setIsEditing(false);
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
          <h3 className="profile-name">{profile.userName}</h3>
          <h4 className="profile-preferred-rating">
            Preferred Rating: {profile.userRating}
          </h4>
          <h4 className="profile-services-header">Streaming Services:</h4>
          <ul className="profile-services">
            {profile.userServices.map((service, index) => (
              <li key={index} className="profile-service">
                {service}
              </li>
            ))}
          </ul>
          <h4 className="profile-preferred-genres">Preferred Genres:</h4>
          <ul className="profile-genres">
            {profile.userGenres.map((genre, index) => (
              <li key={index} className="profile-genre">
                {genre}
              </li>
            ))}
          </ul>
          <a className="button-link" onClick={editProfile}>
            <button id="edit-profile">Edit Profile</button>
          </a>
          <a className="button-link" onClick={handleLogout} id="logout-button">
            <button>Log Out</button>
          </a>
        </div>
      </div>

      {/* Edit Modal */}

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Profile</h2>
            <label>Name: </label>
            <input
              type="text"
              value={tempProfile.userName}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, userName: e.target.value })
              }
            />
            <label>Preferred Rating: </label>
            <select
              value={tempProfile.userRating}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, userRating: e.target.value })
              }
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
            </select>

            <label>Streaming Services:</label>
            <input
              type="text"
              value={tempProfile.userServices.join(", ")}
              onChange={(e) =>
                setTempProfile({
                  ...tempProfile,
                  userServices: e.target.value.split(", "),
                })
              }
            />

            <label>Preferred Genres:</label>
            <input
              type="text"
              value={tempProfile.userGenres.join(", ")}
              onChange={(e) =>
                setTempProfile({
                  ...tempProfile,
                  userGenres: e.target.value.split(", "),
                })
              }
            />

            <button onClick={saveProfile}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}
