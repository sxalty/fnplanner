import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ onCloseMenu }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    setCurrentLang(code);
    setIsLangOpen(false);
    // Future link: connect to an i18n localization provider here
  };

  return (
    <header className="navbar">
      {/* Brand / Logo */}
      <a href="/" className="nav-brand">
        {/* Placeholder avatar; replace src with your asset path when ready */}
        <span className="brand-avatar" role="img" aria-label="logo">
          🏃
        </span>
        <span className="brand-name">fnPlanner</span>
      </a>

      {/* Navigation Links and Action Controls */}
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
        <a href="#contacts" className="nav-item">
          Contacts
        </a>

        {/* Language Selector Dropdown Container */}
        <div className="language-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`nav-icon-btn language-selector ${isLangOpen ? "active" : ""}`}
            onClick={() => setIsLangOpen(!isLangOpen)}
            aria-expanded={isLangOpen}
            aria-haspopup="true"
            aria-label="Change language"
          >
            🌐 <span className="lang-label">{currentLang}</span>
            <span className="arrow-down">▾</span>
          </button>

          {isLangOpen && (
            <ul className="language-menu" role="menu">
              <li role="menuitem">
                <button type="button" onClick={() => handleSelectLanguage("EN")}>
                  English
                </button>
              </li>
              <li role="menuitem">
                <button type="button" onClick={() => handleSelectLanguage("ES")}>
                  Español
                </button>
              </li>
              <li role="menuitem">
                <button type="button" onClick={() => handleSelectLanguage("JA")}>
                  日本語
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Close / Dismiss Action */}
        <button
          type="button"
          className="nav-icon-btn close-btn"
          aria-label="Close menu"
          onClick={onCloseMenu}
        >
          ✕
        </button>
      </nav>
    </header>
  );
}