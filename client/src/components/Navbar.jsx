import React from "react";
import "./navbar.css";

/**###################################
 * Navbar Component
 * 
 * @param {Function} onLoginClick - Triggered when the user clicks the Login button[cite: 9]
 * @param {Function} onCloseMenu - Contextual close/dismiss handler[cite: 1, 7]
 #####################################*/
export default function Navbar({ onLoginClick, onCloseMenu }) {
  return (
    <header className="navbar">
      {/* Brand Anchor */}
      <a href="/" className="nav-brand">
        <span className="brand-avatar" role="img" aria-label="fnPlanner icon">
          📆
        </span>
        <span className="brand-name">fnPlanner</span>
      </a>

      {/* Navigation Cluster */}
      <nav className="nav-actions">
        <a href="#about" className="nav-item">
          About
        </a>
        <a
          href="https://github.com/sxalty/fnplanner"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          Github
        </a>

        {/* Login Button */}
        <button
          type="button"
          className="nav-login-btn"
          onClick={onLoginClick || (() => console.log("Login clicked"))}
        >
          <span className="login-icon" aria-hidden="true">👤</span>
          <span>Login</span>
        </button>

        {/* Dismiss / Close Icon */}
        {onCloseMenu && (
          <button
            type="button"
            className="nav-icon-btn close-btn"
            aria-label="Close menu"
            onClick={onCloseMenu}
          >
            ✕
          </button>
        )}
      </nav>
    </header>
  );
}