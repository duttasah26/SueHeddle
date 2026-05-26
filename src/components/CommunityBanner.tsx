export default function CommunityBanner() {
  return (
    <div className="community">
      <div className="community-inner">
        <div className="community-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div>
          <p className="community-label">Community Initiative</p>
          <p className="community-title">Hockey Cares</p>
          <p className="community-desc">
            Sue is proud to give back through Hockey Cares — a community initiative close to
            her heart that supports local families and youth through the sport she loves.
          </p>
        </div>
        <a href="#get-involved" className="btn-ghost community-cta">Learn More</a>
      </div>
    </div>
  );
}
