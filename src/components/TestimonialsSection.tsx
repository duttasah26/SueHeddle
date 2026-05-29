const testimonials = [
  {
    quote:
      "Sue actually listens. She understands the pressure Trafalgar is under and has a real plan to fix it.",
    name: "Mark Stevens",
    role: "Oak Park Resident",
  },
  {
    quote:
      "Her leadership with Hockey Cares showed me she’s not just a politician, she’s a community builder.",
    name: "Sarah L.",
    role: "Local Business Owner",
  },
  {
    quote:
      "Sue’s vision for smart growth is exactly what Ward 5 needs to stay livable for future generations.",
    name: "James Chen",
    role: "Retired Engineer",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="experience">
      <div className="testimonials-inner">
        <h2 className="testimonials-heading">Voices of Ward 5</h2>
        <div className="testimonials-grid">
          {testimonials.map(({ quote, name, role }) => (
            <div className="testimonial-card" key={name}>
              <div>
                <span className="material-symbols-outlined testimonial-quote-icon">
                  format_quote
                </span>
                <p className="testimonial-text">&ldquo;{quote}&rdquo;</p>
              </div>
              <div>
                <p className="testimonial-name">{name}</p>
                <p className="testimonial-role">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
