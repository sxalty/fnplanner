import React from "react";
import Navbar from "../components/navbar";
import "./frontpage.css";

export default function Frontpage() {
  const handleClose = () => {
    console.log("Navbar dismiss action clicked");
  };

  return (
    <div className="page-load-fade">
      {/* 1. Integrated Navigation Bar */}
      <Navbar onCloseMenu={handleClose} />

      {/* 2. Main Hero Grid */}
      <main className="hero-container">
        {/* Left Column: Brand Headline & Primary CTA */}
        <section className="hero-left">
          <div className="hero-text-block">
            <h1 className="hero-title">
              fnPlanner <span className="title-icons" aria-hidden="true"></span>
            </h1>
            <p className="hero-tagline">
              Plan the when and where for your next hangout!
            </p>
            <button type="button" className="cta-btn">
              Create or join a plan &rarr;
            </button>
          </div>
        </section>

        {/* Right Column: Preview Area (Ready for CardStack component) */}
        <section className="hero-right">
          <div className="preview-placeholder-frame">
            <p className="placeholder-text">Feature Preview Area</p>
          </div>
        </section>
      </main>
    </div>
  );
}