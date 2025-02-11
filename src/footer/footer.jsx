import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <nav id="bottom-nav">
        <NavLink className="box-shadow-link" to="">
          <i className="fa-solid fa-house"></i>
        </NavLink>
        <NavLink className="box-shadow-link" to="/rate">
          <i className="fa-solid fa-thumbs-up"></i>
        </NavLink>
        <NavLink className="box-shadow-link" to="/group">
          <i className="fa-solid fa-user-group"></i>
        </NavLink>
        <NavLink className="box-shadow-link" to="/recommend">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </NavLink>
        <a
          className="box-shadow-link"
          href="https://github.com/GideonJones999/WhatToWatch/tree/react-branch"
          target="_blank"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </nav>
    </footer>
  );
}
