import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevents page reload
    if (username === "admin" && password === "password") {
      onLogin();
      navigate("/"); // Redirect to home
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-header">Login</h2>
          {error && <p className="error-text">{error}</p>}
          <div className="login-enter">
            <label className="user-lable">Username</label>
            <input
              type="text"
              className="user-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-enter">
            <label className="pass-label">Password</label>
            <input
              type="password"
              className="pass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-link">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
