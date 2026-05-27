const credentials = [
  {
    icon: "work",
    title: "The CEO Edge",
    desc: "25+ years of real-world business leadership. She doesn't just manage; she innovates.",
  },
  {
    icon: "groups",
    title: "Community Architect",
    desc: "Decades of service on Oakville boards, shaping the city from the ground up.",
  },
];

export default function CredentialsSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <div className="experience-left">
          <h2 className="experience-heading">
            Proven.{" "}
            <span className="accent">Period.</span>
          </h2>
          <div className="experience-items">
            {credentials.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div className="experience-item" key={title}>
                <div className="experience-icon-box">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                  <h4 className="experience-item-title">{title}</h4>
                  <p className="experience-item-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="experience-right">
          <img
            src="/images/oakville-downtown.jpg"
            alt="Partnership"
            className="experience-photo"
          />
          <img
            src="/images/oakville-lake.jpg"
            alt="Planning"
            className="experience-photo"
          />
        </div>
      </div>
    </section>
  );
}
