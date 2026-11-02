// client/src/components/calendar/CalendarGrid.jsx
import React, { useState, useMemo } from "react";
import CalendarCell from "./CalendarCell";
import "./CalendarGrid.css";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Example initial participant data matching wireframe mockup[cite: 14]
 */
const DEFAULT_MEMBERS = [
  { id: "m1", name: "Lam", availableDays: [8, 9, 15, 16] },
  { id: "m2", name: "Lana Rhoades", availableDays: [1, 2, 8, 9, 22] },
  { id: "m3", name: "Sydney Sweeney", availableDays: [8, 9, 10, 15] },
  { id: "m4", name: "Maddison Bear", availableDays: [3, 4, 8, 9, 24] },
  { id: "m5", name: "Lebron", availableDays: [8, 9, 16, 23, 24] },
  { id: "m6", name: "Cock", availableDays: [8, 9, 17, 30] },
];

export default function CalendarGrid({
  currentMonthName = "December", //[cite: 14]
  year = 2026,
  monthIndex = 11, // 0-indexed: 11 = December
  initialMembers = DEFAULT_MEMBERS,
  isEditingAvailability = false, // Controlled by "Add your availability" CTA[cite: 14]
  onSaveAvailability,
}) {
  const [members] = useState(initialMembers);
  // Current user's selected days for this month
  const [userSelectedDays, setUserSelectedDays] = useState([8, 9]);

  // Toggle single date availability for active user
  const handleToggleDay = (day) => {
    setUserSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Calendar matrix calculation: leading blanks, active days, trailing blanks
  const calendarSlots = useMemo(() => {
    // 0 = Sunday, 1 = Monday ... convert to Monday-first (0 = Monday, 6 = Sunday)
    const firstDayIndex = new Date(year, monthIndex, 1).getDay();
    const leadingBlanks = (firstDayIndex + 6) % 7; 
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const slots = [];

    // Leading out-of-month slots[cite: 14]
    for (let i = 0; i < leadingBlanks; i++) {
      slots.push({ id: `pre-${i}`, day: null, isOutOfMonth: true });
    }

    // Active calendar days[cite: 14]
    for (let d = 1; d <= daysInMonth; d++) {
      slots.push({ id: `day-${d}`, day: d, isOutOfMonth: false });
    }

    // Trailing out-of-month slots to finish 7-column grid[cite: 14]
    const remainder = slots.length % 7;
    if (remainder !== 0) {
      const trailingCount = 7 - remainder;
      for (let j = 0; j < trailingCount; j++) {
        slots.push({ id: `post-${j}`, day: null, isOutOfMonth: true });
      }
    }

    return slots;
  }, [year, monthIndex]);

  // Aggregate member counts per day + find highest overlapping dates[cite: 14]
  const { availabilityMap, bestDays } = useMemo(() => {
    const counts = {};

    members.forEach((member) => {
      member.availableDays?.forEach((day) => {
        counts[day] = (counts[day] || 0) + 1;
      });
    });

    // Determine max available count to recommend "Best day(s)"[cite: 14]
    let maxCount = 0;
    Object.entries(counts).forEach(([_, count]) => {
      if (count > maxCount) maxCount = count;
    });

    const best = Object.keys(counts)
      .filter((day) => counts[day] === maxCount && maxCount > 1)
      .map(Number)
      .sort((a, b) => a - b);

    return { availabilityMap: counts, bestDays: best };
  }, [members]);

  return (
    <section className="calendar-board-container">
      {/* Overview & Insights Bar[cite: 14] */}
      <div className="calendar-summary-bar">
        <span className="summary-month-label">
          Month: <strong>{currentMonthName}</strong>
        </span>

        <span className="summary-best-days">
          Best day(s):{" "}
          <strong>
            {bestDays.length > 0
              ? `${currentMonthName.slice(0, 3)} ${bestDays.join(", ")}`
              : "Pending schedules"}
          </strong>
        </span>
      </div>

      {/* Grid with Left Nav Arrow[cite: 14] */}
      <div className="calendar-board-layout">
        <button
          type="button"
          className="month-nav-arrow left-arrow"
          aria-label="Previous month"
        >
          &#9664;
        </button>

        <div className="calendar-grid-wrapper">
          {/* Day of Week Headers[cite: 14] */}
          <div className="calendar-week-header">
            {DAYS_OF_WEEK.map((weekday) => (
              <div key={weekday} className="header-cell">
                {weekday}
              </div>
            ))}
          </div>

          {/* Heatmap Grid Cells[cite: 14] */}
          <div className="calendar-cells-grid">
            {calendarSlots.map((slot) => {
              if (slot.isOutOfMonth) {
                return (
                  <CalendarCell
                    key={slot.id}
                    isOutOfMonth={true}
                  />
                );
              }

              const count = availabilityMap[slot.day] || 0;
              const isSelected = userSelectedDays.includes(slot.day);

              return (
                <CalendarCell
                  key={slot.id}
                  day={slot.day}
                  availableCount={count}
                  totalMembers={members.length}
                  isUserSelected={isSelected}
                  isSelecting={isEditingAvailability}
                  onToggle={handleToggleDay}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}