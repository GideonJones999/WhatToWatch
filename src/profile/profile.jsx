import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { getUserData, setUserData } from "../util";
import { updateUser } from "../../service/userAPI";

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const profile = user;
  console.log(profile);

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const editProfile = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const saveProfile = async () => {
    const updatedUser = {
      ...profile,
      userName: tempProfile.userName,
      userMaxRating: tempProfile.userMaxRating,
      userServices: tempProfile.userServices,
      userGenres: tempProfile.userGenres,
    };
    try {
      const response = await updateUser(updatedUser);
      console.log("User Updated Successfully:", response);
    } catch (err) {
      console.error("Error updating user:", error);
    }
    setIsEditing(false);
  };

  return (
    <>
      <h1>Profile</h1>

      <div className="profile-container">
        <div className="profile-info">
          <h3 className="profile-name">{profile.userName}</h3>
          <h4 className="profile-preferred-rating">
            Preferred Rating: {profile.userMaxRating}
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
          {/* <a className="button-link" onClick={handleLogout} id="logout-button">
            <button>Log Out</button>
          </a> */}
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
              value={tempProfile.userMaxRating}
              onChange={(e) =>
                setTempProfile({
                  ...tempProfile,
                  userMaxRating: e.target.value,
                })
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
    </>
  );
}
