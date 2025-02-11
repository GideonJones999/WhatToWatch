import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <nav id="top-nav">
        <NavLink className="box-shadow-link" to="/about">
          About
        </NavLink>
        <NavLink className="nav-logo-container" to="">
          <img
            className="nav-logo"
            src="/MoviePickLogo-NoBkgnd.png"
            alt="moviePickLogo"
          />
        </NavLink>
        <NavLink className="box-shadow-link" to="/profile">
          Profile
        </NavLink>
      </nav>
    </header>
  );
}
