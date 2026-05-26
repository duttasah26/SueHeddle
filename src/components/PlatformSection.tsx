const platforms = [
  {
    name: "Safer Neighbourhoods",
    desc: "Working with community partners, Halton Police, and residents to ensure Ward 4 remains safe, welcoming, and well-lit — from parks and pathways to our streets.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Infrastructure & Roads",
    desc: "Prioritizing the maintenance and improvement of Ward 4's roads, sidewalks, and transit connections — because your daily commute and walkability matter.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    name: "Fiscal Accountability",
    desc: "Championing responsible spending, evidence-based decisions, and full transparency in how Oakville's tax dollars are put to work in Ward 4.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Environmental Stewardship",
    desc: "Protecting Ward 4's green spaces, tree canopy, and natural heritage — advocating for sustainable, responsible development in every planning decision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: "Community Voice",
    desc: "Regular town halls, an open-door policy, and accessible representation for every resident — because good governance starts with listening.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: "Families & Youth",
    desc: "Supporting recreation programs, youth sports, and the services that help Ward 4 families thrive — from early childhood and through the teenage years.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function PlatformSection() {
  return (
    <section id="platform" className="platform">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">My Platform</span>
            <h2 className="section-title">A Vision for Ward 4</h2>
          </div>
        </div>
        <div className="platform-grid">
          {platforms.map(({ name, desc, icon }) => (
            <div className="platform-card" key={name}>
              <div className="platform-icon">{icon}</div>
              <div className="platform-name">{name}</div>
              <p className="platform-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
