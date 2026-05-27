const stats = [
  { value: "20+", label: "Years of Local Roots" },
  { value: "400+", label: "Wins for Neighbors" },
  { value: "100%", label: "Unfiltered Dedication" },
];

export default function StatsStrip() {
  return (
    <div className="stats">
      <div className="stats-inner">
        {stats.map(({ value, label }) => (
          <div className="stat-item" key={label}>
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
