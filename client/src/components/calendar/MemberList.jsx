// client/src/components/calendar/MemberList.jsx
import React from "react";
import "./MemberList.css";

/**
 * MemberList Component
 *
 * @param {Array} members - List of member objects: [{ id, name, availableDates }]
 * @param {number} totalCapacity - Denominator for total headcount (defaults to members.length)
 * @param {string|null} selectedMemberId - Active member ID if filtering by single user
 * @param {Function} onSelectMember - Callback triggered when clicking a member to highlight their dates
 */
export default function MemberList({
  members = [],
  totalCapacity,
  selectedMemberId = null,
  onSelectMember,
}) {
  const currentCount = members.length;
  const capacity = totalCapacity ?? currentCount;

  return (
    <aside className="member-list-panel" aria-label="Hangout members">
      {/* Header showing: Members(6/6)[cite: 1] */}
      <h3 className="member-list-heading">
        Members({currentCount}/{capacity})
      </h3>

      <ol className="member-ordered-list">
        {members.map((member, index) => {
          const isSelected = selectedMemberId === member.id;
          const hasSubmitted = Boolean(
            member.availableDates && member.availableDates.length > 0
          );

          return (
            <li
              key={member.id || index}
              className={`member-item ${isSelected ? "is-active" : ""}`}
              onClick={() => onSelectMember && onSelectMember(member.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectMember && onSelectMember(member.id);
                }
              }}
              title={
                hasSubmitted
                  ? `${member.name} (${member.availableDates.length} days marked)`
                  : `${member.name} (no availability added yet)`
              }
            >
              {/* Number prefix: "1. ", "2. ", etc.[cite: 1] */}
              <span className="member-index">{index + 1}.</span>
              <span className="member-name">{member.name}</span>

              {/* Status indicator: checkmark if they submitted, dot if pending */}
              <span
                className={`member-status-indicator ${
                  hasSubmitted ? "status-ready" : "status-pending"
                }`}
                aria-hidden="true"
              >
                {hasSubmitted ? "✓" : "•"}
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}