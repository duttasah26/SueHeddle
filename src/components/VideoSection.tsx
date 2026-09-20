"use client";

import { useState } from "react";

// youtube-nocookie.com is YouTube's privacy-enhanced domain — it doesn't set
// tracking cookies until the viewer actually plays the video, which keeps the
// third-party-cookie count down (that audit already bit us once with Stripe).
//
// cc_load_policy=0 = don't switch YouTube's caption track on by default, since
// the video already carries its own captions and the CC layer would double up.
// (This can't override a viewer who has "always show captions" set on their
// own YouTube account — YouTube intentionally lets that preference win.)
const YOUTUBE_ID = "RDOUTNyGsi0";
const VIDEO_TITLE = "Sue Heddle for Ward 5 Councillor";

// Poster frame straight from YouTube's image CDN (~30KB) instead of the
// ~850KB player bundle.
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

/**
 * Click-to-play facade.
 *
 * The plain <iframe> here loaded 848 KiB of player JS and burned ~460ms of
 * main-thread time during page load, even with loading="lazy" — the section
 * sits just below the hero, so Chrome fetched it eagerly anyway. That was the
 * main cause of the 2.3s LCP "element render delay" on mobile: the hero image
 * finished downloading in 300ms but couldn't paint because the main thread was
 * busy parsing YouTube's bundle.
 *
 * Now nothing but a poster image loads until someone actually clicks play.
 * autoplay=1 on the swapped-in iframe means the click still starts playback,
 * so it costs the viewer nothing.
 */
export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="video-section">
      <div className="video-section-inner">
        <div className="video-section-frame">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?cc_load_policy=0&autoplay=1`}
              title={VIDEO_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="video-facade"
              onClick={() => setPlaying(true)}
              // Warm up the connection on intent so the player starts fetching
              // a beat earlier than the click itself.
              onMouseEnter={warmConnections}
              onFocus={warmConnections}
              aria-label={`Play video: ${VIDEO_TITLE}`}
            >
              {/* Plain <img>, not next/image: this is a third-party URL and
                  routing it through the optimizer would add a Vercel image
                  cache write per variant for no benefit — that meter is
                  already over quota. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="video-facade-poster" src={POSTER} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span className="video-facade-play" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48" focusable="false">
                  <path
                    d="M66.52 7.74a8.57 8.57 0 0 0-6-6C55.2.44 34 .44 34 .44s-21.2 0-26.52 1.3a8.57 8.57 0 0 0-6 6C.18 13.06.18 24 .18 24s0 10.94 1.3 16.26a8.57 8.57 0 0 0 6 6c5.32 1.3 26.52 1.3 26.52 1.3s21.2 0 26.52-1.3a8.57 8.57 0 0 0 6-6c1.3-5.32 1.3-16.26 1.3-16.26s0-10.94-1.3-16.26Z"
                    fill="#f00"
                  />
                  <path d="M27.2 34.27 44.83 24 27.2 13.73Z" fill="#fff" />
                </svg>
              </span>
              <span className="video-facade-title">{VIDEO_TITLE}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

let warmed = false;
function warmConnections() {
  if (warmed) return;
  warmed = true;
  for (const href of ["https://www.youtube-nocookie.com", "https://www.google.com"]) {
    const l = document.createElement("link");
    l.rel = "preconnect";
    l.href = href;
    document.head.appendChild(l);
  }
}
