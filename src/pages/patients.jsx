import React, { useState } from "react";
import "../Styles/patients.css";

const DOCTORS = [
  "Dr. Malik — Cardiology",
  "Dr. Khan — Orthopedics",
  "Dr. Noor — Pediatrics",
  "Dr. Iqbal — Neurology",
  "Dr. Saeed — Gynecology",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const INITIAL_PATIENTS = [
  {
    id: 1,
    name: "Ahmed Raza",
    age: 34,
    phone: "0300-1234567",
    email: "ahmed@email.com",
    blood: "A+",
    doctor: "Dr. Malik — Cardiology",
    history:
      "Hypertension, follow-up every 3 months. Blood pressure controlled with medication.",
  },
  {
    id: 2,
    name: "Sara Khan",
    age: 27,
    phone: "0311-9876543",
    email: "sara@email.com",
    blood: "B+",
    doctor: "Dr. Noor — Pediatrics",
    history:
      "Seasonal allergies, prescribed antihistamines. Review in 6 weeks.",
  },
  {
    id: 3,
    name: "Usman Ali",
    age: 45,
    phone: "0321-5556677",
    email: "usman@email.com",
    blood: "O+",
    doctor: "Dr. Iqbal — Neurology",
    history:
      "Migraine disorder, MRI scheduled next month. Avoid stress triggers.",
  },
  {
    id: 4,
    name: "Fatima Malik",
    age: 31,
    phone: "0333-1122334",
    email: "fatima@email.com",
    blood: "AB-",
    doctor: "Dr. Saeed — Gynecology",
    history: "Routine checkup, no major concerns. Next visit in 6 months.",
  },
  {
    id: 5,
    name: "Bilal Ahmed",
    age: 52,
    phone: "0345-9988776",
    email: "bilal@email.com",
    blood: "B-",
    doctor: "Dr. Khan — Orthopedics",
    history: "Knee replacement surgery recovery. Physiotherapy 3x weekly.",
  },
  {
    id: 6,
    name: "Zara Siddiqui",
    age: 22,
    phone: "0301-7654321",
    email: "zara@email.com",
    blood: "A-",
    doctor: "Dr. Noor — Pediatrics",
    history: "Mild anemia, iron supplements prescribed. Re-test in 4 weeks.",
  },
];

const emptyForm = {
  name: "",
  age: "",
  phone: "",
  email: "",
  blood: "",
  doctor: "",
  history: "",
};
const COLORS = [
  "#6C63FF",
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Patients() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [selected, setSelected] = useState(INITIAL_PATIENTS[0]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };
  const openEdit = (p) => {
    setForm({ ...p });
    setEditingId(p.id);
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
      const updated = { ...form, id: editingId };
      setPatients(patients.map((p) => (p.id === editingId ? updated : p)));
      setSelected(updated);
    } else {
      const newP = { ...form, id: Date.now() };
      setPatients([...patients, newP]);
      setSelected(newP);
    }
    closeModal();
  };

  const handleDelete = () => {
    const remaining = patients.filter((p) => p.id !== deleteConfirm);
    setPatients(remaining);
    setSelected(remaining[0] || null);
    setDeleteConfirm(null);
  };

  const colorOf = (id) =>
    COLORS[patients.findIndex((p) => p.id === id) % COLORS.length];

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search),
  );

  return (
    <div className="pt-page">
      {/* Header */}
      <div className="pt-topbar">
        <div className="pt-topbar-left">
          <h1 className="pt-heading">Patients</h1>
          <div className="pt-pill">{patients.length} registered</div>
        </div>
        <button className="pt-add-btn" onClick={openAdd}>
          + Add Patient
        </button>
      </div>

      {/* Two Panel */}
      <div className="pt-panels">
        {/* LEFT PANEL */}
        <div className="pt-left">
          <div className="pt-search-wrap">
            <span className="pt-search-icon">⌕</span>
            <input
              className="pt-search"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="pt-list">
            {filtered.length === 0 && (
              <div className="pt-no-results">No patients found</div>
            )}
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`pt-row ${selected?.id === p.id ? "pt-row-active" : ""}`}
                onClick={() => setSelected(p)}
                style={{ "--row-accent": colorOf(p.id) }}
              >
                <div
                  className="pt-row-avatar"
                  style={{ background: colorOf(p.id) }}
                >
                  {getInitials(p.name)}
                </div>
                <div className="pt-row-info">
                  <div className="pt-row-name">{p.name}</div>
                  <div className="pt-row-meta">
                    {p.doctor.split("—")[0].trim()}
                  </div>
                </div>
                <div className="pt-row-right">
                  <span
                    className="pt-row-blood"
                    style={{ color: colorOf(p.id) }}
                  >
                    {p.blood}
                  </span>
                  <span className="pt-row-age">{p.age}y</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="pt-right">
          {selected ? (
            <div
              className="pt-detail"
              style={{ "--accent": colorOf(selected.id) }}
            >
              {/* Hero */}
              <div className="pt-hero">
                <div
                  className="pt-hero-glow"
                  style={{ background: colorOf(selected.id) }}
                />
                <div
                  className="pt-hero-avatar"
                  style={{ background: colorOf(selected.id) }}
                >
                  {getInitials(selected.name)}
                </div>
                <div className="pt-hero-text">
                  <h2 className="pt-hero-name">{selected.name}</h2>
                  <p className="pt-hero-id">Patient #{selected.id}</p>
                </div>
                <div
                  className="pt-hero-blood"
                  style={{ background: colorOf(selected.id) }}
                >
                  {selected.blood}
                </div>
              </div>

              {/* Stats Strip */}
              <div className="pt-strip">
                <div className="pt-strip-item">
                  <span className="pt-strip-val">{selected.age}</span>
                  <span className="pt-strip-lbl">Age</span>
                </div>
                <div className="pt-strip-div" />
                <div className="pt-strip-item">
                  <span className="pt-strip-val">{selected.blood}</span>
                  <span className="pt-strip-lbl">Blood</span>
                </div>
                <div className="pt-strip-div" />
                <div className="pt-strip-item">
                  <span className="pt-strip-val">
                    {selected.doctor.split("—")[1]?.trim() || "—"}
                  </span>
                  <span className="pt-strip-lbl">Dept</span>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-section">
                <div className="pt-section-label">Contact Info</div>
                <div className="pt-contact-grid">
                  <div className="pt-contact-card">
                    <div className="pt-contact-icon">📞</div>
                    <div className="pt-contact-lbl">Phone</div>
                    <div className="pt-contact-val">{selected.phone}</div>
                  </div>
                  <div className="pt-contact-card">
                    <div className="pt-contact-icon">✉️</div>
                    <div className="pt-contact-lbl">Email</div>
                    <div className="pt-contact-val">{selected.email}</div>
                  </div>
                </div>
              </div>

              {/* Doctor */}
              <div className="pt-section">
                <div className="pt-section-label">Assigned Doctor</div>
                <div
                  className="pt-doctor-chip"
                  style={{
                    borderColor: colorOf(selected.id),
                    color: colorOf(selected.id),
                  }}
                >
                  <span
                    className="pt-doctor-dot"
                    style={{ background: colorOf(selected.id) }}
                  />
                  {selected.doctor}
                </div>
              </div>

              {/* History */}
              <div className="pt-section">
                <div className="pt-section-label">Medical History</div>
                <div className="pt-history">
                  {selected.history || "No history recorded."}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-actions">
                <button
                  className="pt-edit-btn"
                  style={{ background: colorOf(selected.id) }}
                  onClick={() => openEdit(selected)}
                >
                  Edit Patient
                </button>
                <button
                  className="pt-del-btn"
                  onClick={() => setDeleteConfirm(selected.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-empty-state">
              Select a patient to view details
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="pt-overlay" onClick={closeModal}>
          <div className="pt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pt-modal-header">
              <h3>{editingId ? "Edit Patient" : "New Patient"}</h3>
              <button className="pt-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="pt-form">
              <div className="pt-form-row">
                <div className="pt-form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="pt-form-group">
                  <label>Age</label>
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                  />
                </div>
              </div>
              <div className="pt-form-row">
                <div className="pt-form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0300-0000000"
                    required
                  />
                </div>
                <div className="pt-form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="pt-form-row">
                <div className="pt-form-group">
                  <label>Blood Group</label>
                  <select
                    name="blood"
                    value={form.blood}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="pt-form-group">
                  <label>Assigned Doctor</label>
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
              <div className="pt-form-group">
                <label>Medical History / Notes</label>
                <textarea
                  name="history"
                  value={form.history}
                  onChange={handleChange}
                  placeholder="Any medical history or notes..."
                  rows={3}
                />
              </div>
              <div className="pt-form-footer">
                <button
                  type="button"
                  className="pt-btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="pt-btn-submit">
                  {editingId ? "Save Changes" : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="pt-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="pt-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="pt-confirm-icon">🗑️</div>
            <h3>Delete Patient?</h3>
            <p>This will permanently remove this record.</p>
            <div className="pt-confirm-btns">
              <button
                className="pt-btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="pt-del-btn" onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
