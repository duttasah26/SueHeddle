"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    { quoteKey: "testimonials.t1Quote", nameKey: "testimonials.t1Name", roleKey: "testimonials.t1Role" },
    { quoteKey: "testimonials.t2Quote", nameKey: "testimonials.t2Name", roleKey: "testimonials.t2Role" },
    { quoteKey: "testimonials.t3Quote", nameKey: "testimonials.t3Name", roleKey: "testimonials.t3Role" },
  ];

  return (
    <section className="testimonials-section" id="experience">
      <div className="testimonials-inner">
        <h2 className="testimonials-heading">{t("testimonials.heading")}</h2>
        <div className="testimonials-grid">
          {testimonials.map(({ quoteKey, nameKey, roleKey }) => (
            <div className="testimonial-card" key={nameKey}>
              <div>
                <span className="material-symbols-outlined testimonial-quote-icon">
                  format_quote
                </span>
                <p className="testimonial-text">&ldquo;{t(quoteKey)}&rdquo;</p>
              </div>
              <div>
                <p className="testimonial-name">{t(nameKey)}</p>
                <p className="testimonial-role">{t(roleKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
