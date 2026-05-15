function Topbar() {
  return (
    <div className="topbar">
      <div>
        <div className="page-title">Appointment Dashboard</div>
        <div className="page-sub">Wednesday, 29 April 2026</div>
      </div>

      <div className="topbar-right">
        <div className="search-box">Search patients...</div>

        <button className="btn btn-primary">+ New Appointment</button>
      </div>
    </div>
  );
}

export default Topbar;
