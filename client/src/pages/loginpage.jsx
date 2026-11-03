import React, { useState } from "react";
import "./loginpage.css"; 

/**
 * LoginPage Component (Standalone Frontend Mode)
 */
export default function LoginPage({ onNavigateHome, onNavigateSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    // Mock without backend yet
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in locally (Mock):", { email });
      if (onLoginSuccess) {
        onLoginSuccess({ email });
      }
    }, 600);
  };

  return (
    <div className="login-page-container page-load-fade">
      {/* Top Bar with Home Button */}
      <header className="login-top-bar">
        <a
          href="/"
          className="login-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome?.();
          }}
        >
          <span className="brand-avatar" role="img" aria-label="logo">
            🏃
          </span>
          <span className="brand-name">fnPlanner</span>
        </a>

        <button
          type="button"
          className="home-nav-btn"
          onClick={onNavigateHome || (() => (window.location.href = "/"))}
          aria-label="Back to home"
        >
          <span className="home-icon" aria-hidden="true">
            🏠
          </span>
          <span>Home</span>
        </button>
      </header>

      {/* Centered Login Card */}
      <main className="login-card-wrapper">
        <div className="login-card">
          <header className="login-card-header">
            <h1 className="login-title">Welcome back!</h1>
            <p className="login-subtitle">
              Log in to your <span className="brand-highlight">fnPlanner</span> account
            </p>
          </header>

          {/* Error Banner */}
          {errorMessage && (
            <div className="login-error-banner" role="alert">
              <svg
                className="error-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="business@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input password-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="forgot-password-row">
              <span className="forgot-prompt">Forgot your password?</span>{" "}
              <button
                type="button"
                className="reset-link-btn"
                onClick={() => console.log("Password reset modal triggered")}
              >
                Reset
              </button>
            </div>

            <button
              type="submit"
              className="submit-login-btn"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span className="divider-line"></span>
            <span className="divider-text">New to fnPlanner?</span>
            <span className="divider-line"></span>
          </div>

          {/* Sign up Link Button */}
          <button
            type="button"
            className="secondary-signup-btn"
            onClick={onNavigateSignUp || (() => console.log("Navigate to sign up"))}
          >
            Sign up
          </button>
        </div>
      </main>
    </div>
  );
}