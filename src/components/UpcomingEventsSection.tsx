import EventMap from "@/components/EventMap";

interface EventItem {
  id: string;
  title: string;
  dateLabel: string;
  venueName: string;
  address: string;
  // Resolved once via Google's Geocoding API for this exact address — kept
  // as plain numbers so the map doesn't depend on geocoding happening again
  // in the browser (or on the Geocoding API being enabled for the key).
  lat: number;
  lng: number;
  // Kept as separate lines rather than one blob so each beat of the pitch
  // gets its own line instead of reflowing into a wall of text.
  descriptionLines: string[];
  url: string;
}

// Manually maintained for now (per explicit request — no Eventbrite API
// credentials yet). Shape mirrors what Eventbrite's API returns closely on
// purpose: swapping this for a live `GET /organizations/{org_id}/events/`
// fetch later should only mean replacing this constant with fetched data,
// not touching the JSX below.
const EVENTS: EventItem[] = [
  {
    id: "giving-in-action-brunch",
    title: "Giving in Action Brunch",
    dateLabel: "Sunday, September 27 · 11 AM – 2 PM",
    venueName: "The Pipes and Taps Pub",
    address: "231 Oak Park Boulevard #101, Oakville, ON L6H 7S8",
    lat: 43.4821225,
    lng: -79.7163373,
    descriptionLines: [
      "Help us support local families through our Winter Coat Drive for Safetynet.",
      "Come for brunch. Meet Sue. Bring a friend. Sign up to canvass. Get ready to vote early.",
      "Suggested donation: $25.",
    ],
    url: "https://www.eventbrite.ca/e/giving-in-action-brunch-tickets-2000901940567?aff=ebdssbdestsearch",
  },
];

export default function UpcomingEventsSection() {
  return (
    <section className="events-section" id="events">
      <div className="events-inner">
        <p className="events-eyebrow">Join Us</p>
        <h2 className="events-heading">
          Upcoming <span className="accent">Events</span>
        </h2>

        {EVENTS.length === 0 ? (
          <p className="events-empty">No upcoming events right now — check back soon.</p>
        ) : (
          <div className="events-grid">
            {EVENTS.map((ev) => (
              <div className="event-card" key={ev.id}>
                <div className="event-card-info">
                  <p className="event-card-date">{ev.dateLabel}</p>
                  <h3 className="event-card-title">{ev.title}</h3>
                  <p className="event-card-venue">
                    {ev.venueName}
                    <br />
                    {ev.address}
                  </p>
                  <div className="event-card-desc">
                    {ev.descriptionLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <a href={ev.url} target="_blank" rel="noopener noreferrer" className="event-card-btn">
                    Sign Up
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                </div>
                <div className="event-card-map">
                  <EventMap lat={ev.lat} lng={ev.lng} title={ev.venueName} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
