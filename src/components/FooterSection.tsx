"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SHARE_TEXT = "Elect Sue Heddle for Ward 5 Councillor";

const InstagramSVG = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppSVG = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookSVG = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WeChatSVG = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-3.886-6.348-7.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 3.43c.537 0 .972.44.972.982a.976.976 0 0 1-.972.982.976.976 0 0 1-.972-.982c0-.542.435-.982.972-.982zm3.517 0c.537 0 .972.44.972.982a.976.976 0 0 1-.972.982.976.976 0 0 1-.972-.982c0-.542.435-.982.972-.982z" />
  </svg>
);

export default function FooterSection() {
  const { t } = useLanguage();
  const [pageUrl, setPageUrl] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const [weChatCopied, setWeChatCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setPageUrl(window.location.href); }, []);

  useEffect(() => {
    if (!shareOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShareOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shareOpen]);

  const shareMsg = pageUrl ? `${SHARE_TEXT} – ${pageUrl}` : SHARE_TEXT;

  useEffect(() => {
    if (shareOpen && inputRef.current) {
      const el = inputRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [shareOpen, shareMsg]);

  const copyUrl = () => {
    navigator.clipboard.writeText(shareMsg).then(() => {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 1800);
    });
  };

  const handleIg = () => {
    navigator.clipboard.writeText(shareMsg).then(() => {
      setIgCopied(true);
      setTimeout(() => setIgCopied(false), 1800);
    });
  };

  const handleWeChat = () => {
    navigator.clipboard.writeText(shareMsg).then(() => {
      setWeChatCopied(true);
      setTimeout(() => setWeChatCopied(false), 1800);
    });
  };

  return (
    <footer className="footer">
      <img src="/images/icons/brand.png" alt="Sue Heddle" className="footer-brand-icon" />
      <div className="footer-icons">
        <a href="mailto:sueheddle@gmail.com" className="footer-icon-btn" aria-label={t("footer.emailAriaLabel")}>
          <span className="material-symbols-outlined">mail</span>
        </a>
        <a href="https://instagram.com/sueheddle" target="_blank" rel="noopener noreferrer" className="footer-icon-btn" aria-label="Instagram">
          <InstagramSVG size={26} />
        </a>
        <button className="footer-icon-btn" aria-label="Share" onClick={() => setShareOpen(true)} suppressHydrationWarning>
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>

      {shareOpen && (
        <div className="sp-overlay" onClick={() => setShareOpen(false)}>
          <div className="sp-content" onClick={(e) => e.stopPropagation()}>
            <div className="sp-inner">
              <p className="sp-title">Share</p>
              <div className="sp-socials">
                <a className="sp-social-btn sp-social-btn--wa"
                  href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                  <WhatsAppSVG size={22} />
                </a>
                <a className="sp-social-btn sp-social-btn--fb"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(SHARE_TEXT)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                  <FacebookSVG size={22} />
                </a>
                <button className="sp-social-btn sp-social-btn--ig" onClick={handleIg} aria-label="Copy link for Instagram">
                  <InstagramSVG size={22} />
                </button>
                <button className="sp-social-btn sp-social-btn--wc" onClick={handleWeChat} aria-label="Copy link for WeChat">
                  <WeChatSVG size={22} />
                </button>
                <a className="sp-social-btn sp-social-btn--sms"
                  href={`sms:?&body=${encodeURIComponent(shareMsg)}`} aria-label="Share via Message">
                  <span className="material-symbols-outlined">chat</span>
                </a>
                <a className="sp-social-btn sp-social-btn--em"
                  href={`mailto:?subject=${encodeURIComponent(SHARE_TEXT)}&body=${encodeURIComponent(shareMsg)}`}
                  aria-label="Share via Email">
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>

              {(igCopied || weChatCopied) && (
                <p className="sp-feedback" key={String(igCopied) + String(weChatCopied)}>
                  {weChatCopied ? "Copied – Paste in WeChat" : "Copied – Paste in Instagram"}
                </p>
              )}

              <div className="sp-url-row">
                <textarea ref={inputRef} className="sp-url-input" value={shareMsg} readOnly aria-label="Share message" />
                <button className={`sp-copy-btn${urlCopied ? " sp-copy-btn--done" : ""}`} onClick={copyUrl} aria-label={urlCopied ? "Copied" : "Copy message"}>
                  <span className="material-symbols-outlined">{urlCopied ? "check" : "content_copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="footer-copyright">© 2026 Sue Heddle for Ward 5 — Oakville. All rights reserved.</p>
    </footer>
  );
}
