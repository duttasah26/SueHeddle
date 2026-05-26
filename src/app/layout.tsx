import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sue Heddle | Ward 4 Councillor Candidate — Oakville 2026",
  description:
    "Sue Heddle is running for Ward 4 Councillor in Oakville's 2026 Municipal Election. Learn about her platform, community involvement, and how you can get involved.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
