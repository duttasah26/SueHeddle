import type { Metadata } from "next";
import { Lexend, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sue Heddle | Bold Leadership for Ward 5",
  description:
    "Sue Heddle is running for Ward 5 Councillor in Oakville's 2026 Municipal Election. Learn about her platform, community involvement, and how you can get involved.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0&display=block"
        />
      </head>
      <body className={`${lexend.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
