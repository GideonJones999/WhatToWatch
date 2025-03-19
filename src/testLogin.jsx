import React, { useEffect, useState } from "react";
import {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../service/userAPI";
import Profile from "./profile/profile";

export default function TestLogin({ onAuthChange, userPassed }) {
  console.log(userPassed);
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
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
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
      <div>
        <h3>Hello. This is a test page.</h3>

        {/* User Info */}
        {user ? (
          <div>
            <p>
              Logged in as: {user.userName} ({user.email})
            </p>
            <button onClick={handleGetCurrentUser}>Refresh User</button>
            <Profile user={user} refreshUser={handleGetCurrentUser} />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
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
              <button type="submit">Register</button>
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
              <button type="submit">Login</button>
            </form>

            {/* Get Current User Button */}
            <button onClick={handleGetCurrentUser}>Get Current User</button>
          </>
        )}

        {/* Error Display */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
}
