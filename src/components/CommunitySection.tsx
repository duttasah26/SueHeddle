import FlowArt, { FlowSection } from './ui/story-scroll';

const sliderPhotos = [
  { src: "/images/sue/comm_spirit_3.jpg",  alt: "Sue with community" },
  { src: "/images/sue/comm_spirit_4.jpg",  alt: "Sue at community event" },
  { src: "/images/sue/comm_spirit_5.jpg",  alt: "Sue with supporters" },
  { src: "/images/sue/culture_1.jpg",      alt: "Sue with Ward 5 residents" },
  { src: "/images/sue/culture_2.jpg",      alt: "Sue at local event" },
  { src: "/images/sue/hockey_1.jpg",       alt: "Sue at Hockey Cares" },
  { src: "/images/sue/hockey_2.jpg",       alt: "Hockey Cares event" },
  { src: "/images/sue/award.jpg",          alt: "Sue receiving award" },
];

function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="flow-gallery">
      {images.map(({ src, alt }, i) => (
        <div key={i} className="flow-gallery-cell">
          <img src={src} alt={alt} className="flow-gallery-img" />
        </div>
      ))}
    </div>
  );
}

export default function CommunitySection() {
  return (
    <>
      <section className="community-section" id="community-support">
        <h2 className="community-heading">Community Support</h2>
        <div className="slider-container">
          <div className="slider-track">
            {sliderPhotos.map(({ src, alt }) => (
              <img key={src} src={src} alt={alt} className="slider-image" />
            ))}
            {sliderPhotos.map(({ src, alt }) => (
              <img key={`dup-${src}`} src={src} alt={alt} className="slider-image" aria-hidden="true" />
            ))}
          </div>
        </div>
        <p className="community-caption">
          Sue has been a fixture in Oakville for years, championing local causes and
          building a more connected Ward 5 through action, not just words.
        </p>
      </section>

      <FlowArt aria-label="Community Leadership">

        {/* 1 — Text LEFT, single image RIGHT */}
        <FlowSection
          aria-label="Community Leadership"
          style={{ backgroundColor: '#e70685', color: '#fff' }}
        >
          <div className="flow-text-image-row">
            <div className="flow-text-col">
              <p className="flow-eyebrow">Community Leadership</p>
              <hr className="flow-divider" />
              <h2 className="flow-heading">
                Rooted.<br />
                Ready.<br />
                Running.
              </h2>
              <hr className="flow-divider" />
              <p className="flow-body">
                Sue Heddle has spent years building meaningful connections across Oakville
                through hands-on community work, professional service, and a genuine commitment
                to bringing people together across different backgrounds.
              </p>
            </div>
            <img
              src="/images/sue/comm_spirit_4.jpg"
              alt="Sue with community members"
              className="flow-side-img"
            />
          </div>
        </FlowSection>

        {/* 2 — Gallery LEFT, text RIGHT */}
        <FlowSection
          aria-label="Hockey Cares — Bridging Communities Through Sport"
          style={{ backgroundColor: '#1a1c1c', color: '#fff' }}
        >
          <div className="flow-text-image-row">
            <Gallery images={[
              { src: "/images/sue/hockey_1.jpg",  alt: "Hockey Cares event" },
              { src: "/images/sue/hockey_2.jpg",  alt: "Hockey Cares community" },
              { src: "/images/sue/hockey_3.jpg",  alt: "Youth hockey program" },
              { src: "/images/sue/culture_3.jpg", alt: "Cultural exchange" },
            ]} />
            <div className="flow-text-col">
              <p className="flow-eyebrow">01 — Hockey Cares</p>
              <hr className="flow-divider" />
              <h2 className="flow-heading">
                Bridging<br />
                Communities<br />
                Through<br />
                Sport
              </h2>
              <hr className="flow-divider" />
              <p className="flow-body">
                Sue founded Hockey Cares in 2017 as a reconciliation initiative that unites
                Indigenous and non-Indigenous youth through hockey and cultural exchange.
                What began as a local project has grown into a nationally recognized program.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* 3 — Text LEFT, gallery RIGHT */}
        <FlowSection
          aria-label="National Recognition"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          <div className="flow-text-image-row">
            <div className="flow-text-col">
              <p className="flow-eyebrow">02 — National Recognition</p>
              <hr className="flow-divider" />
              <h2 className="flow-heading">
                Canadian<br />
                REALTORS<br />
                Care<br />
                Award
              </h2>
              <hr className="flow-divider" />
              <div className="flow-cols">
                <div className="flow-col">
                  <p className="flow-col-title">2026</p>
                  <p className="flow-col-desc">
                    Presented by the Canadian Real Estate Association — a national honour
                    recognizing Sue's outstanding contributions to community well-being.
                  </p>
                </div>
                <div className="flow-col">
                  <p className="flow-col-title">Hockey Cares</p>
                  <p className="flow-col-desc">
                    Sue's reconciliation initiative earned national recognition for its
                    impact on bridging communities across Canada.
                  </p>
                </div>
              </div>
              <hr className="flow-divider" />
              <p className="flow-body flow-body--end">
                Sport can be a powerful bridge between communities.
              </p>
            </div>
            <Gallery images={[
              { src: "/images/sue/award.jpg",   alt: "Sue receiving the REALTORS Care Award" },
              { src: "/images/sue/award_2.jpg", alt: "Award ceremony" },
              { src: "/images/sue/award_3.jpg", alt: "National recognition event" },
              { src: "/images/sue/hockey_1.jpg", alt: "Hockey Cares — the program behind the award" },
            ]} />
          </div>
        </FlowSection>

        {/* 4 — Gallery LEFT, text RIGHT */}
        <FlowSection
          aria-label="Professional Roots in Oakville"
          style={{ backgroundColor: '#fcf9f8', color: '#1c1b1b' }}
        >
          <div className="flow-text-image-row">
            <Gallery images={[
              { src: "/images/sue/comm_spirit_3.jpg", alt: "Sue in the Oakville community" },
              { src: "/images/sue/comm_spirit_5.jpg", alt: "Sue connecting with residents" },
              { src: "/images/sue/culture_1.jpg",     alt: "Community engagement" },
              { src: "/images/sue/culture_2.jpg",     alt: "Sue at a local event" },
            ]} />
            <div className="flow-text-col">
              <p className="flow-eyebrow">03 — Professional Roots in Oakville</p>
              <hr className="flow-divider" />
              <h2 className="flow-heading">
                Deep<br />
                Roots.<br />
                Deep<br />
                Knowledge.
              </h2>
              <hr className="flow-divider" />
              <p className="flow-body">
                As a REALTOR® with Century 21 Miller Real Estate Ltd., Sue has spent years
                developing a deep, practical understanding of Oakville&rsquo;s neighbourhoods,
                residents, and needs. Her professional work is not separate from her community
                work — it informs it.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* 5 — Text LEFT, gallery RIGHT */}
        <FlowSection
          aria-label="A Voice for Ward 5"
          style={{ backgroundColor: '#e70685', color: '#fff' }}
        >
          <div className="flow-text-image-row">
            <div className="flow-text-col">
              <p className="flow-eyebrow">04 — A Voice for Ward 5</p>
              <hr className="flow-divider" />
              <h2 className="flow-heading">
                Step<br />
                Forward.<br />
                Lead.
              </h2>
              <hr className="flow-divider" />
              <p className="flow-body">
                Sue is stepping forward to bring results-driven, compassionate leadership to
                Oakville Town Council. Her track record of founding programs, earning national
                recognition, and serving residents professionally makes her uniquely prepared
                to advocate for Ward 5.
              </p>
            </div>
            <Gallery images={[
              { src: "/images/sue/culture_1.jpg", alt: "Sue at a Ward 5 event" },
              { src: "/images/sue/culture_2.jpg", alt: "Sue with Oakville residents" },
              { src: "/images/sue/culture_3.jpg", alt: "Community gathering" },
              { src: "/images/sue/culture_4.jpg", alt: "Sue with local supporters" },
            ]} />
          </div>
        </FlowSection>

      </FlowArt>
    </>
  );
}
