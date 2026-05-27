import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sue Heddle | Bold Leadership for Ward 4",
  description:
    "Sue Heddle is running for Ward 4 Councillor in Oakville's 2026 Municipal Election. Learn about her platform, community involvement, and how you can get involved.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0&display=block"
        />
      </head>
      <body className={`${lexend.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
