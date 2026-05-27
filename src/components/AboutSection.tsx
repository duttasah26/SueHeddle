export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-photo-wrap">
          <img
            src="/images/oakville-park.jpg"
            alt="Sue Heddle in the community"
            className="about-photo"
          />
          <div className="about-photo-accent" />
        </div>
        <div className="about-content">
          <h2 className="about-heading">
            Rooted in{" "}
            <span className="accent">Results.</span>
          </h2>
          <p className="about-lead">
            Oakville isn&apos;t just a location for Sue — it&apos;s the foundation of her
            life. For over two decades, she&apos;s been on the ground.
          </p>
          <p className="about-body">
            As a veteran business owner, she knows how to manage a budget, lead a
            team, and get things done. She&apos;s not a career politician; she&apos;s a
            neighbour who&apos;s had enough of talk and is ready for bold action.
          </p>
        </div>
      </div>
    </section>
  );
}
