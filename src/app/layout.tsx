import type { Metadata } from "next";
import { Lexend, JetBrains_Mono, Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import FooterSection from "@/components/FooterSection";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/contexts/LanguageContext";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sue Heddle for Ward 5 Councillor",
  description:
    "Sue Heddle is running for Ward 5 Councillor in Oakville's 2026 Municipal Election. Learn about her platform, community involvement, and how you can get involved.",
};

/**
 * Every Material Symbols glyph used anywhere in the app.
 *
 * With `icon_names` set, Google Fonts serves a font containing ONLY these
 * glyphs: the full variable font is 419 KB, this subset is 4 KB — a 99%
 * saving. On Slow 4G the full font was eating roughly two seconds of
 * bandwidth in direct competition with the HTML, CSS and hero image, which
 * is what kept First Contentful Paint at 4.5s despite a 187ms critical path.
 *
 * ADDING A NEW ICON? Add its ligature name here as well, or it will render
 * as the raw word ("expand_more") instead of the glyph. Keep it sorted.
 */
const ICON_NAMES = [
  "architecture", "arrow_back", "arrow_forward", "calculate", "campaign",
  "chat", "check", "check_circle", "chevron_left", "chevron_right", "close",
  "commute", "content_copy", "email", "expand_less", "expand_more", "favorite",
  "format_quote", "home", "info", "mail", "menu", "pause", "person",
  "play_arrow", "share", "volume_off", "volume_up",
].join(",");

const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" +
  `:opsz,wght,FILL,GRAD@48,400,1,0&icon_names=${ICON_NAMES}&display=block`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Poster frame for the click-to-play video facade. The player origin
            (youtube-nocookie.com) is deliberately NOT preconnected — nothing
            loads from it until someone clicks, and VideoSection warms that
            connection on hover/focus instead. Keep this list at 4 or fewer. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        {/* Material Symbols loader. This is a plain inline script rather than a
            React component on purpose: it runs while <head> is being parsed,
            long before hydration. The previous component-based version only ran
            after React hydrated, so on a slow device the icons stayed hidden
            for seconds (measured: still hidden at 15s under 6x CPU throttle).

            The stylesheet is attached with media="print" and flipped to "all"
            on load, which keeps it off the critical render path — that was the
            original reason for deferring it (~750ms round-trip).

            The URL carries icon_names so Google serves a 4KB subset instead
            of the 419KB full font — see ICON_NAMES above before adding icons.

            display=block is belt-and-braces: Material Symbols is a ligature
            font, so the span's text really is "expand_more". See the matching
            CSS in tokens.css.

            The font check runs from the link's onload, NOT immediately.
            document.fonts.load() resolves right away when no matching
            @font-face exists yet, so calling it before the stylesheet lands
            reports success instantly and reveals the raw word — that was the
            actual cause of the remaining flash.

            The 10s fallback is deliberately generous; at 3s it fired before
            the font arrived on a 400kbps link (font ready at ~4.5s). It exists
            only so a total font failure can't leave the burger menu
            permanently invisible; it is not a normal code path. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=${JSON.stringify(MATERIAL_SYMBOLS_HREF)};var r=function(){document.documentElement.classList.add("icons-ready")};var t=setTimeout(r,10000);var f=function(){clearTimeout(t);r()};var l=document.createElement("link");l.rel="stylesheet";l.href=h;l.media="print";l.onload=function(){this.media="all";try{if(document.fonts&&document.fonts.load){document.fonts.load('24px "Material Symbols Outlined"').then(f).catch(f)}else{f()}}catch(e){f()}};l.onerror=f;document.head.appendChild(l)})();`,
          }}
        />
      </head>
      <body className={`${lexend.variable} ${jetbrainsMono.variable} ${notoSans.variable}`}>
        <LanguageProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <FooterSection />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
