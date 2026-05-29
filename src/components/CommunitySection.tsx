const photos = [
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51.jpg",    alt: "Sue with community" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51(1).jpg", alt: "Sue at community event" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51(2).jpg", alt: "Sue with supporters" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51(3).jpg", alt: "Sue with Ward 5 residents" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51(4).jpg", alt: "Sue at local event" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-51(5).jpg", alt: "Sue with volunteers" },
  { src: "/images/sue/PHOTO-2026-05-28-01-43-46.jpg",    alt: "Sue Heddle" },
  { src: "/images/sue/PHOTO-2026-05-28-19-10-52.jpg",    alt: "Sue at campaign event" },
];

export default function CommunitySection() {
  return (
    <section className="community-section" id="community-support">
      <h2 className="community-heading">Community Support</h2>
      <div className="slider-container">
        <div className="slider-track">
          {photos.map(({ src, alt }) => (
            <img key={src} src={src} alt={alt} className="slider-image" />
          ))}
          {photos.map(({ src, alt }) => (
            <img key={`dup-${src}`} src={src} alt={alt} className="slider-image" aria-hidden="true" />
          ))}
        </div>
      </div>
      <p className="community-caption">
        Sue has been a fixture in Oakville for years, championing local causes and
        building a more connected Ward 5 through action, not just words.
      </p>
    </section>
  );
}
