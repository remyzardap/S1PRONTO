import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useV2Theme } from "../components/ThemeToggle";
import ThemeToggle from "../components/ThemeToggle";

const SLogo = () => (
  <svg width="48" height="28" viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,28 C45,20 38,8 26,8 C12,8 4,17 4,28 C4,39 12,48 26,48 C38,48 45,36 48,28 C51,20 58,8 70,8 C84,8 92,17 92,28 C92,39 84,48 70,48 C58,48 51,36 48,28Z" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" fill="none"/>
    <line x1="62" y1="19" x2="78" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M60,28 C60,24.5 63.5,22.5 66.5,24 C67,21.5 70,20.5 72.5,22 C74.5,20.5 79,21.5 79,25 C79,28 76,29.5 73,29 C72,30.5 67,30.5 65.5,29 C62.5,29 60,28.8 60,28Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="59" y1="34" x2="81" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M67.5,34 L70,38.5 L72.5,34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default function Landing() {
  const [, navigate] = useLocation();
  const { mode, toggle } = useV2Theme();

  return (
    <div style={{ background: "var(--v2-bg)", color: "var(--v2-text)", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ─── Navigation ─── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SLogo />
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <ThemeToggle mode={mode} onToggle={toggle} />
          <span
            onClick={() => navigate("/login")}
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "var(--v2-text-secondary)",
              cursor: "pointer",
              transition: "color .2s",
            }}
          >
            Sign in
          </span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        className="v2-landing-hero"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 600 }}>
          <span
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--v2-text-muted)",
              marginBottom: 32,
              display: "block",
            }}
          >
            SUTAERU
          </span>

          <h1
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 800,
              fontSize: "clamp(36px, 7vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--v2-text)",
              margin: "0 0 20px",
            }}
          >
            Your AI. Your rules.
          </h1>

          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 17px)",
              lineHeight: 1.6,
              color: "var(--v2-text-muted)",
              margin: "0 auto 48px",
              maxWidth: 360,
            }}
          >
            One identity across every model.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="v2-cta-btn"
            style={{ fontSize: 15, padding: "16px 40px" }}
          >
            Enter <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: "24px 32px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: 11,
            color: "var(--v2-text-muted)",
            letterSpacing: "0.02em",
          }}
        >
          &copy; 2025 Sutaeru
        </span>
      </footer>
    </div>
  );
}
