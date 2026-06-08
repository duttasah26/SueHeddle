"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quoteKey: "testimonials.t1Quote",
      nameKey: "testimonials.t1Name",
      roleKey: "testimonials.t1Role",
      image: "/images/testimonial/anita-anand.jpg",
      imagePosition: "50% 20%",
    },
    {
      quoteKey: "testimonials.t2Quote",
      nameKey: "testimonials.t2Name",
      roleKey: "testimonials.t2Role",
      image: "/images/testimonial/hailey_chum.png",
      imagePosition: "center top",
    },
    {
      quoteKey: "testimonials.t3Quote",
      nameKey: "testimonials.t3Name",
      roleKey: "testimonials.t3Role",
      image: "/images/testimonial/safetynet.png",
      imagePosition: "center top",
    },
  ];

  return (
    <section className="testimonials-section" id="experience">
      <div className="testimonials-inner">
        <h2 className="testimonials-heading">{t("testimonials.heading")}</h2>
        <div className="testimonials-grid">
          {testimonials.map(({ quoteKey, nameKey, roleKey, image, imagePosition }) => (
            <div className="testimonial-card" key={nameKey}>
              {image ? (
                <div className="testimonial-avatar-wrap">
                  <img
                    src={image}
                    alt={t(nameKey)}
                    className="testimonial-avatar"
                    style={imagePosition ? { objectPosition: imagePosition } : undefined}
                  />
                </div>
              ) : (
                <div className="testimonial-avatar-icon">
                  <span className="material-symbols-outlined">person</span>
                </div>
              )}
              <p className="testimonial-name">{t(nameKey)}</p>
              <p className="testimonial-role">{t(roleKey)}</p>
              <p className="testimonial-text">&ldquo;{t(quoteKey)}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
