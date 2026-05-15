function StatCard({ label, value, color, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-val" style={{ color }}>
        {value}
      </div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

export default StatCard;
