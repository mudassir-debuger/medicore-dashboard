import { useState } from "react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const DashboardCharts = lazy(() => import("../components/DashboardCharts"));
import "../Styles/dashboard.css";
const WelcomeModal = lazy(() => import("../components/welcomeAlert"));
import {
  initialPatients,
  initialInventory,
  weeklyData,
  deptData,
  DEPT_COLORS,
  STATUS_STYLE,
  AVATAR_COLORS,
  getInitials,
  getAvatarColor,
} from "../data/dashboardData";
import ChartsSkeleton from "../components/chartsSkeleton";
import { Navigate } from "react-router-dom";

// ─── Small Components ─────────────────────────────────────────────────────

const Badge = ({ label }) => {
  const s = STATUS_STYLE[label] || { bg: "#F1EFE8", color: "#444441" };
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {label}
    </span>
  );
};

const Btn = ({ onClick, children, color = "#1D9E75", small }) => (
  <button
    onClick={onClick}
    className={`btn ${small ? "btn--small" : "btn--normal"}`}
    style={{ background: color }}
  >
    {children}
  </button>
);

const SectionCard = ({ title, sub, children, action }) => (
  <div className="section-card">
    <div className="section-card__header">
      <div>
        <div className="section-card__title">{title}</div>
        {sub && <div className="section-card__sub">{sub}</div>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const StatCard = ({ icon, label, value, change, changeUp, accent }) => (
  <div className="stat-card">
    <div
      className="stat-card__icon"
      style={{ background: accent + "22", color: accent }}
    >
      {icon}
    </div>
    <div className="stat-card__label">{label}</div>
    <div className="stat-card__value">{value}</div>
    <div
      className={`stat-card__change ${changeUp ? "stat-card__change--up" : "stat-card__change--down"}`}
    >
      {changeUp ? "▲" : "▼"} {change}
    </div>
    <div className="stat-card__bar" style={{ background: accent }} />
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <div className="modal-box__header">
        <div className="modal-box__title">{title}</div>
        <button className="modal-box__close" onClick={onClose}>
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);

const FormInput = ({ label, value, onChange, type = "text" }) => (
  <div className="form-field">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-input"
    />
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────

export default function HospitalDashboard() {
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [tab, setTab] = useState("overview");
  const patients = initialPatients;
  const [inventory, setInventory] = useState(initialInventory);
  const [notifications, setNotifications] = useState([
    "Syringes 5ml stock critically low (48 units)",
    "Patient Sara Raza — critical status update",
    "7 appointments scheduled for today",
  ]);
  const [showNotif, setShowNotif] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const closeModal = () => {
    setModal(null);
    setForm({});
  };

  const openRestockModal = (item) => {
    setForm({ ...item, restock: 100 });
    setModal("restock");
  };

  const doRestock = () => {
    setInventory((inv) =>
      inv.map((x) =>
        x.id === form.id
          ? {
              ...x,
              stock: Math.min(x.stock + Number(form.restock), x.max),
              critical: false,
            }
          : x,
      ),
    );
    closeModal();
    showToast(`${form.name} restocked successfully`);
  };

  const critical = patients.filter((p) => p.status === "Critical").length;
  const criticalInv = inventory.filter((i) => i.stock / i.max < 0.2).length;

  return (
    <div className="dashboard-root">
      <WelcomeModal />
      {/* Toast */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === "error" ? "⚠ " : "✓ "}
          {toast.msg}
        </div>
      )}

      {/* Notification Panel */}
      {showNotif && (
        <div className="notif-panel">
          <div className="notif-panel__title">
            Notifications ({notifications.length})
          </div>
          {notifications.map((n, i) => (
            <div key={i} className="notif-item">
              <div className="notif-item__dot" />
              <div className="notif-item__text">{n}</div>
              <button
                className="notif-item__close"
                onClick={() =>
                  setNotifications((ns) => ns.filter((_, j) => j !== i))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar__brand">
          <div className="topbar__logo">+</div>
          <div>
            <div className="topbar__brand-name">
              Med<span>Core</span> Admin
            </div>
            <div className="topbar__brand-sub">City General Hospital</div>
          </div>
        </div>

        <div className="topbar__tabs">
          {["overview", "inventory"].map((t) => (
            <button
              key={t}
              className={`topbar__tab ${tab === t ? "topbar__tab--active" : "topbar__tab--inactive"}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="topbar__right">
          {/* <div className="topbar__time">
            {formattedDate} • {formattedTime}
          </div> */}
          <button
            className="topbar__notif-btn"
            onClick={() => setShowNotif((s) => !s)}
          >
            🔔
            {notifications.length > 0 && <div className="topbar__notif-dot" />}
          </button>
          <div className="topbar__avatar">Dr</div>
        </div>
      </div>

      <div className="page-content">
        {/* ── OVERVIEW TAB ──────────────────────────────────────────────── */}
        {tab === "overview" && (
          <div>
            {/* Stat Cards */}
            <div className="stat-cards-row">
              <StatCard
                icon="👥"
                label="Total Patients"
                value={patients.length}
                change="+12% vs yesterday"
                changeUp
                accent="#1D9E75"
              />
              <StatCard
                icon="🛏"
                label="Beds Occupied"
                value="178/220"
                change="81% occupancy"
                changeUp
                accent="#378ADD"
              />
              <StatCard
                icon="⏱"
                label="Avg Wait Time"
                value="24 min"
                change="-3 min improved"
                changeUp
                accent="#EF9F27"
              />
              <StatCard
                icon="🚨"
                label="Critical Cases"
                value={critical}
                change={`${critical} active`}
                changeUp={false}
                accent="#E24B4A"
              />
            </div>

            {/* Charts */}
            <Suspense fallback={<ChartsSkeleton />}>
              <DashboardCharts
                weeklyData={weeklyData}
                deptData={deptData}
                DEPT_COLORS={DEPT_COLORS}
              />
            </Suspense>

            {/* Inventory Alert */}
            {criticalInv > 0 && (
              <div className="inv-alert">
                <span className="inv-alert__icon">⚠️</span>
                <span className="inv-alert__text">
                  {criticalInv} inventory item(s) at critical levels — check the
                  Inventory tab.
                </span>
                <button
                  className="inv-alert__btn"
                  onClick={() => setTab("inventory")}
                >
                  View
                </button>
              </div>
            )}

            {/* Recent Patients Table */}
            <SectionCard
              title="Recent Patients"
              sub={`${patients.length} total`}
              action={
                <Link
                  to="/patients"
                  className="btn btn--small"
                  style={{
                    background: "#1D9E75",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  View All
                </Link>
              }
            >
              <table className="data-table">
                <thead>
                  <tr>
                    {[
                      "Patient",
                      "Ward",
                      "Department",
                      "Status",
                      "Admitted",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="data-table__name-cell">
                          <div className="avatar" style={getAvatarColor(p.id)}>
                            {getInitials(p.name)}
                          </div>
                          <span className="data-table__name">{p.name}</span>
                        </div>
                      </td>
                      <td>{p.ward}</td>
                      <td>{p.dept}</td>
                      <td>
                        <Badge label={p.status} />
                      </td>
                      <td style={{ color: "#888" }}>{p.admitted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </div>
        )}

        {/* ── INVENTORY TAB ─────────────────────────────────────────────── */}
        {tab === "inventory" && (
          <SectionCard
            title="Medical Inventory"
            sub={`${criticalInv} critical items`}
          >
            <div className="inv-grid">
              {inventory.map((item) => {
                const pct = Math.round((item.stock / item.max) * 100);
                const color =
                  pct < 20 ? "#E24B4A" : pct < 40 ? "#EF9F27" : "#1D9E75";
                return (
                  <div
                    key={item.id}
                    className={`inv-card ${item.critical ? "inv-card--critical" : "inv-card--normal"}`}
                  >
                    <div className="inv-card__header">
                      <div className="inv-card__name">{item.name}</div>
                      {item.critical && (
                        <span className="inv-card__low-badge">⚠ Low</span>
                      )}
                    </div>
                    <div className="inv-card__stock">
                      <strong style={{ color }}>{item.stock}</strong> /{" "}
                      {item.max} {item.unit}
                    </div>
                    <div className="inv-card__bar-bg">
                      <div
                        className="inv-card__bar-fill"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <div className="inv-card__footer">
                      <span className="inv-card__pct">{pct}% remaining</span>
                      <Btn small onClick={() => openRestockModal(item)}>
                        Restock
                      </Btn>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Restock Modal */}
      {modal === "restock" && (
        <Modal title={`Restock — ${form.name}`} onClose={closeModal}>
          <div className="modal-box__note">
            Current stock:{" "}
            <strong style={{ color: "#E24B4A" }}>
              {form.stock} {form.unit}
            </strong>{" "}
            (max: {form.max})
          </div>
          <FormInput
            label="Units to add"
            type="number"
            value={form.restock || ""}
            onChange={(v) => setForm((f) => ({ ...f, restock: v }))}
          />
          <div className="modal-box__hint">
            New total will be:{" "}
            {Math.min(Number(form.stock) + Number(form.restock || 0), form.max)}{" "}
            {form.unit}
          </div>
          <div className="modal-box__actions">
            <Btn onClick={doRestock}>Confirm Restock</Btn>
            <button className="modal-box__cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
