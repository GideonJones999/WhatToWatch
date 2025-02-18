import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./login/login";
import Rate from "./rate/rate";
import About from "./about/about";
import Home from "./home/home";
import Recommend from "./movie-rec/movie-rec";
import Profile from "./profile/profile";
import Group from "./group/group";
import Header from "./header/header";
import Footer from "./footer/footer";
import "./index.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  // const isLoggedIn = false; //Replace with Login Functionality pls

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/group"
          element={isLoggedIn ? <Group /> : <Navigate to="/login" />}
        />
        <Route
          path="/rate"
          element={isLoggedIn ? <Rate /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/recommend"
          element={isLoggedIn ? <Recommend /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile onLogout={() => setIsLoggedIn(false)} />
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
