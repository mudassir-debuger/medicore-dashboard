import { useState, useMemo } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E4E8F0",
  borderHv: "#C8D0E0",
  primary: "#1B5FAD",
  primaryLt: "#EBF2FF",
  teal: "#0A8F6C",
  tealLt: "#E6F7F2",
  amber: "#C47D0A",
  amberLt: "#FEF6E4",
  red: "#C0392B",
  redLt: "#FDECEA",
  violet: "#5B4FCF",
  violetLt: "#F0EEFF",
  text: "#0F1B2D",
  sub: "#4A5568",
  muted: "#8896AC",
  white: "#FFFFFF",
};

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INIT_INVOICES = [
  {
    id: "INV-2024-001",
    patient: "Ahmad Karimi",
    pid: "P-10421",
    dept: "Cardiology",
    date: "2024-05-01",
    due: "2024-05-15",
    amount: 4200,
    paid: 4200,
    status: "paid",
    items: [
      { desc: "Echocardiogram", qty: 1, rate: 2500 },
      { desc: "Consultation", qty: 2, rate: 850 },
    ],
  },
  {
    id: "INV-2024-002",
    patient: "Sara Nouri",
    pid: "P-10432",
    dept: "Orthopedics",
    date: "2024-05-03",
    due: "2024-05-17",
    amount: 8750,
    paid: 0,
    status: "unpaid",
    items: [
      { desc: "Knee Replacement Surgery", qty: 1, rate: 7000 },
      { desc: "Physiotherapy", qty: 5, rate: 150 },
      { desc: "Medication", qty: 1, rate: 1000 },
    ],
  },
  {
    id: "INV-2024-003",
    patient: "Kamran Malik",
    pid: "P-10390",
    dept: "Emergency",
    date: "2024-04-22",
    due: "2024-05-06",
    amount: 1350,
    paid: 500,
    status: "partial",
    items: [
      { desc: "Emergency Consultation", qty: 1, rate: 600 },
      { desc: "X-Ray", qty: 3, rate: 250 },
    ],
  },
  {
    id: "INV-2024-004",
    patient: "Fatima Zahra",
    pid: "P-10455",
    dept: "Pediatrics",
    date: "2024-05-08",
    due: "2024-05-22",
    amount: 620,
    paid: 0,
    status: "unpaid",
    items: [
      { desc: "Pediatric Checkup", qty: 1, rate: 400 },
      { desc: "Vaccination", qty: 1, rate: 220 },
    ],
  },
  {
    id: "INV-2024-005",
    patient: "Usman Ghani",
    pid: "P-10312",
    dept: "ICU",
    date: "2024-04-15",
    due: "2024-04-29",
    amount: 22400,
    paid: 0,
    status: "overdue",
    items: [
      { desc: "ICU Stay (7 days)", qty: 7, rate: 2800 },
      { desc: "Ventilator Support", qty: 3, rate: 1200 },
    ],
  },
  {
    id: "INV-2024-006",
    patient: "Aisha Raza",
    pid: "P-10478",
    dept: "Oncology",
    date: "2024-05-10",
    due: "2024-05-24",
    amount: 5800,
    paid: 5800,
    status: "paid",
    items: [
      { desc: "Chemotherapy Session", qty: 2, rate: 2400 },
      { desc: "Lab Tests", qty: 5, rate: 200 },
    ],
  },
  {
    id: "INV-2024-007",
    patient: "Hassan Mirza",
    pid: "P-10501",
    dept: "Surgery",
    date: "2024-05-05",
    due: "2024-05-19",
    amount: 11300,
    paid: 5000,
    status: "partial",
    items: [
      { desc: "Appendectomy", qty: 1, rate: 9000 },
      { desc: "Anesthesia", qty: 1, rate: 1500 },
      { desc: "Post-op Care", qty: 2, rate: 400 },
    ],
  },
  {
    id: "INV-2024-008",
    patient: "Zainab Ali",
    pid: "P-10523",
    dept: "Radiology",
    date: "2024-04-28",
    due: "2024-05-12",
    amount: 980,
    paid: 0,
    status: "overdue",
    items: [
      { desc: "MRI Brain", qty: 1, rate: 750 },
      { desc: "Radiologist Fee", qty: 1, rate: 230 },
    ],
  },
];

