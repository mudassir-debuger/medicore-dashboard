import React, { useState } from "react";
import "../Styles/schedule.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SHIFTS = ["Morning", "Afternoon", "Evening", "Night"];
const SHIFT_TIMES = {
  Morning: "06:00 – 12:00",
  Afternoon: "12:00 – 18:00",
  Evening: "18:00 – 22:00",
  Night: "22:00 – 06:00",
};
const SHIFT_ICONS = {
  Morning: "🌅",
  Afternoon: "☀️",
  Evening: "🌆",
  Night: "🌙",
};

const DOCTORS = [
  { name: "Dr. Malik", specialty: "Cardiology", color: "#E53E3E" },
  { name: "Dr. Khan", specialty: "Orthopedics", color: "#2B6CB0" },
  { name: "Dr. Noor", specialty: "Pediatrics", color: "#38A169" },
  { name: "Dr. Iqbal", specialty: "Neurology", color: "#6B46C1" },
  { name: "Dr. Saeed", specialty: "Gynecology", color: "#D53F8C" },
  { name: "Dr. Amna", specialty: "Pediatrics", color: "#DD6B20" },
];

const ROOMS = [
  "OPD-1",
  "OPD-2",
  "OPD-3",
  "Ward A",
  "Ward B",
  "ICU",
  "Emergency",
];

const INITIAL_SLOTS = [
  {
    id: 1,
    day: "Monday",
    shift: "Morning",
    doctor: "Dr. Malik",
    specialty: "Cardiology",
    color: "#E53E3E",
    room: "OPD-1",
    status: "confirmed",
    notes: "Cardiac checkups",
  },
  {
    id: 2,
    day: "Monday",
    shift: "Afternoon",
    doctor: "Dr. Khan",
    specialty: "Orthopedics",
    color: "#2B6CB0",
    room: "OPD-2",
    status: "confirmed",
    notes: "Post-op reviews",
  },
  {
    id: 3,
    day: "Monday",
    shift: "Evening",
    doctor: "Dr. Noor",
    specialty: "Pediatrics",
    color: "#38A169",
    room: "OPD-3",
    status: "confirmed",
    notes: "Child consultations",
  },
  {
    id: 4,
    day: "Tuesday",
    shift: "Morning",
    doctor: "Dr. Iqbal",
    specialty: "Neurology",
    color: "#6B46C1",
    room: "Ward A",
    status: "confirmed",
    notes: "Neurology rounds",
  },
  {
    id: 5,
    day: "Tuesday",
    shift: "Night",
    doctor: "Dr. Saeed",
    specialty: "Gynecology",
    color: "#D53F8C",
    room: "Ward B",
    status: "on-call",
    notes: "On-call duty",
  },
  {
    id: 6,
    day: "Wednesday",
    shift: "Morning",
    doctor: "Dr. Malik",
    specialty: "Cardiology",
    color: "#E53E3E",
    room: "ICU",
    status: "confirmed",
    notes: "ICU rounds",
  },
  {
    id: 7,
    day: "Wednesday",
    shift: "Afternoon",
    doctor: "Dr. Amna",
    specialty: "Pediatrics",
    color: "#DD6B20",
    room: "OPD-3",
    status: "confirmed",
    notes: "Pediatric OPD",
  },
  {
    id: 8,
    day: "Thursday",
    shift: "Morning",
    doctor: "Dr. Khan",
    specialty: "Orthopedics",
    color: "#2B6CB0",
    room: "OPD-1",
    status: "confirmed",
    notes: "Fracture clinic",
  },
  {
    id: 9,
    day: "Thursday",
    shift: "Evening",
    doctor: "Dr. Iqbal",
    specialty: "Neurology",
    color: "#6B46C1",
    room: "Ward A",
    status: "leave",
    notes: "Dr. on leave",
  },
  {
    id: 10,
    day: "Friday",
    shift: "Morning",
    doctor: "Dr. Saeed",
    specialty: "Gynecology",
    color: "#D53F8C",
    room: "OPD-2",
    status: "confirmed",
    notes: "Antenatal clinic",
  },
  {
    id: 11,
    day: "Friday",
    shift: "Afternoon",
    doctor: "Dr. Noor",
    specialty: "Pediatrics",
    color: "#38A169",
    room: "OPD-3",
    status: "confirmed",
    notes: "Vaccination drive",
  },
  {
    id: 12,
    day: "Saturday",
    shift: "Morning",
    doctor: "Dr. Malik",
    specialty: "Cardiology",
    color: "#E53E3E",
    room: "Emergency",
    status: "on-call",
    notes: "Emergency cover",
  },
  {
    id: 13,
    day: "Saturday",
    shift: "Morning",
    doctor: "Dr. Amna",
    specialty: "Pediatrics",
    color: "#DD6B20",
    room: "OPD-3",
    status: "confirmed",
    notes: "Saturday OPD",
  },
  {
    id: 14,
    day: "Sunday",
    shift: "Night",
    doctor: "Dr. Khan",
    specialty: "Orthopedics",
    color: "#2B6CB0",
    room: "Emergency",
    status: "on-call",
    notes: "Night emergency",
  },
];

