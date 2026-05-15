import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  CalendarDays,
  BarChart,
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../Styles/sideBar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">Main Menu</div>

      <NavLink
        to="/"
        end
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink
        to="/appointments"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <Calendar size={18} /> Appointments
      </NavLink>

      <NavLink
        to="/patients"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <Users size={18} /> Patients
      </NavLink>

      <NavLink
        to="/doctors"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <Stethoscope size={18} /> Doctors
      </NavLink>

      <NavLink
        to="/schedule"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <CalendarDays size={18} /> Schedule
      </NavLink>

      <div className="sidebar-section">Reports</div>

      <NavLink
        to="/billing"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FileText size={18} /> Billing
      </NavLink>
    </aside>
  );
}

export default Sidebar;
