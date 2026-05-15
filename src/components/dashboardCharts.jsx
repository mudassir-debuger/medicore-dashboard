import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardCharts({ weeklyData, deptData, DEPT_COLORS }) {
  return (
    <div className="charts-row">
      {/* Bar Chart */}
      <div className="section-card">
        <div className="section-card__title">
          Weekly Admissions vs Discharges
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="admissions" fill="#1D9E75" />
            <Bar dataKey="discharges" fill="#85B7EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="section-card">
        <div className="section-card__title">Patients by Department</div>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={deptData} dataKey="value">
              {deptData.map((_, i) => (
                <Cell key={i} fill={DEPT_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
