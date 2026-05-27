const platforms = [
  {
    icon: "architecture",
    name: "Smart Growth",
    desc: "Stop reckless development. We need infrastructure that matches our ambition, keeping traffic moving.",
    items: ["Traffic congestion fixes", "Sensible housing strategies"],
  },
  {
    icon: "shield_person",
    name: "Unyielding Safety",
    desc: "A safe community isn't a luxury. We're prioritizing neighbourhood watch expansion and street lighting.",
    items: ["Neighbourhood watch expansion", "Street lighting improvements"],
  },
  {
    icon: "account_balance",
    name: "Radical Clarity",
    desc: "It's your money. Every cent should be accounted for with total transparency and zero political games.",
    items: ["Full budget transparency", "Zero-tolerance accountability"],
  },
  {
    icon: "park",
    name: "Green Defense",
    desc: "Our parks are our legacy. I will fight tooth and nail to protect our green spaces from urban sprawl.",
    items: ["Green space protection", "Tree canopy preservation"],
  },
];

export default function PlatformSection() {
  return (
    <section id="platform" className="platform">
      <div className="platform-inner">
        <div className="platform-header">
          <h2 className="platform-heading">
            The{" "}
            <span className="accent">Blueprint.</span>
          </h2>
        </div>
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
