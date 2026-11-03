// client/src/pages/frontpage.jsx
import React, { useState } from "react";
import Navbar from "../components/navbar";
import CardStack from "../components/CardStack";
import PlanModal from "../components/PlanModal";
import "./frontpage.css";

export default function Frontpage({ onLoginClick }) {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handlePlanSubmit = (formData) => {
    console.log("Plan submitted:", formData);
    setIsPlanModalOpen(false);
  };

  return (
    <div className="page-load-fade">
      {/* 1. Global Navigation Bar receives the login trigger */}
      <Navbar onLoginClick={onLoginClick} />

      {/* 2. Main Hero Section */}
      <main className="hero-container">
        <div className="doodle doodle-top-right" aria-hidden="true">
          <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 25C40 5 80 40 120 15C150 -5 180 30 195 20"
              stroke="#0D1B2A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <section className="hero-left">
          <div className="hero-text-block">
            <h1 className="hero-title">
              fnPlanner <span className="title-icons" aria-hidden="true"></span>
            </h1>
            <p className="hero-tagline">
              Plan the when and where for your next hangout!
            </p>
            <button
              type="button"
              className="cta-btn"
              onClick={() => setIsPlanModalOpen(true)}
            >
              Create or join a plan &rarr;
            </button>
          </div>

          <div className="doodle doodle-bottom-left" aria-hidden="true">
            <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 15C45 35 85 5 125 25C155 40 185 10 195 20"
                stroke="#0D1B2A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section className="hero-right">
          <CardStack />
        </section>
      </main>

      {/* 3. Modal Dialog */}
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSubmitPlan={handlePlanSubmit}
      />
    </div>
  );
}