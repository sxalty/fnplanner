import React from "react";
import Navbar from "../components/navbar";
import CardStack from "../components/CardStack";
import "./frontpage.css";

export default function Frontpage() {
  const handleClose = () => {
    console.log("Navbar dismiss action clicked");
  };

  return (
    <div className="page-load-fade">
      {/* 1. Persistent Top Navigation Bar */}
      <Navbar onCloseMenu={handleClose} />

      {/* 2. Hero Section */}
      <main className="hero-container">
        {/* Left Column: Brand Pitch & CTA */}
        <section className="hero-left">
          <div className="hero-text-block">
            <h1 className="hero-title">
              fnPlanner <span className="title-icons" aria-hidden="true">🗓️📍</span>
            </h1>
            <p className="hero-tagline">
              Plan the when and where for your next hangout!
            </p>
            <button type="button" className="cta-btn">
              Create or join a plan &rarr;
            </button>
          </div>
        </section>

        {/* Right Column: Interactive Card Stack Preview */}
        <section className="hero-right">
          <CardStack />
        </section>
      </main>
    </div>
  );
}