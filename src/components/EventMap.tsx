"use client";

import { useEffect, useRef, useState } from "react";

let bootstrapped = false;

/**
 * Google's own official bootstrap loader for `google.maps.importLibrary`
 * (see https://developers.google.com/maps/documentation/javascript/load-maps-js-api).
 * This defines `importLibrary` synchronously, before the real API script has
 * even loaded, and queues whatever libraries get requested.
 *
 * We use this instead of hand-rolling a `<script>` tag + onload promise
 * because real Chrome can independently load its own copy of the Maps JS
 * API in the background (address-autofill-related, unrelated to this page)
 * under a different API key. That collides on the shared `window.google.maps`
 * namespace and can leave `importLibrary` undefined depending on load order.
 * Google's loader guards against exactly this — it only ever assigns
 * `importLibrary` once and safely no-ops (with a console.warn) on repeat
 * calls instead of getting clobbered.
 */
function bootstrapMapsLoader(apiKey: string) {
  if (bootstrapped) return;
  bootstrapped = true;
  /* eslint-disable */
  (function (g: any) {
    let h: any, a: any, k: any;
    const p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__";
    const m = document as any, b = window as any;
    const bb = (b[c] ||= {});
    const d = (bb.maps ||= {});
    const r = new Set(), e = new URLSearchParams();
    const u = () =>
      h ||
      (h = new Promise(async (f: any, n: any) => {
        a = m.createElement("script");
        e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, (t: string) => "_" + t[0].toLowerCase()), g[k]);
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f: any, ...n: any[]) => r.add(f) && u().then(() => d[l](f, ...n)));
  })({ key: apiKey, v: "weekly" });
  /* eslint-enable */
}

interface EventMapProps {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
}

const BASE_ZOOM = 15;
const BASE_SIZE = 48;

/**
 * Marker size that tracks the zoom level, so the pin stays proportional to
 * what's actually on screen instead of being a fixed blob. Clamped at both
 * ends so it never vanishes when zoomed out or swallows the map zoomed in.
 */
function iconSizeForZoom(z: number) {
  return Math.round(Math.min(72, Math.max(22, BASE_SIZE * Math.pow(1.15, z - BASE_ZOOM))));
}

/** A Google Map centered on {lat, lng} with our brand icon as the destination marker. */
export default function EventMap({ lat, lng, title, zoom = 15 }: EventMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // Derived at init rather than set from inside the effect — a missing key is
  // knowable up front, so there's no reason to trigger an extra render for it.
  const [failed, setFailed] = useState(!apiKey);

  useEffect(() => {
    let cancelled = false;
    let zoomListener: google.maps.MapsEventListener | undefined;
    if (!apiKey) return;

    bootstrapMapsLoader(apiKey);

    (async () => {
      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        // AdvancedMarkerElement replaces the deprecated google.maps.Marker.
        // Its content is a plain DOM node, which is also what makes the
        // zoom-based resizing below trivial (just restyle the <img>).
        const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        if (cancelled || !containerRef.current) return;

        const position = { lat, lng };
        const map = new Map(containerRef.current, {
          center: position,
          zoom,
          // AdvancedMarkerElement requires a Map ID. DEMO_MAP_ID works out of
          // the box but is intended for development — set
          // NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID to a real one from Cloud Console
          // (Maps → Map Management → Create Map ID, type "JavaScript / Vector").
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        });

        const pin = document.createElement("img");
        pin.src = "/images/icons/circle_icon.png";
        pin.alt = "";
        const applySize = (z: number) => {
          const size = iconSizeForZoom(z);
          pin.style.width = `${size}px`;
          pin.style.height = `${size}px`;
        };
        applySize(zoom);

        new AdvancedMarkerElement({ position, map, title, content: pin });

        zoomListener = map.addListener("zoom_changed", () => {
          applySize(map.getZoom() ?? zoom);
        });
      } catch (err) {
        console.error("EventMap failed to render Google Map:", err);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      zoomListener?.remove();
    };
  }, [lat, lng, title, zoom, apiKey]);

  if (failed) {
    // Falls back to the key-free embed if the API key is missing/invalid at runtime.
    return (
      <iframe
        src={`https://www.google.com/maps?q=${lat},${lng}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map to ${title}`}
      />
    );
  }

  return <div ref={containerRef} className="event-card-map-canvas" role="img" aria-label={`Map showing the location of ${title}`} />;
}
