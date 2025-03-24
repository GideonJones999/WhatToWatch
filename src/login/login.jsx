import React, { useEffect, useState } from "react";
import { createUser, loginUser, getCurrentUser, logoutUser } from "../userAPI";
import Profile from "../profile/profile";
import "./login.css";

export default function Login({ onAuthChange, userPassed }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Form State
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    userName: "",
    userMaxRating: "PG-13",
    userRating: ["G", "PG", "PG-13"],
    userServices: ["Netflix"],
    userGenres: ["Action"],
    userNotInterested: [],
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(userPassed);
    handleGetCurrentUser();
  }, []);

  // Handle Form Changes
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // API Calls
  const handleCreateUser = async (e) => {
    console.log("\n\nCreating User:");
    e.preventDefault();
    try {
      const createdUser = await createUser(registerData);
      setUser(createdUser);
      setError(null);
      console.log("User created:", createdUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    console.log("\n\nLogging in User:");
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(loginData.email, loginData.password);
      setUser(loggedInUser);
      setError(null);
      onAuthChange(loggedInUser, "Authenticated");
      console.log("Logged in user:", loggedInUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetCurrentUser = async () => {
    console.log("\n\nGetting User:");
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setError(null);
      onAuthChange(currentUser, "Authenticated");
      console.log("Current user:", currentUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    console.log("\n\nLogging out User:");
    try {
      await logoutUser();
      setUser(null);
      setError(null);
      onAuthChange(null, "Unauthenticated");
      console.log("User logged out");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <div className="login-container">
        {user ? (
          <div className="profile-container">
            <Profile user={user} refreshUser={handleGetCurrentUser} />
            <button
              className="button-link"
              id="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="login-enter">
            {/* Register Form */}
            <h4>Create User</h4>
            <form onSubmit={handleCreateUser}>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                value={registerData.userName}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
              <button type="submit" className="button-link">
                Register
              </button>
            </form>

            {/* Login Form */}
            <h4>Login</h4>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="button-link">
                Login
              </button>
            </form>

            {/* Get Current User Button
            <button onClick={handleGetCurrentUser}>Get Current User</button> */}
          </div>
        )}

        {/* Error Display */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
}
