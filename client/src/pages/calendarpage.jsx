// client/src/pages/CalendarPage.jsx
import React, { useState } from "react";
import Navbar from "../components/navbar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import MemberList from "../components/calendar/MemberList";
import "./CalendarPage.css";

const INITIAL_MEMBERS = [
  { id: "m1", name: "Lam", availableDates: ["2026-12-08", "2026-12-09"] },
  { id: "m2", name: "Lana Rhoades", availableDates: ["2026-12-01", "2026-12-02", "2026-12-08", "2026-12-09"] },
  { id: "m3", name: "Sydney Sweeney", availableDates: ["2026-12-08", "2026-12-09"] },
  { id: "m4", name: "Maddison Bear", availableDates: ["2026-12-03", "2026-12-04", "2026-12-08", "2026-12-09"] },
  { id: "m5", name: "Lebron", availableDates: ["2026-12-08", "2026-12-09", "2026-12-16"] },
  { id: "m6", name: "Cock", availableDates: ["2026-12-08", "2026-12-09", "2026-12-17"] },
];

export default function CalendarPage() {
  const [members] = useState(INITIAL_MEMBERS);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isSelectingAvailability, setIsSelectingAvailability] = useState(false);

  return (
    <div className="calendar-page-root">
      <Navbar />

      <main className="calendar-page-content">
        <CalendarHeader
          planName="Plan name"
          planId="6767cock"
          isSelecting={isSelectingAvailability}
          onToggleAvailabilityMode={() =>
            setIsSelectingAvailability((prev) => !prev)
          }
        />

        <div className="calendar-page-body">
          <CalendarGrid
            startDate="2026-12-01"
            endDate="2026-12-31"
            isEditingAvailability={isSelectingAvailability}
            initialMembers={
              selectedMemberId
                ? members.filter((m) => m.id === selectedMemberId)
                : members
            }
          />

          <MemberList
            members={members}
            totalCapacity={6}
            selectedMemberId={selectedMemberId}
            onSelectMember={(id) =>
              setSelectedMemberId((prev) => (prev === id ? null : id))
            }
          />
        </div>
      </main>
    </div>
  );
}