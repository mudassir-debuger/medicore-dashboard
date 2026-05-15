import React, { useState } from "react";
import "../Styles/Appointment.css";
import { Sidebar } from "lucide-react";

const DOCTORS = [
  "Dr. Malik — Cardiology",
  "Dr. Khan — Orthopedics",
  "Dr. Noor — Pediatrics",
  "Dr. Iqbal — Neurology",
  "Dr. Saeed — Gynecology",
];

const STATUS_OPTIONS = ["Confirmed", "Pending", "Cancelled"];

const emptyForm = {
  name: "",
  doctor: "",
  date: "",
  time: "",
  status: "Pending",
  notes: "",
};

function Appointment() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Ahmed Raza",
      doctor: "Dr. Malik — Cardiology",
      date: "2026-04-30",
      time: "09:00",
      status: "Confirmed",
      notes: "Follow-up checkup",
    },
    {
      id: 2,
      name: "Sara Khan",
      doctor: "Dr. Noor — Pediatrics",
      date: "2026-04-30",
      time: "11:30",
      status: "Pending",
      notes: "",
    },
    {
      id: 3,
      name: "Usman Ali",
      doctor: "Dr. Iqbal — Neurology",
      date: "2026-05-01",
      time: "14:00",
      status: "Cancelled",
      notes: "Rescheduled",
    },
  ]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (app) => {
    setForm({ ...app });
    setEditingId(app.id);
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
      setAppointments(
        appointments.map((a) =>
          a.id === editingId ? { ...form, id: editingId } : a,
        ),
      );
    } else {
      setAppointments([...appointments, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const confirmDelete = (id) => setDeleteConfirm(id);

  const handleDelete = () => {
    setAppointments(appointments.filter((a) => a.id !== deleteConfirm));
    setDeleteConfirm(null);
  };

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCount = (s) => appointments.filter((a) => a.status === s).length;

  return (
    <div className="ap-page">
      {/* Header */}
      <div className="ap-header">
        <div>
          <h1 className="ap-title">Appointments</h1>
          <p className="ap-sub">Manage all patient appointments</p>
        </div>
        <button className="ap-btn-primary" onClick={openAdd}>
          + New Appointment
        </button>
      </div>

      {/* Stats Row */}
      <div className="ap-stats">
        <div className="ap-stat-card">
          <span className="ap-stat-num">{appointments.length}</span>
          <span className="ap-stat-label">Total</span>
        </div>
        <div className="ap-stat-card confirmed">
          <span className="ap-stat-num">{statusCount("Confirmed")}</span>
          <span className="ap-stat-label">Confirmed</span>
        </div>
        <div className="ap-stat-card pending">
          <span className="ap-stat-num">{statusCount("Pending")}</span>
          <span className="ap-stat-label">Pending</span>
        </div>
        <div className="ap-stat-card cancelled">
          <span className="ap-stat-num">{statusCount("Cancelled")}</span>
          <span className="ap-stat-label">Cancelled</span>
        </div>
      </div>

      {/* Filters */}
      <div className="ap-filters">
        <input
          className="ap-search"
          placeholder="Search patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="ap-filter-tabs">
          {["All", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              className={`ap-tab ${filterStatus === s ? "ap-tab-active" : ""}`}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="ap-empty">
                  No appointments found
                </td>
              </tr>
            ) : (
              filtered.map((app, i) => (
                <tr key={app.id}>
                  <td className="ap-idx">{i + 1}</td>
                  <td className="ap-patient">{app.name}</td>
                  <td>{app.doctor}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>
                    <span
                      className={`ap-badge ap-badge-${app.status.toLowerCase()}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="ap-notes">{app.notes || "—"}</td>
                  <td>
                    <div className="ap-actions">
                      <button
                        className="ap-btn-edit"
                        onClick={() => openEdit(app)}
                      >
                        Edit
                      </button>
                      <button
                        className="ap-btn-del"
                        onClick={() => confirmDelete(app.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="ap-overlay" onClick={closeModal}>
          <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ap-modal-header">
              <h3>{editingId ? "Edit Appointment" : "New Appointment"}</h3>
              <button className="ap-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="ap-form">
              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Patient Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="ap-form-group">
                  <label>Doctor</label>
                  <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select doctor</option>
                    {DOCTORS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ap-form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="ap-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="ap-form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Optional notes..."
                  rows={3}
                />
              </div>
              <div className="ap-form-footer">
                <button
                  type="button"
                  className="ap-btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="ap-btn-primary">
                  {editingId ? "Save Changes" : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="ap-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="ap-confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Appointment?</h3>
            <p>This action cannot be undone.</p>
            <div className="ap-confirm-btns">
              <button
                className="ap-btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="ap-btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
