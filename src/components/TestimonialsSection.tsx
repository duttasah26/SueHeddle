"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import en from "@/i18n/en.json";
import Reveal from "@/components/Reveal";

// Testimonials are direct quotes attributed to real, named people — always
// shown in English (the language they were actually given in), regardless
// of the site's active locale, so we never put words in their mouths.
export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: en.testimonials.t1Quote,
      name: en.testimonials.t1Name,
      role: en.testimonials.t1Role,
      image: "/images/testimonial/safetynet.png",
      imagePosition: "center",
    },
    {
      quote: en.testimonials.t2Quote,
      name: en.testimonials.t2Name,
      role: en.testimonials.t2Role,
      image: "/images/testimonial/hailey_chum.png",
      imagePosition: "center top",
    },
    {
      quote: en.testimonials.t3Quote,
      name: en.testimonials.t3Name,
      role: en.testimonials.t3Role,
      image: "/images/testimonial/bridget.jpg",
      imagePosition: "center top",
    },
  ];

  return (
    <section className="testimonials-section" id="experience">
      <div className="testimonials-inner">
        <Reveal as="h2" className="testimonials-heading">{t("testimonials.heading")}</Reveal>
        <div className="testimonials-grid">
          {testimonials.map(({ quote, name, role, image, imagePosition }, i) => (
            <Reveal className="testimonial-card" delay={i * 0.12} slide={false} key={name}>
              {image ? (
                <div className="testimonial-avatar-wrap">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="120px"
                    className="testimonial-avatar"
                    style={imagePosition ? { objectPosition: imagePosition } : undefined}
                  />
                </div>
              ) : (
                <div className="testimonial-avatar-icon">
                  <span className="material-symbols-outlined">person</span>
                </div>
              )}
              <p className="testimonial-name">{name}</p>
              <p className="testimonial-role">{role}</p>
              <p className="testimonial-text">&ldquo;{quote}&rdquo;</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