const emptyForm = {
  day: "Monday",
  shift: "Morning",
  doctor: "",
  specialty: "",
  color: "#2B6CB0",
  room: "",
  status: "confirmed",
  notes: "",
};

function getInitials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Schedule() {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [view, setView] = useState("week"); // week | list
  const [filterShift, setFilterShift] = useState("All");
  const [filterDoctor, setFilterDoctor] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    if (e.target.name === "doctor") {
      const found = DOCTORS.find((d) => d.name === e.target.value);
      if (found) {
        updated.specialty = found.specialty;
        updated.color = found.color;
      }
    }
    setForm(updated);
  };

  const openAdd = (day = "Monday", shift = "Morning") => {
    setForm({ ...emptyForm, day, shift });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (slot) => {
    setForm({ ...slot });
    setEditingId(slot.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSlots(
        slots.map((s) => (s.id === editingId ? { ...form, id: editingId } : s)),
      );
    } else {
      setSlots([...slots, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = () => {
    setSlots(slots.filter((s) => s.id !== deleteConfirm));
    setDeleteConfirm(null);
  };

  const getSlots = (day, shift) =>
    slots.filter((s) => s.day === day && s.shift === shift);

  const filteredList = slots.filter((s) => {
    const mShift = filterShift === "All" || s.shift === filterShift;
    const mDoc = filterDoctor === "All" || s.doctor === filterDoctor;
    const mSearch =
      s.doctor.toLowerCase().includes(search.toLowerCase()) ||
      s.day.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.toLowerCase().includes(search.toLowerCase()) ||
      s.room.toLowerCase().includes(search.toLowerCase());
    return mShift && mDoc && mSearch;
  });

  // Stats
  const totalSlots = slots.length;
  const confirmedSlots = slots.filter((s) => s.status === "confirmed").length;
  const onCallSlots = slots.filter((s) => s.status === "on-call").length;
  const leaveSlots = slots.filter((s) => s.status === "leave").length;

  return (
    <div className="sc-page">
      {/* Header */}
      <div className="sc-header">
        <div className="sc-header-left">
          <h1 className="sc-title">Schedule</h1>
          <p className="sc-sub">Weekly duty roster & shift management</p>
        </div>
        <div className="sc-header-right">
          <div className="sc-view-toggle">
            <button
              className={`sc-view-btn ${view === "week" ? "sc-view-active" : ""}`}
              onClick={() => setView("week")}
            >
              ▦ Week View
            </button>
            <button
              className={`sc-view-btn ${view === "list" ? "sc-view-active" : ""}`}
              onClick={() => setView("list")}
            >
              ☰ List View
            </button>
          </div>
          <button className="sc-btn-primary" onClick={() => openAdd()}>
            + Add Slot
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="sc-stats">
        <div className="sc-stat-card">
          <div className="sc-stat-icon sc-stat-icon-total">📋</div>
          <div>
            <div className="sc-stat-num">{totalSlots}</div>
            <div className="sc-stat-label">Total Slots</div>
          </div>
        </div>
        <div className="sc-stat-card confirmed">
          <div className="sc-stat-icon sc-stat-icon-confirmed">✅</div>
          <div>
            <div className="sc-stat-num">{confirmedSlots}</div>
            <div className="sc-stat-label">Confirmed</div>
          </div>
        </div>
        <div className="sc-stat-card oncall">
          <div className="sc-stat-icon sc-stat-icon-oncall">📡</div>
          <div>
            <div className="sc-stat-num">{onCallSlots}</div>
            <div className="sc-stat-label">On Call</div>
          </div>
        </div>
        <div className="sc-stat-card leave">
          <div className="sc-stat-icon sc-stat-icon-leave">🏖️</div>
          <div>
            <div className="sc-stat-num">{leaveSlots}</div>
            <div className="sc-stat-label">On Leave</div>
          </div>
        </div>
      </div>

      {/* ── WEEK VIEW ── */}
      {view === "week" && (
        <div className="sc-week-wrap">
          {/* Shift Legend */}
          <div className="sc-legend">
            {SHIFTS.map((sh) => (
              <div key={sh} className="sc-legend-item">
                <span className="sc-legend-icon">{SHIFT_ICONS[sh]}</span>
                <span className="sc-legend-name">{sh}</span>
                <span className="sc-legend-time">{SHIFT_TIMES[sh]}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="sc-calendar">
            {/* Day Headers */}
            <div className="sc-cal-header">
              <div className="sc-cal-shift-col" />
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={`sc-cal-day-head ${activeDay === d ? "sc-cal-day-head-active" : ""}`}
                  onClick={() => setActiveDay(activeDay === d ? null : d)}
                >
                  <span className="sc-cal-day-short">{DAY_SHORT[i]}</span>
                  <span className="sc-cal-day-full">{d}</span>
                  <span className="sc-cal-day-count">
                    {slots.filter((s) => s.day === d).length} slots
                  </span>
                </div>
              ))}
            </div>

            {/* Rows per shift */}
            {SHIFTS.map((sh) => (
              <div key={sh} className="sc-cal-row">
                {/* Shift Label */}
                <div className="sc-cal-shift-label">
                  <span className="sc-cal-shift-icon">{SHIFT_ICONS[sh]}</span>
                  <div>
                    <div className="sc-cal-shift-name">{sh}</div>
                    <div className="sc-cal-shift-time">{SHIFT_TIMES[sh]}</div>
                  </div>
                </div>

                {/* Day Cells */}
                {DAYS.map((d) => {
                  const cellSlots = getSlots(d, sh);
                  return (
                    <div
                      key={d}
                      className={`sc-cal-cell ${activeDay && activeDay !== d ? "sc-cal-cell-dim" : ""}`}
                    >
                      {cellSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`sc-slot sc-slot-${slot.status}`}
                          style={{ borderLeft: `3px solid ${slot.color}` }}
                          onClick={() => openEdit(slot)}
                        >
                          <div className="sc-slot-top">
                            <div
                              className="sc-slot-avatar"
                              style={{ background: slot.color }}
                            >
                              {getInitials(slot.doctor)}
                            </div>
                            <div className="sc-slot-info">
                              <div className="sc-slot-doctor">
                                {slot.doctor}
                              </div>
                              <div className="sc-slot-spec">
                                {slot.specialty}
                              </div>
                            </div>
                          </div>
                          <div className="sc-slot-bottom">
                            <span className="sc-slot-room">🚪 {slot.room}</span>
                            <span
                              className={`sc-slot-badge sc-slot-badge-${slot.status}`}
                            >
                              {slot.status === "confirmed"
                                ? "✓"
                                : slot.status === "on-call"
                                  ? "📡"
                                  : "✗"}
                            </span>
                          </div>
                        </div>
                      ))}
                      <button
                        className="sc-add-slot-btn"
                        onClick={() => openAdd(d, sh)}
                        title={`Add slot — ${d} ${sh}`}
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="sc-list-wrap">
          {/* List Filters */}
          <div className="sc-list-filters">
            <input
              className="sc-search"
              placeholder="Search by doctor, day, specialty, room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="sc-filter-group">
              <select
                className="sc-select"
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
              >
                <option value="All">All Shifts</option>
                {SHIFTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select
                className="sc-select"
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
              >
                <option value="All">All Doctors</option>
                {DOCTORS.map((d) => (
                  <option key={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="sc-table-wrap">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Day</th>
                  <th>Shift</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 && (
                  <tr>
                    <td colSpan={9} className="sc-empty">
                      No schedule entries found.
                    </td>
                  </tr>
                )}
                {filteredList.map((slot, idx) => (
                  <tr key={slot.id}>
                    <td className="sc-idx">{idx + 1}</td>
                    <td>
                      <div className="sc-tbl-doctor">
                        <div
                          className="sc-tbl-avatar"
                          style={{ background: slot.color }}
                        >
                          {getInitials(slot.doctor)}
                        </div>
                        <div>
                          <div className="sc-tbl-name">{slot.doctor}</div>
                          <div className="sc-tbl-spec">{slot.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td>{slot.day}</td>
                    <td>
                      <span className="sc-shift-chip">
                        {SHIFT_ICONS[slot.shift]} {slot.shift}
                      </span>
                    </td>
                    <td className="sc-tbl-time">{SHIFT_TIMES[slot.shift]}</td>
                    <td>
                      <span className="sc-room-chip">{slot.room}</span>
                    </td>
                    <td>
                      <span className={`sc-badge sc-badge-${slot.status}`}>
                        {slot.status === "confirmed"
                          ? "Confirmed"
                          : slot.status === "on-call"
                            ? "On Call"
                            : "On Leave"}
                      </span>
                    </td>
                    <td className="sc-tbl-notes">{slot.notes || "—"}</td>
                    <td>
                      <div className="sc-tbl-actions">
                        <button
                          className="sc-btn-edit"
                          onClick={() => openEdit(slot)}
                        >
                          Edit
                        </button>
                        <button
                          className="sc-btn-del"
                          onClick={() => setDeleteConfirm(slot.id)}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Doctor Workload Summary */}
      <div className="sc-workload">
        <div className="sc-workload-title">Doctor Workload This Week</div>
        <div className="sc-workload-grid">
          {DOCTORS.map((doc) => {
            const count = slots.filter((s) => s.doctor === doc.name).length;
            const pct = Math.round(
              (count / (SHIFTS.length * DAYS.length)) * 100,
            );
            return (
              <div key={doc.name} className="sc-workload-card">
                <div className="sc-workload-top">
                  <div
                    className="sc-workload-avatar"
                    style={{ background: doc.color }}
                  >
                    {getInitials(doc.name)}
                  </div>
                  <div className="sc-workload-info">
                    <div className="sc-workload-name">{doc.name}</div>
                    <div className="sc-workload-spec">{doc.specialty}</div>
                  </div>
                  <div
                    className="sc-workload-count"
                    style={{ color: doc.color }}
                  >
                    {count} shifts
                  </div>
                </div>
                <div className="sc-workload-bar-bg">
                  <div
                    className="sc-workload-bar-fill"
                    style={{
                      width: `${Math.min(pct * 3, 100)}%`,
                      background: doc.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="sc-overlay" onClick={closeModal}>
          <div className="sc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sc-modal-header">
              <h3>{editingId ? "Edit Shift Slot" : "Add Shift Slot"}</h3>
              <button className="sc-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="sc-form">
              <div className="sc-form-row">
                <div className="sc-form-group">
                  <label>Day</label>
                  <select
                    name="day"
                    value={form.day}
                    onChange={handleChange}
                    required
                  >
                    {DAYS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="sc-form-group">
                  <label>Shift</label>
                  <select
                    name="shift"
                    value={form.shift}
                    onChange={handleChange}
                    required
                  >
                    {SHIFTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sc-form-row">
                <div className="sc-form-group">
                  <label>Doctor</label>
                  <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select doctor</option>
                    {DOCTORS.map((d) => (
                      <option key={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sc-form-group">
                  <label>Room / Ward</label>
                  <select
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select room</option>
                    {ROOMS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sc-form-row">
                <div className="sc-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="on-call">On Call</option>
                    <option value="leave">On Leave</option>
                  </select>
                </div>
                <div className="sc-form-group">
                  <label>Specialty (auto-filled)</label>
                  <input
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    placeholder="Auto from doctor"
                  />
                </div>
              </div>
              <div className="sc-form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any additional notes..."
                  rows={2}
                />
              </div>
              <div className="sc-form-footer">
                <button
                  type="button"
                  className="sc-btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="sc-btn-primary">
                  {editingId ? "Save Changes" : "Add Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="sc-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="sc-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sc-confirm-icon">🗑️</div>
            <h3>Remove Slot?</h3>
            <p>
              This shift slot will be permanently removed from the schedule.
            </p>
            <div className="sc-confirm-btns">
              <button
                className="sc-btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="sc-btn-danger" onClick={handleDelete}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
