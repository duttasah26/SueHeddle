"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import LoadingDots from "@/components/LoadingDots";

function UnsubscribeForm() {
  const params = useSearchParams();
  const [email,      setEmail]      = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [volunteer,  setVolunteer]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => {
    const e = params.get("email");
    const f = params.get("from");
    if (e) setEmail(decodeURIComponent(e));
    if (f === "newsletter") setNewsletter(true);
    if (f === "volunteer")  setVolunteer(true);
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletter && !volunteer) {
      setError("Please select at least one list.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newsletter, volunteer }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f4f4f4", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
      <div style={{ background: "#fff", borderRadius: "4px", overflow: "hidden", width: "100%", maxWidth: "480px", position: "relative" }}>
        <a href="/" className="form-home-btn"><span className="material-symbols-outlined">home</span></a>

        <div style={{ background: "#1a1a1a", padding: "24px 32px", textAlign: "center" }}>
          <Image src="/images/icons/circle_icon.png" alt="Sue Heddle" width={48} height={48} style={{ display: "block", margin: "0 auto" }} />
          <p style={{ margin: "10px 0 0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e70685" }}>
            Vote Sue. Vote New.
          </p>
        </div>

        <div style={{ padding: "40px 32px" }}>
          {done ? (
            <>
              <h1 style={{ margin: "0 0 12px", fontSize: "22px", color: "#1a1a1a", fontWeight: 700 }}>You've been unsubscribed.</h1>
              <p style={{ margin: 0, color: "#555", fontSize: "15px", lineHeight: 1.6 }}>
                You've been removed from the selected list(s). If this was a mistake,
                you can re-sign up at <a href="https://sueheddle.ca" style={{ color: "#e70685" }}>sueheddle.ca</a>.
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 style={{ margin: "0 0 8px", fontSize: "22px", color: "#1a1a1a", fontWeight: 700 }}>Unsubscribe</h1>
              <p style={{ margin: "0 0 24px", color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
                Select which list(s) you'd like to be removed from.
              </p>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#333" }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#333", cursor: "pointer" }}>
                  <input type="checkbox" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                  Campaign newsletter & updates
                </label>
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#333", cursor: "pointer" }}>
                  <input type="checkbox" checked={volunteer} onChange={e => setVolunteer(e.target.checked)} />
                  Volunteer list
                </label>
              </div>

              {error && <p style={{ margin: "0 0 16px", color: "#c0392b", fontSize: "14px" }}>{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                style={{ background: "#1a1a1a", color: "#fff", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: 700, borderRadius: "2px", cursor: "pointer", opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? <LoadingDots label="Removing" /> : "Unsubscribe"}
              </button>
            </form>
          )}
        </div>

        <div style={{ padding: "16px 32px", background: "#f4f4f4", borderTop: "1px solid #e5e5e5", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
            Sue Heddle for Ward 5 Councillor &middot; Oakville, ON<br />
            <a href="https://sueheddle.ca" style={{ color: "#e70685" }}>sueheddle.ca</a>
          </p>
        </div>

      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeForm />
    </Suspense>
  );
}
