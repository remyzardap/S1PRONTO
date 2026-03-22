import { useLocation } from "wouter";
import { useV2Theme } from "../components/ThemeToggle";
import ThemeToggle from "../components/ThemeToggle";

/* ── Small nav logo (same as before) ── */
const SLogoSmall = () => (
  <svg width="48" height="28" viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48,28 C45,20 38,8 26,8 C12,8 4,17 4,28 C4,39 12,48 26,48 C38,48 45,36 48,28 C51,20 58,8 70,8 C84,8 92,17 92,28 C92,39 84,48 70,48 C58,48 51,36 48,28Z" stroke="currentColor" strokeWidth="5.5" strokeLinejoin="round" fill="none"/>
    <line x1="62" y1="19" x2="78" y2="19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M60,28 C60,24.5 63.5,22.5 66.5,24 C67,21.5 70,20.5 72.5,22 C74.5,20.5 79,21.5 79,25 C79,28 76,29.5 73,29 C72,30.5 67,30.5 65.5,29 C62.5,29 60,28.8 60,28Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="59" y1="34" x2="81" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M67.5,34 L70,38.5 L72.5,34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

/* ── Hero logo — HD, detailed, crisp ── */
const HeroLogo = () => (
  <svg
    viewBox="0 0 480 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "min(80vw, 520px)",
      height: "auto",
      filter: "drop-shadow(0 0 80px rgba(99,102,241,0.15)) drop-shadow(0 0 30px rgba(99,102,241,0.08))",
    }}
  >
    <defs>
      {/* Indigo glow gradient for the main frame */}
      <linearGradient id="frameGrad" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="35%" stopColor="#C7D2FE" />
        <stop offset="65%" stopColor="#E0E7FF" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      {/* Subtle inner gradient for depth */}
      <linearGradient id="innerGlow" x1="240" y1="60" x2="240" y2="220" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.04" />
      </linearGradient>
      {/* Accent color for right-lens details */}
      <linearGradient id="detailGrad" x1="300" y1="90" x2="380" y2="190" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A5B4FC" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      {/* Reflection highlight */}
      <linearGradient id="reflectionGrad" x1="80" y1="80" x2="200" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      {/* Nose bridge gradient */}
      <linearGradient id="bridgeGrad" x1="220" y1="130" x2="260" y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
    </defs>

    {/* ═══ Ambient glow behind logo ═══ */}
    <ellipse cx="240" cy="140" rx="200" ry="120" fill="url(#innerGlow)" />

    {/* ═══ Main infinity / glasses frame ═══ */}
    {/* Outer stroke — thick, smooth, HD */}
    <path
      d="M240,140
         C234,124 216,68 170,48
         C130,30 72,40 40,72
         C12,100 8,130 20,155
         C34,185 68,210 120,218
         C165,224 210,195 240,140
         C270,85 315,56 360,48
         C400,40 432,60 450,90
         C466,116 468,148 455,175
         C438,210 400,228 355,224
         C305,218 272,165 240,140Z"
      stroke="url(#frameGrad)"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
      style={{ paintOrder: "stroke" }}
    />
    {/* Inner thin highlight line for depth — gives that 3D HD feel */}
    <path
      d="M240,140
         C234,124 216,68 170,48
         C130,30 72,40 40,72
         C12,100 8,130 20,155
         C34,185 68,210 120,218
         C165,224 210,195 240,140
         C270,85 315,56 360,48
         C400,40 432,60 450,90
         C466,116 468,148 455,175
         C438,210 400,228 355,224
         C305,218 272,165 240,140Z"
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="8"
      strokeLinejoin="round"
      fill="none"
    />

    {/* ═══ Left lens — glass reflection ═══ */}
    <path
      d="M100,100 Q80,85 70,105 Q65,130 80,150 Q100,165 125,160 Q140,152 138,130 Q135,105 100,100Z"
      fill="url(#reflectionGrad)"
      opacity="0.5"
    />
    {/* Small specular dot — top-left lens */}
    <circle cx="95" cy="105" r="3" fill="white" opacity="0.2" />
    <circle cx="95" cy="105" r="1.2" fill="white" opacity="0.4" />

    {/* ═══ Right lens — AI details ═══ */}

    {/* Horizontal scan line — top */}
    <line x1="310" y1="100" x2="400" y2="100" stroke="url(#detailGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    {/* Small tick marks on top line */}
    <line x1="330" y1="96" x2="330" y2="104" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="350" y1="96" x2="350" y2="104" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <line x1="370" y1="96" x2="370" y2="104" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="390" y1="96" x2="390" y2="104" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

    {/* Cloud / brain shape — detailed with multiple lobes */}
    <path
      d="M308,140
         C308,132 314,126 321,128
         C322,123 328,120 334,123
         C337,118 345,117 350,121
         C355,118 363,119 366,124
         C372,121 380,123 382,129
         C387,128 392,132 392,138
         C393,144 388,149 382,148
         C381,153 375,156 369,154
         C365,158 358,158 354,155
         C349,158 342,157 338,154
         C333,157 326,155 322,151
         C316,153 308,148 308,140Z"
      stroke="url(#detailGrad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.9"
    />
    {/* Inner brain detail dots */}
    <circle cx="335" cy="137" r="1.5" fill="#A5B4FC" opacity="0.35" />
    <circle cx="350" cy="134" r="1.8" fill="#818CF8" opacity="0.3" />
    <circle cx="365" cy="137" r="1.5" fill="#A5B4FC" opacity="0.35" />
    <circle cx="342" cy="143" r="1.2" fill="#C7D2FE" opacity="0.25" />
    <circle cx="358" cy="143" r="1.2" fill="#C7D2FE" opacity="0.25" />
    {/* Neural connection lines inside the brain */}
    <line x1="335" y1="137" x2="350" y2="134" stroke="#A5B4FC" strokeWidth="0.6" opacity="0.2" />
    <line x1="350" y1="134" x2="365" y2="137" stroke="#A5B4FC" strokeWidth="0.6" opacity="0.2" />
    <line x1="342" y1="143" x2="358" y2="143" stroke="#A5B4FC" strokeWidth="0.6" opacity="0.2" />
    <line x1="335" y1="137" x2="342" y2="143" stroke="#A5B4FC" strokeWidth="0.6" opacity="0.15" />
    <line x1="365" y1="137" x2="358" y2="143" stroke="#A5B4FC" strokeWidth="0.6" opacity="0.15" />

    {/* Horizontal scan line — bottom */}
    <line x1="305" y1="172" x2="405" y2="172" stroke="url(#detailGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    {/* Small tick marks on bottom line */}
    <line x1="320" y1="168" x2="320" y2="176" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <line x1="340" y1="168" x2="340" y2="176" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="360" y1="168" x2="360" y2="176" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <line x1="380" y1="168" x2="380" y2="176" stroke="#A5B4FC" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

    {/* Download / data arrow below bottom line */}
    <path d="M348,172 L355,184 L362,172" stroke="url(#detailGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />

    {/* Right lens — glass reflection (subtle) */}
    <path
      d="M345,85 Q365,78 385,88 Q390,95 380,98 Q360,92 345,85Z"
      fill="white"
      opacity="0.04"
    />

    {/* ═══ Nose bridge detail ═══ */}
    {/* Small decorative arc between lenses */}
    <path d="M225,148 Q240,158 255,148" stroke="url(#bridgeGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />

    {/* ═══ Subtle orbital dots around logo ═══ */}
    <circle cx="48" cy="140" r="2" fill="#6366F1" opacity="0.2">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="432" cy="140" r="2" fill="#6366F1" opacity="0.2">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="240" cy="38" r="1.5" fill="#818CF8" opacity="0.15">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" begin="0.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="240" cy="242" r="1.5" fill="#818CF8" opacity="0.15">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" begin="2.5s" repeatCount="indefinite" />
    </circle>
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
      {/* ─── Navigation ─── */}
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

      {/* ─── Hero — Big logo center ─── */}
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
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            width: "60vw",
            height: "60vw",
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* The logo */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginBottom: 48,
            animation: "logoFadeIn 1.2s ease-out both",
          }}
        >
          <HeroLogo />
        </div>

        {/* Wordmark below logo */}
        <span
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontSize: "clamp(11px, 1.5vw, 14px)",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--v2-text-muted)",
            marginBottom: 20,
            position: "relative",
            zIndex: 2,
            animation: "logoFadeIn 1.2s ease-out 0.3s both",
          }}
        >
          SUTAERU
        </span>

        {/* Single CTA */}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 32px",
            borderRadius: 999,
            border: "1px solid rgba(99,102,241,0.25)",
            background: "rgba(99,102,241,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontFamily: "var(--v2-font-heading)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "var(--v2-text-secondary)",
            cursor: "pointer",
            transition: "all .25s ease",
            position: "relative",
            zIndex: 2,
            animation: "logoFadeIn 1.2s ease-out 0.5s both",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
            e.currentTarget.style.background = "rgba(99,102,241,0.14)";
            e.currentTarget.style.color = "#C7D2FE";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
            e.currentTarget.style.background = "rgba(99,102,241,0.08)";
            e.currentTarget.style.color = "var(--v2-text-secondary)";
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
            opacity: 0.6,
          }}
        >
          &copy; 2025 Sutaeru
        </span>
      </footer>

      <style>{`
        @keyframes logoFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
