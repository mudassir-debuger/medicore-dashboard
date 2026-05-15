import React from "react";

import "../Styles/appointmentCard.css";

function AppointmentsCard() {
  const appointments = [
    {
      time: "08:00 AM",
      name: "Fatima Al-Rashid",
      dept: "Cardiology · Dr. Malik",
      type: "Follow-up",
      status: "inprogress",
      statusText: "In Progress",
    },
    {
      time: "08:30 AM",
      name: "Ahmed Siddiqui",
      dept: "Orthopedics · Dr. Khan",
      type: "Consultation",
      status: "confirmed",
      statusText: "Confirmed",
    },
    {
      time: "09:00 AM",
      name: "Zara Hussain",
      dept: "Pediatrics · Dr. Noor",
      type: "Check-up",
      status: "confirmed",
      statusText: "Confirmed",
    },
    {
      time: "09:30 AM",
      name: "Omar Farooq",
      dept: "Neurology · Dr. Iqbal",
      type: "New Patient",
      status: "pending",
      statusText: "Pending",
    },
    {
      time: "10:00 AM",
      name: "Amna Bibi",
      dept: "Gynecology · Dr. Saeed",
      type: "Follow-up",
      status: "confirmed",
      statusText: "Confirmed",
    },
    {
      time: "10:30 AM",
      name: "Usman Tariq",
      dept: "Dermatology · Dr. Raza",
      type: "Consultation",
      status: "cancelled",
      statusText: "Cancelled",
    },
    {
      time: "11:00 AM",
      name: "Hira Qureshi",
      dept: "ENT · Dr. Bashir",
      type: "Follow-up",
      status: "pending",
      statusText: "Pending",
    },
  ];

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title">Today's Appointments</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button className="btn-sm">Filter</button>
          <button className="btn-sm">Export</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-row">
        <button className="tab active">All (48)</button>
        <button className="tab">Confirmed</button>
        <button className="tab">Pending</button>
        <button className="tab">Cancelled</button>
      </div>

      {/* List */}
      <div className="appt-list">
        {appointments.map((item, index) => (
          <div className="appt-row" key={index}>
            <div className="appt-time">
              {item.time.split(" ")[0]}
              <br />
              {item.time.split(" ")[1]}
            </div>

            <div>
              <div className="appt-name">{item.name}</div>
              <div className="appt-dept">{item.dept}</div>
            </div>

            <div className="doc-type">{item.type}</div>

            <div>
              <span className={`status-badge s-${item.status}`}>
                {item.statusText}
              </span>
            </div>

            <button className="btn-sm">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsCard;
