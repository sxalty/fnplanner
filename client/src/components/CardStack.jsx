// client/src/components/CardStack.jsx
import React, { useState } from "react";
import "./CardStack.css";

export default function CardStack() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card-stack ${isHovered ? "is-swapped" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive preview stack"
    >
      {/* Background Card */}
      <article className="preview-card card-two">
        <header className="card-header">
          <h2 className="card-title">Where</h2>
          <p className="card-subtitle">Find the best spots for everybody involved!</p>
        </header>
        <div className="media-slot">
          {/* Replace with a video when map is done when available */}
          <div className="media-placeholder">🗺️ Mode 2 Map Preview</div>
        </div>
      </article>

      {/* Foreground Card */}
      <article className="preview-card card-one">
        <header className="card-header">
          <h2 className="card-title">When</h2>
          <p className="card-subtitle">Find a date that works for everybody!</p>
        </header>
        <div className="media-slot">
          {/* Calendar Heatmap or Video */}
          <div className="media-placeholder">📅 Mode 1 Calendar Grid</div>
        </div>
      </article>
    </div>
  );
}