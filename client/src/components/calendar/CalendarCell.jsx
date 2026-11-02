import React from "react";
import "./CalendarCell.css";

/**
 * CalendarCell Component
 *
 * @param {number|null} day - Day number (e.g. 1..31) or null if outside current month
 * @param {boolean} isOutOfMonth - Whether the slot is outside the active month[cite: 14]
 * @param {number} availableCount - Count of members free on this date[cite: 14]
 * @param {number} totalMembers - Total participants for density scaling[cite: 14]
 * @param {boolean} isUserSelected - Active selection state for current user[cite: 14]
 * @param {boolean} isSelecting - Whether edit mode is currently enabled[cite: 14]
 * @param {Function} onToggle - Callback to toggle current user availability
 */
export default function CalendarCell({
  day,
  isOutOfMonth = false,
  availableCount = 0,
  totalMembers = 1,
  isUserSelected = false,
  isSelecting = false,
  onToggle,
}) {
  if (isOutOfMonth) {
    return (
      <div className="calendar-cell cell-out-of-bounds" aria-hidden="true">
        <div className="diagonal-strike" />
      </div>
    );
  }

  // Calculate heat tier based on group availability density[cite: 9, 14]
  const ratio = totalMembers > 0 ? availableCount / totalMembers : 0;
  let heatClass = "heat-empty";
  if (ratio > 0.75) {
    heatClass = "heat-dark"; // Max overlap (e.g., Dec 8, 9)[cite: 9, 14]
  } else if (ratio > 0.4) {
    heatClass = "heat-med";
  } else if (ratio > 0) {
    heatClass = "heat-light";
  }

  return (
    <div
      role="button"
      tabIndex={isSelecting ? 0 : -1}
      className={`calendar-cell ${heatClass} ${isUserSelected ? "user-marked" : ""} ${
        isSelecting ? "is-paintable" : ""
      }`}
      onClick={() => isSelecting && onToggle && onToggle(day)}
      onKeyDown={(e) => {
        if (isSelecting && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onToggle && onToggle(day);
        }
      }}
      aria-label={
        day
          ? `Day ${day}, ${availableCount} of ${totalMembers} free${
              isUserSelected ? ", you are available" : ""
            }`
          : ""
      }
    >
      <span className="cell-day-number">{day}</span>

      {/* Visual indicator showing the active user marked this date */}
      {isUserSelected && <span className="selection-badge">✓</span>}
    </div>
  );
}