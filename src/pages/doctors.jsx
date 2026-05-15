import React, { useState } from "react";
import "../Styles/doctors.css";

const SPECIALTIES = [
  "All",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Neurology",
  "Gynecology",
];

const INITIAL_DOCTORS = [
  {
    id: 1,
    name: "Dr. Amir Malik",
    specialty: "Cardiology",
    degree: "MBBS, FCPS (Cardiology)",
    studied: "King Edward Medical University, Lahore",
    experience: 14,
    patients: 3200,
    rating: 4.9,
    gmail: "amir.malik@hospital.com",
    phone: "0300-1112233",
    schedule: "Mon – Fri, 9am – 3pm",
    status: "available",
    fee: 2500,
    about:
      "Dr. Amir Malik is a senior cardiologist with over 14 years of experience in interventional cardiology. He specializes in angioplasty, echocardiography, and heart failure management.",
    skills: [
      "Angioplasty",
      "Echocardiography",
      "Heart Failure",
      "Hypertension",
    ],
    image: "AM",
    color: "#E53E3E",
  },
  {
    id: 2,
    name: "Dr. Saira Khan",
    specialty: "Pediatrics",
    degree: "MBBS, DCH, MCPS",
    studied: "Aga Khan University, Karachi",
    experience: 9,
    patients: 5100,
    rating: 4.8,
    gmail: "saira.khan@hospital.com",
    phone: "0311-2223344",
    schedule: "Mon, Wed, Fri – 10am – 2pm",
    status: "available",
    fee: 1800,
    about:
      "Dr. Saira Khan is a dedicated pediatrician known for her compassionate care of infants and children. She has a special interest in childhood nutrition and developmental disorders.",
    skills: [
      "Neonatology",
      "Vaccination",
      "Growth Disorders",
      "Child Nutrition",
    ],
    image: "SK",
    color: "#38A169",
  },
  {
    id: 3,
    name: "Dr. Tariq Iqbal",
    specialty: "Neurology",
    degree: "MBBS, MRCP (Neurology)",
    studied: "University of Health Sciences, Lahore",
    experience: 18,
    patients: 2800,
    rating: 4.7,
    gmail: "tariq.iqbal@hospital.com",
    phone: "0321-3334455",
    schedule: "Tue – Thu, 11am – 4pm",
    status: "on-leave",
    fee: 3000,
    about:
      "Dr. Tariq Iqbal is one of the leading neurologists in the region, specializing in epilepsy, stroke rehabilitation, and movement disorders. He has published over 20 research papers.",
    skills: ["Epilepsy", "Stroke Rehab", "EEG", "Parkinson's"],
    image: "TI",
    color: "#6B46C1",
  },
  {
    id: 4,
    name: "Dr. Nadia Saeed",
    specialty: "Gynecology",
    degree: "MBBS, FCPS (Obs & Gynae)",
    studied: "Fatima Jinnah Medical University",
    experience: 11,
    patients: 4200,
    rating: 4.9,
    gmail: "nadia.saeed@hospital.com",
    phone: "0333-4445566",
    schedule: "Mon – Sat, 2pm – 7pm",
    status: "available",
    fee: 2200,
    about:
      "Dr. Nadia Saeed is an experienced obstetrician and gynecologist with a focus on high-risk pregnancies, laparoscopic surgeries, and women's reproductive health.",
    skills: ["High-Risk Pregnancy", "Laparoscopy", "PCOS", "Infertility"],
    image: "NS",
    color: "#D53F8C",
  },
  {
    id: 5,
    name: "Dr. Hassan Khan",
    specialty: "Orthopedics",
    degree: "MBBS, FCPS (Orthopedics)",
    studied: "Allama Iqbal Medical College, Lahore",
    experience: 12,
    patients: 2600,
    rating: 4.6,
    gmail: "hassan.khan@hospital.com",
    phone: "0345-5556677",
    schedule: "Mon, Wed, Sat – 9am – 1pm",
    status: "available",
    fee: 2800,
    about:
      "Dr. Hassan Khan specializes in joint replacements, sports injuries, and spinal disorders. He has performed over 800 successful orthopedic surgeries.",
    skills: [
      "Joint Replacement",
      "Sports Injuries",
      "Spine Surgery",
      "Arthroscopy",
    ],
    image: "HK",
    color: "#2B6CB0",
  },
  {
    id: 6,
    name: "Dr. Amna Noor",
    specialty: "Pediatrics",
    degree: "MBBS, MCPS (Pediatrics)",
    studied: "Rawalpindi Medical University",
    experience: 6,
    patients: 1900,
    rating: 4.5,
    gmail: "amna.noor@hospital.com",
    phone: "0301-6667788",
    schedule: "Tue, Thu, Sat – 3pm – 7pm",
    status: "available",
    fee: 1500,
    about:
      "Dr. Amna Noor is a young and energetic pediatrician passionate about preventive healthcare. She focuses on newborn care, immunization, and childhood infectious diseases.",
    skills: ["Newborn Care", "Immunization", "Infections", "Asthma"],
    image: "AN",
    color: "#DD6B20",
  },
];

