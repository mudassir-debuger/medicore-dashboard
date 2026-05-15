function DoctorCard({ doctor }) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "10px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: "auto",
          background: doctor.bg,
          color: doctor.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {doctor.initial}
      </div>

      <div style={{ marginTop: "8px", fontWeight: "500" }}>{doctor.name}</div>

      <div style={{ fontSize: "12px", color: "gray" }}>{doctor.dept}</div>

      <div
        style={{
          marginTop: "5px",
          fontSize: "11px",
          background: doctor.bg,
          color: doctor.color,
          padding: "3px 8px",
          borderRadius: "20px",
          display: "inline-block",
        }}
      >
        {doctor.slots} slots open
      </div>
    </div>
  );
}

export default DoctorCard;
