import { useLocation } from "wouter";
import { useV2Theme } from "../components/ThemeToggle";
import ThemeToggle from "../components/ThemeToggle";

/* ── Small nav logo ── */
const SLogoSmall = () => (
  <svg width="48" height="28" viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,28 C45,20 38,8 26,8 C12,8 4,17 4,28 C4,39 12,48 26,48 C38,48 45,36 48,28 C51,20 58,8 70,8 C84,8 92,17 92,28 C92,39 84,48 70,48 C58,48 51,36 48,28Z" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" fill="none"/>
    <line x1="62" y1="19" x2="78" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M60,28 C60,24.5 63.5,22.5 66.5,24 C67,21.5 70,20.5 72.5,22 C74.5,20.5 79,21.5 79,25 C79,28 76,29.5 73,29 C72,30.5 67,30.5 65.5,29 C62.5,29 60,28.8 60,28Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="59" y1="34" x2="81" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M67.5,34 L70,38.5 L72.5,34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

/*
 * ── Hero Logo — exact same shape as login page logo, blown up HD ──
 *
 * Left:  infinity (∞) shape — thick bold white
 * Right: circle "lens" with AI details (scan lines, cloud, arrow)
 * Connected at the center overlap
 * Light reflections / specular highlights for that crisp HD feel
 */
const HeroLogo = () => (
  <svg
    viewBox="0 0 200 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "min(72vw, 420px)",
      height: "auto",
      filter: "drop-shadow(0 0 40px rgba(255,255,255,0.08)) drop-shadow(0 0 80px rgba(99,102,241,0.12))",
    }}
  >
    <defs>
      {/* Main white with subtle warm-cool shift for HD feel */}
      <linearGradient id="logoWhite" x1="20" y1="10" x2="180" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E8ECF4" />
        <stop offset="25%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F0F0F8" />
        <stop offset="75%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0E4EE" />
      </linearGradient>
      {/* Specular highlight for light reflection */}
      <linearGradient id="specular" x1="60" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      {/* Right lens reflection */}
      <linearGradient id="specR" x1="130" y1="15" x2="160" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      {/* Subtle inner glow for lenses */}
      <radialGradient id="lensGlowL" cx="62" cy="52" r="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lensGlowR" cx="142" cy="52" r="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ═══════ LEFT: INFINITY SYMBOL (∞) ═══════ */}
    {/* The infinity loop — bold, crisp strokes */}
    <path
      d="M100,55
         C96,45 88,22 68,16
         C50,10 32,18 22,32
         C12,46 14,64 24,76
         C36,90 56,90 72,80
         C84,72 94,62 100,55
         C106,48 116,38 128,30
         C144,20 164,20 176,32
         C188,44 190,64 178,78
         C168,90 150,90 136,82
         C122,74 108,62 100,55Z"
      stroke="url(#logoWhite)"
      strokeWidth="7"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />

    {/* Light reflection — top-left of infinity */}
    <path
      d="M42,24 C50,18 60,18 68,20"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.2"
    />
    {/* Specular dot — bright highlight */}
    <circle cx="50" cy="28" r="2.5" fill="white" opacity="0.25" />
    <circle cx="50" cy="28" r="1" fill="white" opacity="0.5" />

    {/* Left lens inner glow */}
    <ellipse cx="62" cy="52" rx="30" ry="28" fill="url(#lensGlowL)" />

    {/* ═══════ RIGHT: CIRCLE LENS WITH AI DETAILS ═══════ */}

    {/* Circle outline — connected to the infinity at overlap */}
    <circle
      cx="142"
      cy="55"
      r="34"
      stroke="url(#logoWhite)"
      strokeWidth="6.5"
      fill="none"
    />

    {/* Right lens inner glow */}
    <circle cx="142" cy="55" r="30" fill="url(#lensGlowR)" />

    {/* Light reflection — top of circle */}
    <path
      d="M122,28 C130,22 140,20 152,22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.18"
    />
    <circle cx="132" cy="30" r="2" fill="white" opacity="0.2" />
    <circle cx="132" cy="30" r="0.8" fill="white" opacity="0.45" />

    {/* ── AI DETAILS inside the right circle ── */}

    {/* Top horizontal scan line */}
    <line x1="124" y1="42" x2="160" y2="42" stroke="url(#logoWhite)" strokeWidth="3.5" strokeLinecap="round" />

    {/* Cloud / brain shape */}
    <path
      d="M126,56
         C126,51 130,48 134,50
         C134.5,47 138,45 141,47.5
         C143,44.5 147,44 150,46.5
         C153,44.5 157,46 158,49.5
         C158,53.5 155,56 151.5,55
         C150.5,57 147,58 144,56.5
         C141,58 137,57.5 135,55.5
         C131,57 126,55 126,56Z"
      stroke="url(#logoWhite)"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Bottom horizontal scan line */}
    <line x1="122" y1="66" x2="162" y2="66" stroke="url(#logoWhite)" strokeWidth="3.5" strokeLinecap="round" />

    {/* Download arrow below bottom line */}
    <path d="M138,66 L142,74 L146,66" stroke="url(#logoWhite)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function Landing() {
  const [, navigate] = useLocation();
  const { mode, toggle } = useV2Theme();

  return (
    <div
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-text)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ─── Nav ─── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SLogoSmall />
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
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "50vw",
            height: "50vw",
            maxWidth: 500,
            maxHeight: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Big logo */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginBottom: 36,
            animation: "heroIn 0.9s ease-out both",
          }}
        >
          <HeroLogo />
        </div>

        {/* SUTAERU wordmark */}
        <h1
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 800,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#94A3B8",
            margin: "0 0 14px",
            position: "relative",
            zIndex: 2,
            animation: "heroIn 0.9s ease-out 0.15s both",
          }}
        >
          SUTAERU
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: "clamp(14px, 2vw, 18px)",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.01em",
            color: "#64748B",
            margin: "0 0 40px",
            position: "relative",
            zIndex: 2,
            animation: "heroIn 0.9s ease-out 0.3s both",
          }}
        >
          One identity. Every model. For life.
        </p>

        {/* Enter button */}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "14px 40px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontFamily: "var(--v2-font-heading)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#CBD5E1",
            cursor: "pointer",
            transition: "all .25s ease",
            position: "relative",
            zIndex: 2,
            animation: "heroIn 0.9s ease-out 0.45s both",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = "#CBD5E1";
          }}
        >
          Enter
        </button>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ padding: "20px 28px", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: 10,
            color: "var(--v2-text-muted)",
            letterSpacing: "0.04em",
            opacity: 0.4,
          }}
        >
          &copy; 2025 Sutaeru
        </span>
      </footer>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