const emptyForm = {
  name: "",
  specialty: "",
  degree: "",
  studied: "",
  experience: "",
  patients: "",
  rating: "",
  gmail: "",
  phone: "",
  schedule: "",
  status: "available",
  fee: "",
  about: "",
  skills: "",
  color: "#6B46C1",
};

export default function Doctors() {
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [selected, setSelected] = useState(INITIAL_DOCTORS[0]);
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("All");
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
  const openEdit = (d) => {
    setForm({
      ...d,
      skills: Array.isArray(d.skills) ? d.skills.join(", ") : d.skills,
    });
    setEditingId(d.id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArr = form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const initials = form.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    if (editingId) {
      const updated = {
        ...form,
        id: editingId,
        skills: skillsArr,
        image: initials,
        experience: +form.experience,
        patients: +form.patients,
        rating: +form.rating,
        fee: +form.fee,
      };
      setDoctors(doctors.map((d) => (d.id === editingId ? updated : d)));
      setSelected(updated);
    } else {
      const newD = {
        ...form,
        id: Date.now(),
        skills: skillsArr,
        image: initials,
        experience: +form.experience,
        patients: +form.patients,
        rating: +form.rating,
        fee: +form.fee,
      };
      setDoctors([...doctors, newD]);
      setSelected(newD);
    }
    closeModal();
  };

  const handleDelete = () => {
    const remaining = doctors.filter((d) => d.id !== deleteConfirm);
    setDoctors(remaining);
    setSelected(remaining[0] || null);
    setDeleteConfirm(null);
  };

  const filtered = doctors.filter((d) => {
    const matchSpec = filterSpec === "All" || d.specialty === filterSpec;
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.gmail.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  const stars = (r) => {
    const full = Math.floor(r);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`dr-star ${i < full ? "dr-star-on" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="dr-page">
      {/* Header */}
      <div className="dr-header">
        <div className="dr-header-left">
          <h1 className="dr-title">Doctors</h1>
          <p className="dr-sub">
            {doctors.length} medical professionals on staff
          </p>
        </div>
        <button className="dr-btn-primary" onClick={openAdd}>
          + Add Doctor
        </button>
      </div>

      {/* Stats */}
      <div className="dr-stats">
        <div className="dr-stat-card">
          <div className="dr-stat-num">{doctors.length}</div>
          <div className="dr-stat-label">Total Doctors</div>
        </div>
        <div className="dr-stat-card available">
          <div className="dr-stat-num">
            {doctors.filter((d) => d.status === "available").length}
          </div>
          <div className="dr-stat-label">Available Now</div>
        </div>
        <div className="dr-stat-card leave">
          <div className="dr-stat-num">
            {doctors.filter((d) => d.status === "on-leave").length}
          </div>
          <div className="dr-stat-label">On Leave</div>
        </div>
        <div className="dr-stat-card patients">
          <div className="dr-stat-num">
            {doctors.reduce((a, d) => a + d.patients, 0).toLocaleString()}
          </div>
          <div className="dr-stat-label">Total Patients</div>
        </div>
      </div>

      {/* Filters */}
      <div className="dr-filters">
        <input
          className="dr-search"
          placeholder="Search by name, specialty or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dr-filter-tabs">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              className={`dr-tab ${filterSpec === s ? "dr-tab-active" : ""}`}
              onClick={() => setFilterSpec(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Two Panel */}
      <div className="dr-panels">
        {/* LEFT: Card Grid */}
        <div className="dr-grid">
          {filtered.length === 0 && (
            <div className="dr-empty">No doctors found.</div>
          )}
          {filtered.map((d) => (
            <div
              key={d.id}
              className={`dr-card ${selected?.id === d.id ? "dr-card-active" : ""}`}
              onClick={() => setSelected(d)}
              style={{ "--card-accent": d.color }}
            >
              <div className="dr-card-top">
                <div className="dr-avatar" style={{ background: d.color }}>
                  {d.image}
                </div>
                <div className="dr-card-info">
                  <div className="dr-card-name">{d.name}</div>
                  <div className="dr-card-spec">{d.specialty}</div>
                </div>
                <span className={`dr-status-badge dr-status-${d.status}`}>
                  {d.status === "available" ? "Available" : "On Leave"}
                </span>
              </div>
              <div className="dr-card-meta">
                <div className="dr-card-meta-item">
                  <span className="dr-card-meta-val">{d.experience}y</span>
                  <span className="dr-card-meta-lbl">Exp</span>
                </div>
                <div className="dr-card-meta-div" />
                <div className="dr-card-meta-item">
                  <span className="dr-card-meta-val">
                    {d.patients.toLocaleString()}
                  </span>
                  <span className="dr-card-meta-lbl">Patients</span>
                </div>
                <div className="dr-card-meta-div" />
                <div className="dr-card-meta-item">
                  <span className="dr-card-meta-val">
                    Rs {d.fee.toLocaleString()}
                  </span>
                  <span className="dr-card-meta-lbl">Fee</span>
                </div>
              </div>
              <div className="dr-card-gmail">✉ {d.gmail}</div>
            </div>
          ))}
        </div>

        {/* RIGHT: Detail Panel */}
        <div className="dr-detail-panel">
          {selected ? (
            <div className="dr-detail" style={{ "--accent": selected.color }}>
              {/* Profile Hero */}
              <div
                className="dr-hero"
                style={{ borderTop: `4px solid ${selected.color}` }}
              >
                <div
                  className="dr-hero-avatar"
                  style={{ background: selected.color }}
                >
                  {selected.image}
                </div>
                <div className="dr-hero-info">
                  <h2 className="dr-hero-name">{selected.name}</h2>
                  <div
                    className="dr-hero-spec"
                    style={{ color: selected.color }}
                  >
                    {selected.specialty}
                  </div>
                  <div className="dr-hero-degree">{selected.degree}</div>
                  <div className="dr-hero-stars">
                    {stars(selected.rating)}
                    <span className="dr-rating-val">{selected.rating}</span>
                  </div>
                </div>
                <span
                  className={`dr-status-badge dr-status-${selected.status}`}
                >
                  {selected.status === "available" ? "Available" : "On Leave"}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="dr-quick-stats">
                <div className="dr-qs-item">
                  <span className="dr-qs-icon">🎓</span>
                  <div>
                    <div className="dr-qs-val">{selected.experience} Years</div>
                    <div className="dr-qs-lbl">Experience</div>
                  </div>
                </div>
                <div className="dr-qs-item">
                  <span className="dr-qs-icon">👥</span>
                  <div>
                    <div className="dr-qs-val">
                      {selected.patients.toLocaleString()}
                    </div>
                    <div className="dr-qs-lbl">Patients</div>
                  </div>
                </div>
                <div className="dr-qs-item">
                  <span className="dr-qs-icon">💰</span>
                  <div>
                    <div className="dr-qs-val">
                      Rs {selected.fee.toLocaleString()}
                    </div>
                    <div className="dr-qs-lbl">Consult Fee</div>
                  </div>
                </div>
                <div className="dr-qs-item">
                  <span className="dr-qs-icon">⭐</span>
                  <div>
                    <div className="dr-qs-val">{selected.rating} / 5</div>
                    <div className="dr-qs-lbl">Rating</div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="dr-section">
                <div className="dr-section-label">About</div>
                <p className="dr-about">{selected.about}</p>
              </div>

              {/* Education */}
              <div className="dr-section">
                <div className="dr-section-label">Education</div>
                <div className="dr-edu-card">
                  <div
                    className="dr-edu-icon"
                    style={{ background: selected.color }}
                  >
                    🎓
                  </div>
                  <div>
                    <div className="dr-edu-degree">{selected.degree}</div>
                    <div className="dr-edu-uni">{selected.studied}</div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="dr-section">
                <div className="dr-section-label">Contact</div>
                <div className="dr-contact-grid">
                  <div className="dr-contact-item">
                    <span className="dr-contact-icon">✉️</span>
                    <div>
                      <div className="dr-contact-lbl">Gmail</div>
                      <div className="dr-contact-val">{selected.gmail}</div>
                    </div>
                  </div>
                  <div className="dr-contact-item">
                    <span className="dr-contact-icon">📞</span>
                    <div>
                      <div className="dr-contact-lbl">Phone</div>
                      <div className="dr-contact-val">{selected.phone}</div>
                    </div>
                  </div>
                  <div className="dr-contact-item">
                    <span className="dr-contact-icon">🕐</span>
                    <div>
                      <div className="dr-contact-lbl">Schedule</div>
                      <div className="dr-contact-val">{selected.schedule}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="dr-section">
                <div className="dr-section-label">Specializations</div>
                <div className="dr-skills">
                  {selected.skills.map((s) => (
                    <span
                      key={s}
                      className="dr-skill-tag"
                      style={{
                        borderColor: selected.color,
                        color: selected.color,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="dr-detail-actions">
                <button
                  className="dr-btn-edit"
                  style={{ background: selected.color }}
                  onClick={() => openEdit(selected)}
                >
                  Edit Profile
                </button>
                <button
                  className="dr-btn-del"
                  onClick={() => setDeleteConfirm(selected.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="dr-empty-state">
              Select a doctor to view profile
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="dr-overlay" onClick={closeModal}>
          <div className="dr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dr-modal-header">
              <h3>{editingId ? "Edit Doctor" : "Add New Doctor"}</h3>
              <button className="dr-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="dr-form">
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Dr. Full Name"
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Specialty</label>
                  <select
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select specialty</option>
                    {SPECIALTIES.filter((s) => s !== "All").map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Degree / Qualifications</label>
                  <input
                    name="degree"
                    value={form.degree}
                    onChange={handleChange}
                    placeholder="MBBS, FCPS..."
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Studied At</label>
                  <input
                    name="studied"
                    value={form.studied}
                    onChange={handleChange}
                    placeholder="University name"
                    required
                  />
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Gmail</label>
                  <input
                    name="gmail"
                    type="email"
                    value={form.gmail}
                    onChange={handleChange}
                    placeholder="doctor@hospital.com"
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0300-0000000"
                    required
                  />
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Experience (years)</label>
                  <input
                    name="experience"
                    type="number"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Total Patients</label>
                  <input
                    name="patients"
                    type="number"
                    value={form.patients}
                    onChange={handleChange}
                    placeholder="1000"
                    required
                  />
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Rating (out of 5)</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="4.8"
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Consultation Fee (Rs)</label>
                  <input
                    name="fee"
                    type="number"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="2000"
                    required
                  />
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Schedule</label>
                  <input
                    name="schedule"
                    value={form.schedule}
                    onChange={handleChange}
                    placeholder="Mon – Fri, 9am – 3pm"
                    required
                  />
                </div>
                <div className="dr-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="available">Available</option>
                    <option value="on-leave">On Leave</option>
                  </select>
                </div>
              </div>
              <div className="dr-form-row">
                <div className="dr-form-group">
                  <label>Profile Color</label>
                  <input
                    name="color"
                    type="color"
                    value={form.color}
                    onChange={handleChange}
                    style={{ height: "38px", padding: "2px 4px" }}
                  />
                </div>
                <div className="dr-form-group">
                  <label>Specializations (comma separated)</label>
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Angioplasty, ECG, ..."
                  />
                </div>
              </div>
              <div className="dr-form-group">
                <label>About / Bio</label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Brief professional bio..."
                  rows={3}
                />
              </div>
              <div className="dr-form-footer">
                <button
                  type="button"
                  className="dr-btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="dr-btn-primary">
                  {editingId ? "Save Changes" : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="dr-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="dr-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="dr-confirm-icon">🗑️</div>
            <h3>Remove Doctor?</h3>
            <p>This will permanently remove this doctor's profile.</p>
            <div className="dr-confirm-btns">
              <button
                className="dr-btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="dr-btn-danger" onClick={handleDelete}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
