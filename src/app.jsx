import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthState } from "./login/authState";
import Login from "./login/login";
import About from "./about/about";
import Home from "./home/home";
import Profile from "./profile/profile";
import Group from "./group/group";
import Header from "./header/header";
import Footer from "./footer/footer";
import "./index.css";
import MovieRateInfo from "./components/movie-rate-info";
import MovieRecInfo from "./components/movie-rec-info";
import MovieRateSearch from "./components/movie-rate-search";

export default function App() {
  const [user, setUser] = React.useState(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData || null;
  });
  const currentAuthState = user
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const handleAuthChange = (userData, authState) => {
    setAuthState(authState);
    setUser(userData);
    if (authState === AuthState.Authenticated) {
      // Save all user information to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Clear user data from localStorage on logout
      localStorage.removeItem("user");
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            authState === AuthState.Authenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              authState={authState}
              onAuthChange={handleAuthChange}
            />
          }
        />
        <Route
          path="/group"
          element={
            authState === AuthState.Authenticated ? (
              <Group />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rate"
          element={
            authState === AuthState.Authenticated ? (
              <MovieRateSearch />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/recommend"
          element={
            authState === AuthState.Authenticated ? (
              <MovieRecInfo />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authState === AuthState.Authenticated ? (
              <Profile
                onLogout={() =>
                  handleAuthChange(null, AuthState.Unauthenticated)
                }
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
