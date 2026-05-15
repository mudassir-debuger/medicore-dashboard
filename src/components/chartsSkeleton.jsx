import "../Styles/loadingCharts.css";
const ChartsSkeleton = () => {
  return (
    <div className="charts-row">
      <div className="section-card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-chart" />
      </div>

      <div className="section-card">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-chart" />
      </div>
    </div>
  );
};
export default ChartsSkeleton;
