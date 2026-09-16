// youtube-nocookie.com is YouTube's privacy-enhanced domain — it doesn't set
// tracking cookies until the viewer actually plays the video, which keeps the
// third-party-cookie count down (that audit already bit us once with Stripe).
// The embed plays inline on the page; it doesn't send anyone off to YouTube.
//
// cc_load_policy=0 = don't switch YouTube's caption track on by default, since
// the video already carries its own captions and the CC layer would double up.
// (This can't override a viewer who has "always show captions" set on their
// own YouTube account — YouTube intentionally lets that preference win.)
const YOUTUBE_ID = "RDOUTNyGsi0";
const VIDEO_TITLE = "Sue Heddle for Ward 5 Councillor";
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?cc_load_policy=0`;

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="video-section-inner">
        <div className="video-section-frame">
          <iframe
            src={EMBED_SRC}
            title={VIDEO_TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
