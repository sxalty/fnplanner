// client/src/components/calendar/CalendarHeader.jsx
import React, { useState } from "react";
import "./CalendarHeader.css";

/**
 * CalendarHeader Component
 *
 * @param {string} planName - Title of the hangout plan (e.g., "Plan name")
 * @param {string} planId - Unique room/invite code (e.g., "6767cock")[cite: 8]
 * @param {boolean} isSelecting - Whether edit mode is currently enabled
 * @param {Function} onToggleAvailabilityMode - Triggers the availability selection mode[cite: 8]
 * @param {Function} onShare - Optional handler for custom share flow / invite modal[cite: 4, 8]
 */
export default function CalendarHeader({
  planName = "Plan name",
  planId = "6767cock",
  isSelecting = false,
  onToggleAvailabilityMode,
  onShare,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(`#${planId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room code:", err);
    }
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare();
      return;
    }
    // Fallback native web share if supported
    if (navigator.share) {
      navigator.share({
        title: planName,
        text: `Join our hangout plan on fnPlanner! Room: #${planId}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyCode();
    }
  };

  return (
    <header className="calendar-header-container">
      {/* Left Column: Plan Title & Copyable Room Code[cite: 8] */}
      <div className="plan-meta-info">
        <h1 className="plan-title">{planName}</h1>
        <div className="plan-id-badge">
          <span className="plan-id-text">#{planId}</span>
          <button
            type="button"
            className="copy-id-btn"
            onClick={handleCopyCode}
            aria-label="Copy plan code"
            title="Copy code"
          >
            {copied ? (
              <span className="copy-feedback">Copied!</span>
            ) : (
              <svg
                className="copy-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Share & Primary Availability CTA[cite: 8] */}
      <div className="calendar-header-actions">
        {/* Share Button[cite: 8] */}
        <button
          type="button"
          className="header-share-btn"
          onClick={handleShareClick}
          aria-label="Share plan"
          title="Share plan link"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>

        {/* Primary CTA Button matching the mockup[cite: 8] */}
        <button
          type="button"
          className={`availability-cta-btn ${isSelecting ? "is-active" : ""}`}
          onClick={onToggleAvailabilityMode}
        >
          {isSelecting ? "Done picking dates" : "Add your availabilty"}
        </button>
      </div>
    </header>
  );
}