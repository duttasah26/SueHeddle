"use client";

export default function LoadingDots({ label }: { label: string }) {
  return (
    <span className="loading-dots">
      {label}<span>.</span><span>.</span><span>.</span>
    </span>
  );
}