const STATUS_CONFIG = {
  paid: { label: "Paid", bg: T.tealLt, color: T.teal, dot: "#0A8F6C" },
  unpaid: { label: "Unpaid", bg: T.amberLt, color: T.amber, dot: "#C47D0A" },
  partial: {
    label: "Partial",
    bg: T.violetLt,
    color: T.violet,
    dot: "#5B4FCF",
  },
  overdue: { label: "Overdue", bg: T.redLt, color: T.red, dot: "#C0392B" },
};

const fmt = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

// ─── Sub Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.4px",
        padding: "3px 9px",
        borderRadius: 20,
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }}
      />
      {s.label.toUpperCase()}
    </span>
  );
}

function MetricCard({ icon, label, value, sub, accent }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        padding: "18px 20px",
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: T.muted,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: T.text,
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: T.sub, marginTop: 5 }}>
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: accent + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  style = {},
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: T.sub }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "9px 12px",
          borderRadius: 9,
          border: `1px solid ${T.border}`,
          fontSize: 13,
          color: T.text,
          background: T.surface,
          outline: "none",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: T.sub }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "9px 12px",
          borderRadius: 9,
          border: `1px solid ${T.border}`,
          fontSize: 13,
          color: T.text,
          background: T.surface,
          outline: "none",
          fontFamily: "inherit",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  small = false,
  disabled = false,
}) {
  const styles = {
    primary: {
      backgroundColor: T.primary,
      color: "#fff",
      border: `1px solid ${T.primary}`,
    },
    outline: {
      backgroundColor: "transparent",
      color: T.primary,
      border: `1px solid ${T.primary}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: T.sub,
      border: `1px solid ${T.border}`,
    },
    danger: {
      backgroundColor: T.redLt,
      color: T.red,
      border: `1px solid #F5C6C2`,
    },
    success: {
      backgroundColor: T.tealLt,
      color: T.teal,
      border: `1px solid #A8DFCF`,
    },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? "6px 12px" : "9px 18px",
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        borderRadius: 9,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "opacity 0.15s",
        opacity: disabled ? 0.5 : 1,
        ...s,
      }}
    >
      {children}
    </button>
  );
}

