import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../profile/profile";

// import Button from 'react-bootstrap/Button';

// import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("userName");
        props.onLogout();
      });
  }

  return (
    <div>
      <Profile user={props.user} />
      <button variant="secondary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
