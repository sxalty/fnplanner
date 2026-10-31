import React, { useState } from "react";
import "./PlanModal.css";

/**
 * PlanModal Component
 *
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {Function} onClose - Closes the modal
 * @param {Function} onSubmitPlan - Receives { type, planName, startDate, endDate, dateRangeSummary, inviteCode }
 */
export default function PlanModal({ isOpen, onClose, onSubmitPlan }) {
  if (!isOpen) return null;

  // Form states
  const [planName, setPlanName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  
  // Date range states (defaults to a sample range like Oct 7 - Oct 20)
  const [startDate, setStartDate] = useState("2026-10-07");
  const [endDate, setEndDate] = useState("2026-10-20");
  const [dateSelectionType, setDateSelectionType] = useState("range"); // "range" | "flexible"
  const [errorMessage, setErrorMessage] = useState("");

  // Expands options as soon as the user types a plan name
  const isCreatingNew = planName.trim().length > 0;

  // Formats dates into human-readable text like "Oct. 7 – Oct. 20"
  const formatDateRangeDisplay = (startStr, endStr) => {
    if (!startStr && !endStr) return "Select dates";
    if (startStr && !endStr) return `From ${formatSingleDate(startStr)}`;
    if (!startStr && endStr) return `Until ${formatSingleDate(endStr)}`;

    const start = new Date(startStr + "T00:00:00");
    const end = new Date(endStr + "T00:00:00");

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const startDay = start.getDate();
    const endDay = end.getDate();

    if (startMonth === endMonth) {
      return `${startMonth}. ${startDay} – ${endDay}`;
    }
    return `${startMonth}. ${startDay} – ${endMonth}. ${endDay}`;
  };

  const formatSingleDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.toLocaleDateString("en-US", { month: "short" })}. ${d.getDate()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Joining with code
    if (inviteCode.trim() && !isCreatingNew) {
      if (onSubmitPlan) {
        onSubmitPlan({ type: "join", inviteCode: inviteCode.trim() });
      }
      return;
    }

    // Creating a new plan
    if (!planName.trim()) {
      setErrorMessage("Event name is required");
      return;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setErrorMessage("End date cannot be earlier than start date");
      return;
    }

    if (onSubmitPlan) {
      onSubmitPlan({
        type: "create",
        planName: planName.trim(),
        dateSelectionType,
        startDate,
        endDate,
        dateRangeSummary: formatDateRangeDisplay(startDate, endDate),
        inviteCode: inviteCode.trim() || null,
      });
    }
  };

  return (
    <div className="plan-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="plan-modal-card"
        onClick={(e) => e.stopPropagation() /* Prevent accidental backdrop clicks */}
      >
        {/* Header Bar */}
        <header className="plan-modal-header">
          <h2 className="plan-modal-title">
            {isCreatingNew ? "New event" : "Start Your Hangout Plan"}
          </h2>
          <button
            type="button"
            className="plan-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </header>

        {/* Subtitle when initial empty form */}
        {!isCreatingNew && (
          <p className="plan-modal-subtitle">
            Create a new hangout room to share with friends, or enter a room
            code to join an existing plan.
          </p>
        )}

        <form onSubmit={handleSubmit} className="plan-modal-form">
          {/* Section 1: Hangout Name Input */}
          <div className="form-group">
            <label className="input-label" htmlFor="planNameInput">
              {isCreatingNew ? "" : "Hangout Name"}
            </label>
            <input
              id="planNameInput"
              type="text"
              className={`text-input ${errorMessage && !planName ? "input-error" : ""}`}
              placeholder={isCreatingNew ? "Name your event..." : "e.g., Weekend trip"}
              value={planName}
              onChange={(e) => {
                setPlanName(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              autoFocus
            />
            {errorMessage && <span className="error-text">{errorMessage}</span>}
          </div>

          {/* DYNAMIC DATE RANGE SECTION (Appears once event name is entered) */}
          {isCreatingNew && (
            <div className="expanded-date-time-panel">
              {/* Type Switcher: Specific Range vs Flexible */}
              <div className="toggle-pill-group">
                <button
                  type="button"
                  className={`toggle-pill ${dateSelectionType === "range" ? "active" : ""}`}
                  onClick={() => setDateSelectionType("range")}
                >
                  Date range
                </button>
                <button
                  type="button"
                  className={`toggle-pill ${dateSelectionType === "flexible" ? "active" : ""}`}
                  onClick={() => setDateSelectionType("flexible")}
                >
                  Flexible dates
                </button>
              </div>

              {/* Range Preview Badge */}
              <div className="date-range-badge-row">
                <span className="sub-heading">Selected Window</span>
                <span className="date-range-badge">
                  📅 {formatDateRangeDisplay(startDate, endDate)}
                </span>
              </div>

              {/* Start & End Date Inputs */}
              <div className="date-range-inputs">
                <div className="date-field">
                  <label className="date-field-label" htmlFor="startDateInput">
                    Start date:
                  </label>
                  <input
                    id="startDateInput"
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="date-field">
                  <label className="date-field-label" htmlFor="endDateInput">
                    End date:
                  </label>
                  <input
                    id="endDateInput"
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <p className="hint-caption">
                Members will mark their free days within this window on the Mode 1 heatmap.
              </p>
            </div>
          )}

          {/* Section 2: Enter Invite Code (Stays underneath) */}
          <div className="form-group code-group">
            <label className="input-label" htmlFor="inviteCodeInput">
              Or Enter Invite Code
            </label>
            <input
              id="inviteCodeInput"
              type="text"
              className="text-input"
              placeholder="e.g., FN-8492"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              disabled={isCreatingNew}
            />
          </div>

          {/* Footer Actions */}
          <footer className="plan-modal-footer">
            <button
              type="button"
              className="modal-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`modal-btn-submit ${isCreatingNew || inviteCode.trim() ? "is-ready" : ""}`}
            >
              {isCreatingNew ? "Create event" : "Launch Planner"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}