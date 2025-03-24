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
import Login from "./login/login.jsx";
import { getCurrentUser } from "../service/userAPI";
import Loading from "./components/loading/loading";

export default function App() {
  const [user, setUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    console.log("Global User Updated");
    return userData || null;
  });

  const [authState, setAuthState] = useState(
    user ? AuthState.Authenticated : AuthState.Unauthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setAuthState(AuthState.Authenticated);
          localStorage.setItem("user", JSON.stringify(currentUser)); // Store user data
        } else {
          setAuthState(AuthState.Unauthenticated);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        setAuthState(AuthState.Unauthenticated); // Handle any fetch errors
      } finally {
        setLoading(false); // Set loading to false once fetch completes
      }
    };

    if (user) {
      handleGetCurrentUser();
    } else {
      setLoading(false); // If no user in localStorage, just finish loading
    }
  }, [user]); // Only run once on mount

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

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Header />
      {authState === AuthState.Unauthenticated && <Navigate to="/profile" />}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/group" element={<Group user={user} />} />
        <Route
          path="/rate"
          element={<MovieRateSearch user={user} setUser={setUser} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/recommend" element={<MovieRecInfo user={user} />} />
        <Route
          path="/profile"
          element={
            <Login
              user={user}
              onAuthChange={handleAuthChange}
              onLogout={() => handleAuthChange(null, AuthState.Unauthenticated)}
            />
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
