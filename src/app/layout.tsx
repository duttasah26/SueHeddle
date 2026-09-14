import type { Metadata } from "next";
import { Lexend, JetBrains_Mono, Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import FooterSection from "@/components/FooterSection";
import PageTransition from "@/components/PageTransition";
import FontLoader from "@/components/FontLoader";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${lexend.variable} ${jetbrainsMono.variable} ${notoSans.variable}`}>
        <FontLoader />
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
