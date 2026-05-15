export const initialPatients = [
  {
    id: 1,
    name: "Ahmed Khan",
    ward: "Ward 4",
    dept: "Cardiology",
    status: "Stable",
    age: 52,
    admitted: "2026-05-08",
  },
  {
    id: 2,
    name: "Sara Raza",
    ward: "ICU",
    dept: "Neurology",
    status: "Critical",
    age: 34,
    admitted: "2026-05-10",
  },
  {
    id: 3,
    name: "Murad Ali",
    ward: "Ward 2",
    dept: "General",
    status: "Observation",
    age: 45,
    admitted: "2026-05-09",
  },
  {
    id: 4,
    name: "Fatima Noor",
    ward: "Ward 6",
    dept: "Orthopedics",
    status: "Recovery",
    age: 28,
    admitted: "2026-05-07",
  },
  {
    id: 5,
    name: "Zain Malik",
    ward: "Ward 1",
    dept: "Pulmonology",
    status: "Stable",
    age: 61,
    admitted: "2026-05-06",
  },
  {
    id: 6,
    name: "Hina Qureshi",
    ward: "Ward 3",
    dept: "Gynecology",
    status: "Recovery",
    age: 30,
    admitted: "2026-05-10",
  },
  {
    id: 7,
    name: "Bilal Hassan",
    ward: "ICU",
    dept: "Cardiology",
    status: "Critical",
    age: 70,
    admitted: "2026-05-11",
  },
  {
    id: 8,
    name: "Nadia Shah",
    ward: "Ward 5",
    dept: "Pediatrics",
    status: "Stable",
    age: 8,
    admitted: "2026-05-09",
  },
];

export const initialInventory = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    stock: 842,
    max: 1000,
    unit: "units",
    critical: false,
  },
  {
    id: 2,
    name: "IV Saline Bags",
    stock: 310,
    max: 500,
    unit: "units",
    critical: false,
  },
  {
    id: 3,
    name: "Surgical Gloves (M)",
    stock: 1200,
    max: 1600,
    unit: "pairs",
    critical: false,
  },
  {
    id: 4,
    name: "Syringes 5ml",
    stock: 48,
    max: 300,
    unit: "units",
    critical: true,
  },
  {
    id: 5,
    name: "Oxygen Cylinders",
    stock: 12,
    max: 36,
    unit: "units",
    critical: true,
  },
  {
    id: 6,
    name: "Blood Bags (O+)",
    stock: 67,
    max: 120,
    unit: "units",
    critical: false,
  },
];

export const weeklyData = [
  { day: "Mon", admissions: 42, discharges: 35 },
  { day: "Tue", admissions: 38, discharges: 41 },
  { day: "Wed", admissions: 55, discharges: 48 },
  { day: "Thu", admissions: 49, discharges: 52 },
  { day: "Fri", admissions: 61, discharges: 44 },
  { day: "Sat", admissions: 33, discharges: 29 },
  { day: "Sun", admissions: 47, discharges: 38 },
];

export const deptData = [
  { name: "Cardiology", value: 28 },
  { name: "General", value: 35 },
  { name: "Neurology", value: 18 },
  { name: "Orthopedics", value: 12 },
  { name: "Pediatrics", value: 22 },
  { name: "Others", value: 15 },
];

export const DEPT_COLORS = [
  "#1D9E75",
  "#EF9F27",
  "#378ADD",
  "#D4537E",
  "#7F77DD",
  "#888780",
];

// ─── Status Helpers ───────────────────────────────────────────────────────

export const STATUS_STYLE = {
  Stable: { bg: "#E1F5EE", color: "#085041" },
  Critical: { bg: "#FCEBEB", color: "#791F1F" },
  Observation: { bg: "#FAEEDA", color: "#633806" },
  Recovery: { bg: "#E6F1FB", color: "#0C447C" },
};

export const AVATAR_COLORS = [
  { bg: "#E1F5EE", color: "#085041" },
  { bg: "#E6F1FB", color: "#0C447C" },
  { bg: "#FAEEDA", color: "#633806" },
  { bg: "#FCEBEB", color: "#791F1F" },
  { bg: "#EEEDFE", color: "#26215C" },
  { bg: "#FAECE7", color: "#4A1B0C" },
];

export const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export const getAvatarColor = (id) =>
  AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
