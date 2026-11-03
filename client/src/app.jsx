// client/src/App.jsx
import React, { useState } from "react";
import Frontpage from "./pages/frontpage";
import LoginPage from "./pages/loginpage"; // Ensure filename casing matches

export default function App() {
  const [currentPage, setCurrentPage] = useState("frontpage");

  return (
    <div className="app-root">
      {currentPage === "frontpage" && (
        <Frontpage onLoginClick={() => setCurrentPage("login")} />
      )}

      {/* This string ("login") MUST match what setCurrentPage passed above */}
      {currentPage === "login" && (
        <LoginPage
          onNavigateHome={() => setCurrentPage("frontpage")}
          onNavigateSignUp={() => setCurrentPage("signup")}
        />
      )}
    </div>
  );
}