// ─── Invoice Detail Modal ─────────────────────────────────────────────────────
function InvoiceModal({ invoice, onClose, onUpdateStatus, onRecordPayment }) {
  const [payAmt, setPayAmt] = useState("");
  const [payNote, setPayNote] = useState("");
  const outstanding = invoice.amount - invoice.paid;

  const handlePay = () => {
    const n = parseFloat(payAmt);
    if (!n || n <= 0 || n > outstanding) return;
    onRecordPayment(invoice.id, n, payNote);
    setPayAmt("");
    setPayNote("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,20,40,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: T.surface,
          borderRadius: 18,
          border: `1px solid ${T.border}`,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px 30px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginBottom: 4,
              }}
            >
              INVOICE
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.text }}>
              {invoice.id}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <StatusBadge status={invoice.status} />
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: 20,
                color: T.muted,
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Patient Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            background: T.bg,
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          {[
            ["Patient", invoice.patient],
            ["Patient ID", invoice.pid],
            ["Department", invoice.dept],
            ["Invoice Date", invoice.date],
            ["Due Date", invoice.due],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>
                {k}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: T.text,
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Line Items */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.text,
              marginBottom: 10,
            }}
          >
            Services & Charges
          </div>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.border}` }}>
                {["Description", "Qty", "Rate", "Total"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px 8px",
                      textAlign: h === "Description" ? "left" : "right",
                      color: T.muted,
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "9px 8px", color: T.text }}>
                    {item.desc}
                  </td>
                  <td
                    style={{
                      padding: "9px 8px",
                      textAlign: "right",
                      color: T.sub,
                    }}
                  >
                    {item.qty}
                  </td>
                  <td
                    style={{
                      padding: "9px 8px",
                      textAlign: "right",
                      color: T.sub,
                    }}
                  >
                    {fmt(item.rate)}
                  </td>
                  <td
                    style={{
                      padding: "9px 8px",
                      textAlign: "right",
                      color: T.text,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(item.qty * item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 13, color: T.sub }}>
              Subtotal: <strong>{fmt(invoice.amount)}</strong>
            </div>
            <div style={{ fontSize: 13, color: T.teal }}>
              Paid: <strong>{fmt(invoice.paid)}</strong>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: outstanding > 0 ? T.red : T.teal,
                borderTop: `1px solid ${T.border}`,
                paddingTop: 8,
                marginTop: 4,
              }}
            >
              Outstanding: {fmt(outstanding)}
            </div>
          </div>
        </div>

        {/* Record Payment */}
        {outstanding > 0 && (
          <div
            style={{
              background: T.primaryLt,
              borderRadius: 12,
              padding: "16px 18px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.primary,
                marginBottom: 12,
              }}
            >
              💳 Record Payment
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Input
                label="Amount ($)"
                type="number"
                value={payAmt}
                onChange={setPayAmt}
                placeholder={`Max ${outstanding}`}
              />
              <Input
                label="Note (optional)"
                value={payNote}
                onChange={setPayNote}
                placeholder="e.g. Cash, Card, Insurance"
              />
            </div>
            <Btn
              onClick={handlePay}
              disabled={
                !payAmt ||
                parseFloat(payAmt) <= 0 ||
                parseFloat(payAmt) > outstanding
              }
            >
              Record Payment
            </Btn>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn variant="outline" onClick={() => window.print()}>
            🖨️ Print Invoice
          </Btn>
          {invoice.status !== "paid" && (
            <Btn
              variant="success"
              onClick={() => onUpdateStatus(invoice.id, "paid")}
            >
              ✅ Mark as Paid
            </Btn>
          )}
          <Btn variant="ghost" onClick={onClose}>
            Close
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── New Invoice Modal ────────────────────────────────────────────────────────
function NewInvoiceModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    patient: "",
    pid: "",
    dept: "Cardiology",
    date: new Date().toISOString().slice(0, 10),
    due: "",
    status: "unpaid",
  });
  const [items, setItems] = useState([{ desc: "", qty: 1, rate: "" }]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setItem = (i, k, v) =>
    setItems(items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const addItem = () => setItems([...items, { desc: "", qty: 1, rate: "" }]);
  const removeItem = (i) =>
    items.length > 1 && setItems(items.filter((_, idx) => idx !== i));
  const total = items.reduce(
    (s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0),
    0,
  );

  const handleSave = () => {
    if (!form.patient || !form.pid || !form.due) return;
    const newInv = {
      ...form,
      id: `INV-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
      amount: total,
      paid: 0,
      items: items.map((it) => ({
        desc: it.desc,
        qty: parseInt(it.qty) || 1,
        rate: parseFloat(it.rate) || 0,
      })),
    };
    onSave(newInv);
    onClose();
  };

  const DEPTS = [
    "Cardiology",
    "Orthopedics",
    "Emergency",
    "Pediatrics",
    "ICU",
    "Oncology",
    "Surgery",
    "Radiology",
    "Neurology",
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,20,40,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: T.surface,
          borderRadius: 18,
          border: `1px solid ${T.border}`,
          width: "100%",
          maxWidth: 620,
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "28px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: T.text }}>
            New Invoice
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: T.muted,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Input
            label="Patient Name *"
            value={form.patient}
            onChange={(v) => set("patient", v)}
            placeholder="Full name"
          />
          <Input
            label="Patient ID *"
            value={form.pid}
            onChange={(v) => set("pid", v)}
            placeholder="P-XXXXX"
          />
          <Select
            label="Department"
            value={form.dept}
            onChange={(v) => set("dept", v)}
            options={DEPTS.map((d) => ({ value: d, label: d }))}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => set("status", v)}
            options={["unpaid", "paid", "partial", "overdue"].map((s) => ({
              value: s,
              label: STATUS_CONFIG[s].label,
            }))}
          />
          <Input
            label="Invoice Date *"
            type="date"
            value={form.date}
            onChange={(v) => set("date", v)}
          />
          <Input
            label="Due Date *"
            type="date"
            value={form.due}
            onChange={(v) => set("due", v)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
              Line Items
            </div>
            <Btn variant="outline" small onClick={addItem}>
              + Add Item
            </Btn>
          </div>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr 1fr auto",
                gap: 8,
                marginBottom: 8,
                alignItems: "flex-end",
              }}
            >
              <Input
                value={it.desc}
                onChange={(v) => setItem(i, "desc", v)}
                placeholder="Service description"
              />
              <Input
                type="number"
                value={it.qty}
                onChange={(v) => setItem(i, "qty", v)}
                placeholder="Qty"
              />
              <Input
                type="number"
                value={it.rate}
                onChange={(v) => setItem(i, "rate", v)}
                placeholder="Rate $"
              />
              <button
                onClick={() => removeItem(i)}
                style={{
                  background: T.redLt,
                  border: "none",
                  color: T.red,
                  borderRadius: 8,
                  padding: "9px 10px",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <div
            style={{
              textAlign: "right",
              fontSize: 14,
              fontWeight: 700,
              color: T.primary,
              marginTop: 8,
            }}
          >
            Total: {fmt(total)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={onClose}>
            Cancel
          </Btn>
          <Btn
            onClick={handleSave}
            disabled={!form.patient || !form.pid || !form.due || total === 0}
          >
            💾 Save Invoice
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BillingPage() {
  const [invoices, setInvoices] = useState(INIT_INVOICES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedInv, setSelectedInv] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const depts = ["all", ...new Set(INIT_INVOICES.map((i) => i.dept))];

  const filtered = useMemo(() => {
    let list = invoices.filter((inv) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        inv.patient.toLowerCase().includes(q) ||
        inv.id.toLowerCase().includes(q) ||
        inv.pid.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || inv.status === statusFilter;
      const matchDept = deptFilter === "all" || inv.dept === deptFilter;
      return matchSearch && matchStatus && matchDept;
    });
    list = [...list].sort((a, b) => {
      let va = a[sortBy],
        vb = b[sortBy];
      if (sortBy === "amount" || sortBy === "paid") {
        va = +va;
        vb = +vb;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [invoices, search, statusFilter, deptFilter, sortBy, sortDir]);

  const metrics = useMemo(() => {
    const total = invoices.reduce((s, i) => s + i.amount, 0);
    const paid = invoices.reduce((s, i) => s + i.paid, 0);
    const overdue = invoices
      .filter((i) => i.status === "overdue")
      .reduce((s, i) => s + (i.amount - i.paid), 0);
    const count = invoices.length;
    return { total, paid, overdue, count };
  }, [invoices]);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((i) => i.id)));
  };

  const bulkMarkPaid = () => {
    setInvoices((prev) =>
      prev.map((inv) =>
        selectedIds.has(inv.id)
          ? { ...inv, status: "paid", paid: inv.amount }
          : inv,
      ),
    );
    showToast(`${selectedIds.size} invoice(s) marked as paid`);
    setSelectedIds(new Set());
  };

  const bulkDelete = () => {
    setInvoices((prev) => prev.filter((inv) => !selectedIds.has(inv.id)));
    showToast(`${selectedIds.size} invoice(s) deleted`, "danger");
    setSelectedIds(new Set());
  };

  const updateStatus = (id, status) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, status, paid: status === "paid" ? inv.amount : inv.paid }
          : inv,
      ),
    );
    showToast("Status updated");
    setSelectedInv((prev) =>
      prev && prev.id === id
        ? { ...prev, status, paid: status === "paid" ? prev.amount : prev.paid }
        : prev,
    );
  };

  const recordPayment = (id, amount, note) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        const newPaid = Math.min(inv.paid + amount, inv.amount);
        const newStatus =
          newPaid >= inv.amount ? "paid" : newPaid > 0 ? "partial" : inv.status;
        return { ...inv, paid: newPaid, status: newStatus };
      }),
    );
    showToast(`Payment of ${fmt(amount)} recorded`);
    setSelectedInv((prev) => {
      if (!prev || prev.id !== id) return prev;
      const newPaid = Math.min(prev.paid + amount, prev.amount);
      const newStatus = newPaid >= prev.amount ? "paid" : "partial";
      return { ...prev, paid: newPaid, status: newStatus };
    });
  };

  const addInvoice = (inv) => {
    setInvoices((prev) => [inv, ...prev]);
    showToast("Invoice created successfully");
  };

  const SortIcon = ({ col }) => {
    if (sortBy !== col)
      return <span style={{ color: T.muted, marginLeft: 4 }}>↕</span>;
    return (
      <span style={{ color: T.primary, marginLeft: 4 }}>
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const COLS = [
    { key: "id", label: "Invoice ID", w: "130px" },
    { key: "patient", label: "Patient", w: "160px" },
    { key: "dept", label: "Department", w: "120px" },
    { key: "date", label: "Date", w: "100px" },
    { key: "due", label: "Due Date", w: "100px" },
    { key: "amount", label: "Amount", w: "100px", right: true },
    { key: "paid", label: "Paid", w: "100px", right: true },
    { key: "status", label: "Status", w: "100px" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'Sora','Segoe UI',sans-serif",
        padding: "28px 32px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        input,select { outline:none; }
        input:focus,select:focus { border-color: ${T.primary} !important; box-shadow:0 0 0 3px ${T.primaryLt}; }
        button:hover { opacity:0.88; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-thumb { background:#C8D0E0; border-radius:3px; }
        tr:hover td { background:${T.bg} !important; cursor:pointer; }
        @media print { .no-print { display:none !important; } }
      `}</style>

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 28,
            zIndex: 2000,
            background: toast.type === "danger" ? T.red : T.teal,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease",
          }}
        >
          {toast.type === "danger" ? "🗑️" : "✅"} {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg,${T.primary},#3A86D4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            💳
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.text }}>
              Billing & Invoices
            </div>
            <div style={{ fontSize: 13, color: T.muted }}>
              MediCore Hospital · Finance Department
            </div>
          </div>
        </div>
        <Btn onClick={() => setShowNew(true)}>+ New Invoice</Btn>
      </div>

      {/* ── Metrics ── */}
      <div
        className="no-print"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 14,
          marginBottom: 26,
        }}
      >
        <MetricCard
          icon="📋"
          label="Total Invoices"
          value={metrics.count}
          sub={`${invoices.filter((i) => i.status === "unpaid").length} unpaid`}
          accent={T.primary}
        />
        <MetricCard
          icon="💰"
          label="Total Billed"
          value={fmt(metrics.total)}
          sub="All time"
          accent={T.violet}
        />
        <MetricCard
          icon="✅"
          label="Total Collected"
          value={fmt(metrics.paid)}
          sub={`${Math.round((metrics.paid / metrics.total) * 100)}% collection rate`}
          accent={T.teal}
        />
        <MetricCard
          icon="⚠️"
          label="Overdue Outstanding"
          value={fmt(metrics.overdue)}
          sub={`${invoices.filter((i) => i.status === "overdue").length} overdue invoices`}
          accent={T.red}
        />
      </div>

      {/* ── Filters ── */}
      <div
        className="no-print"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: "16px 20px",
          marginBottom: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <Input
          label="Search"
          value={search}
          onChange={setSearch}
          placeholder="Patient name, invoice ID, patient ID…"
          style={{ flex: "1 1 220px" }}
        />
        <Select
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "All statuses" },
            { value: "paid", label: "Paid" },
            { value: "unpaid", label: "Unpaid" },
            { value: "partial", label: "Partial" },
            { value: "overdue", label: "Overdue" },
          ]}
          style={{ flex: "0 1 150px" }}
        />
        <Select
          label="Department"
          value={deptFilter}
          onChange={setDeptFilter}
          options={depts.map((d) => ({
            value: d,
            label: d === "all" ? "All departments" : d,
          }))}
          style={{ flex: "0 1 170px" }}
        />
        {(search || statusFilter !== "all" || deptFilter !== "all") && (
          <Btn
            variant="ghost"
            small
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setDeptFilter("all");
            }}
          >
            ✕ Clear filters
          </Btn>
        )}
      </div>

      {/* ── Bulk Actions ── */}
      {selectedIds.size > 0 && (
        <div
          style={{
            background: T.primaryLt,
            border: `1px solid #BDD5F9`,
            borderRadius: 12,
            padding: "10px 16px",
            marginBottom: 12,
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 13, color: T.primary, fontWeight: 600 }}>
            {selectedIds.size} selected
          </span>
          <Btn variant="success" small onClick={bulkMarkPaid}>
            ✅ Mark Paid
          </Btn>
          <Btn variant="danger" small onClick={bulkDelete}>
            🗑️ Delete
          </Btn>
          <Btn variant="ghost" small onClick={() => setSelectedIds(new Set())}>
            ✕ Deselect
          </Btn>
        </div>
      )}

      {/* ── Table ── */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr
                style={{
                  background: T.bg,
                  borderBottom: `2px solid ${T.border}`,
                }}
              >
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    width: 44,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === filtered.length &&
                      filtered.length > 0
                    }
                    onChange={toggleSelectAll}
                    style={{ cursor: "pointer", accentColor: T.primary }}
                  />
                </th>
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    style={{
                      padding: "12px 14px",
                      textAlign: col.right ? "right" : "left",
                      color: T.sub,
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.4px",
                      cursor: "pointer",
                      userSelect: "none",
                      width: col.w,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label.toUpperCase()} <SortIcon col={col.key} />
                  </th>
                ))}
                <th
                  style={{
                    padding: "12px 14px",
                    color: T.sub,
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.4px",
                  }}
                >
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLS.length + 2}
                    style={{
                      padding: "48px",
                      textAlign: "center",
                      color: T.muted,
                    }}
                  >
                    No invoices match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    style={{ borderBottom: `1px solid ${T.border}` }}
                  >
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(inv.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelect(inv.id);
                        }}
                        style={{ cursor: "pointer", accentColor: T.primary }}
                      />
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{
                        padding: "12px 14px",
                        color: T.primary,
                        fontWeight: 600,
                      }}
                    >
                      {inv.id}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{ padding: "12px 14px" }}
                    >
                      <div style={{ fontWeight: 600, color: T.text }}>
                        {inv.patient}
                      </div>
                      <div style={{ fontSize: 11, color: T.muted }}>
                        {inv.pid}
                      </div>
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{ padding: "12px 14px", color: T.sub }}
                    >
                      {inv.dept}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{ padding: "12px 14px", color: T.sub }}
                    >
                      {inv.date}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{
                        padding: "12px 14px",
                        color: inv.status === "overdue" ? T.red : T.sub,
                      }}
                    >
                      {inv.due}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{
                        padding: "12px 14px",
                        textAlign: "right",
                        fontWeight: 700,
                        color: T.text,
                      }}
                    >
                      {fmt(inv.amount)}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{
                        padding: "12px 14px",
                        textAlign: "right",
                        color: T.teal,
                        fontWeight: 600,
                      }}
                    >
                      {fmt(inv.paid)}
                    </td>
                    <td
                      onClick={() => setSelectedInv(inv)}
                      style={{ padding: "12px 14px" }}
                    >
                      <StatusBadge status={inv.status} />
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Btn
                          variant="outline"
                          small
                          onClick={() => setSelectedInv(inv)}
                        >
                          View
                        </Btn>
                        {inv.status !== "paid" && (
                          <Btn
                            variant="success"
                            small
                            onClick={() => updateStatus(inv.id, "paid")}
                          >
                            Pay
                          </Btn>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: T.bg,
            fontSize: 12,
            color: T.muted,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>
            Showing {filtered.length} of {invoices.length} invoices
          </span>
          <span style={{ fontWeight: 600, color: T.text }}>
            Filtered total: {fmt(filtered.reduce((s, i) => s + i.amount, 0))}
            &nbsp;·&nbsp; Collected:{" "}
            {fmt(filtered.reduce((s, i) => s + i.paid, 0))}
          </span>
        </div>
      </div>

      {/* ── Modals ── */}
      {selectedInv && (
        <InvoiceModal
          invoice={selectedInv}
          onClose={() => setSelectedInv(null)}
          onUpdateStatus={updateStatus}
          onRecordPayment={recordPayment}
        />
      )}
      {showNew && (
        <NewInvoiceModal
          onClose={() => setShowNew(false)}
          onSave={addInvoice}
        />
      )}

      <style>{`
        @keyframes slideIn { from { transform:translateY(-10px); opacity:0; } to { transform:translateY(0); opacity:1; } }
      `}</style>
    </div>
  );
}
