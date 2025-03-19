import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthState } from "./login/authState";
import About from "./about/about";
import Home from "./home/home";
import Group from "./group/group";
import Header from "./header/header";
import Footer from "./footer/footer";
import "./index.css";
import MovieRecInfo from "./components/movie-rec-info";
import MovieRateSearch from "./components/movie-rate-search";
import TestLogin from "./testLogin";

export default function App() {
  const [user, setUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("Local userData: ", userData);
    return userData || null;
  });

  const [authState, setAuthState] = useState(
    user ? AuthState.Authenticated : AuthState.Unauthenticated
  );

  const handleAuthChange = (userData, authState) => {
    setAuthState(authState);
    setUser(userData);
    if (authState === AuthState.Authenticated) {
      // Save all user information to localStorage
      console.log("Setting User:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Clear user data from localStorage on logout
      localStorage.removeItem("user");
    }
  };

  return (
    <BrowserRouter>
      <Header />
      {authState === AuthState.Unauthenticated && <Navigate to="/profile" />}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/group" element={<Group user={user} />} />
        <Route path="/rate" element={<MovieRateSearch user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/recommend" element={<MovieRecInfo user={user} />} />
        <Route
          path="/profile"
          element={
            <TestLogin
              user={user}
              onAuthChange={handleAuthChange}
              onLogout={() => handleAuthChange(null, AuthState.Unauthenticated)}
            />
          }
        />
        <Route
          path="/test"
          element={<TestLogin onAuthChange={handleAuthChange} />}
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
