const stats = [
  { value: "20+ Years", label: "Oakville Resident" },
  { value: "3× Centurion", label: "Award-Winning Professional" },
  { value: "Top 1.6%", label: "OMDREB Sales Performance" },
  { value: "Hockey Cares", label: "Community Initiative" },
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
