import React, { useState, useEffect } from "react";
import "./profile.css";
import { updateUser, getCurrentUser } from "../userAPI";
import Loading from "../components/loading/loading";

export default function Profile({ user, refreshUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = user;
  const [tempProfile, setTempProfile] = useState({ ...profile });

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
      refreshUser();
    } catch (err) {
      console.error("Error updating user:", err);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    console.log(profile);
    if (!user) {
      console.log("No user, refreshing");
      refreshUser(); // Fetch user data when the Profile page loads
    }
  }, []);

  const handleServiceChange = (e, service) => {
    const updatedServices = e.target.checked
      ? [...tempProfile.userServices, service]
      : tempProfile.userServices.filter((s) => s !== service);

    setTempProfile({
      ...tempProfile,
      userServices: updatedServices,
    });
  };

  if (!user) return <Loading />;

  return (
    <>
      <h1>Profile</h1>
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
        </ul>{" "}
        <h4 className="profile-preferred-genres">Preferred Genres:</h4>
        <ul className="profile-genres">
          {profile.userGenres.map((genre, index) => (
            <li key={index} className="profile-genre">
              {genre}
            </li>
          ))}
        </ul>
        <button className="button-link" onClick={editProfile} id="edit-profile">
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Profile</h2>
            <form>
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
              <div className="dropdown-checkboxes">
                {[
                  "Netflix",
                  "Hulu",
                  "Disney+",
                  "Amazon Prime Video",
                  "Max",
                  "Apple TV+",
                  "fuboTV",
                  "Peacock",
                  "Paramount Plus",
                  "The Roku Channel",
                  "Fandango At Home",
                  "Starz",
                  "Tubi",
                  "Microsoft Store",
                ].map((service) => (
                  <div key={service} className="dropdown-checkbox">
                    <input
                      type="checkbox"
                      id={service}
                      value={service}
                      checked={tempProfile.userServices.includes(service)}
                      onChange={(e) => handleServiceChange(e, service)}
                    />
                    <label htmlFor={service}>{service}</label>
                  </div>
                ))}
              </div>

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
            </form>
            <button onClick={saveProfile} className="button-link">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="button-link">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
