const platforms = [
  {
    icon: "architecture",
    name: "Smart Growth",
    desc: "Protecting neighbourhoods and managing density on the Trafalgar corridor. We need infrastructure that matches our ambition.",
    items: ["Traffic Congestion Fixes", "Sensible Housing Strategies"],
  },
  {
    icon: "commute",
    name: "Tackle Traffic",
    desc: "Faster, better connected, and realistic transit solutions. Moving Ward 5 residents efficiently every single day.",
    items: ["Priority Corridors", "Frequent Service Reliability"],
  },
  {
    icon: "campaign",
    name: "Strong Leadership",
    desc: "Community-minded leadership that gets things done for Ward 5. A relentless advocate for local interests on Council.",
    items: ["Results-Driven Advocacy", "Community-First Decisions"],
  },
];

export default function PlatformSection() {
  return (
    <section id="vision" className="platform">
      <div className="platform-inner">
        <h2 className="platform-heading">
          The <span className="accent">Blueprint.</span>
        </h2>
        <div className="platform-grid">
          {platforms.map(({ icon, name, desc, items }) => (
            <div className="platform-card" key={name}>
              <span className="material-symbols-outlined platform-icon">{icon}</span>
              <h3 className="platform-card-title">{name}</h3>
              <p className="platform-card-desc">{desc}</p>
              <ul className="platform-card-items">
                {items.map((item) => (
                  <li className="platform-card-item" key={item}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
