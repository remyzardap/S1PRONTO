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

/* ── Hero logo — HD, crisp, high-contrast ── */
const HeroLogo = () => (
  <svg
    viewBox="0 0 480 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "min(82vw, 560px)",
      height: "auto",
      filter: "drop-shadow(0 0 60px rgba(99,102,241,0.35)) drop-shadow(0 0 120px rgba(99,102,241,0.15))",
    }}
  >
    <defs>
      {/* Main frame gradient — bright */}
      <linearGradient id="fg" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A5B4FC" />
        <stop offset="30%" stopColor="#E0E7FF" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#E0E7FF" />
        <stop offset="100%" stopColor="#A5B4FC" />
      </linearGradient>
      {/* Detail accent */}
      <linearGradient id="dg" x1="300" y1="90" x2="400" y2="190" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      {/* Lens fill — very subtle glass tint */}
      <radialGradient id="lensL" cx="140" cy="140" r="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.01" />
      </radialGradient>
      <radialGradient id="lensR" cx="340" cy="140" r="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.01" />
      </radialGradient>
      {/* Glow behind frame */}
      <radialGradient id="bgGlow" cx="240" cy="140" r="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient background ellipse */}
    <ellipse cx="240" cy="140" rx="220" ry="130" fill="url(#bgGlow)" />

    {/* ═══ MAIN INFINITY FRAME ═══ */}
    {/* Outer glow stroke */}
    <path
      d="M240,140 C234,124 216,68 170,48 C130,30 72,40 40,72 C12,100 8,130 20,155 C34,185 68,210 120,218 C165,224 210,195 240,140 C270,85 315,56 360,48 C400,40 432,60 450,90 C466,116 468,148 455,175 C438,210 400,228 355,224 C305,218 272,165 240,140Z"
      stroke="rgba(99,102,241,0.2)"
      strokeWidth="14"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Main visible stroke — bright white-indigo */}
    <path
      d="M240,140 C234,124 216,68 170,48 C130,30 72,40 40,72 C12,100 8,130 20,155 C34,185 68,210 120,218 C165,224 210,195 240,140 C270,85 315,56 360,48 C400,40 432,60 450,90 C466,116 468,148 455,175 C438,210 400,228 355,224 C305,218 272,165 240,140Z"
      stroke="url(#fg)"
      strokeWidth="4.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />

    {/* Left lens glass fill */}
    <ellipse cx="138" cy="136" rx="82" ry="76" fill="url(#lensL)" />
    {/* Right lens glass fill */}
    <ellipse cx="348" cy="136" rx="82" ry="76" fill="url(#lensR)" />

    {/* ═══ LEFT LENS — specular highlight ═══ */}
    <ellipse cx="108" cy="108" rx="24" ry="18" fill="white" opacity="0.04" transform="rotate(-20 108 108)" />
    <circle cx="105" cy="105" r="4" fill="white" opacity="0.12" />
    <circle cx="105" cy="105" r="1.8" fill="white" opacity="0.3" />

    {/* ═══ RIGHT LENS — AI details (crisp, bright) ═══ */}

    {/* Top scan line */}
    <line x1="308" y1="98" x2="398" y2="98" stroke="url(#dg)" strokeWidth="2.8" strokeLinecap="round" />
    {/* Tick marks */}
    <line x1="320" y1="93" x2="320" y2="103" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="338" y1="93" x2="338" y2="103" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="356" y1="93" x2="356" y2="103" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="374" y1="93" x2="374" y2="103" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="392" y1="93" x2="392" y2="103" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

    {/* Cloud / brain shape — bold strokes */}
    <path
      d="M310,140 C310,131 317,125 325,128 C326,122 333,118 340,122 C344,116 353,115 358,120 C364,116 372,118 376,124 C382,121 390,124 392,130 C397,129 402,134 402,140 C403,147 397,152 390,150 C388,156 381,159 374,157 C370,162 362,162 357,158 C352,162 344,161 340,157 C334,161 326,158 322,153 C315,156 308,150 310,140Z"
      stroke="#C7D2FE"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Neural dots inside brain */}
    <circle cx="340" cy="137" r="2.5" fill="#A5B4FC" opacity="0.5" />
    <circle cx="356" cy="133" r="2.8" fill="#C7D2FE" opacity="0.45" />
    <circle cx="372" cy="137" r="2.5" fill="#A5B4FC" opacity="0.5" />
    <circle cx="348" cy="145" r="2" fill="#E0E7FF" opacity="0.35" />
    <circle cx="364" cy="145" r="2" fill="#E0E7FF" opacity="0.35" />
    {/* Neural connections */}
    <line x1="340" y1="137" x2="356" y2="133" stroke="#C7D2FE" strokeWidth="0.8" opacity="0.35" />
    <line x1="356" y1="133" x2="372" y2="137" stroke="#C7D2FE" strokeWidth="0.8" opacity="0.35" />
    <line x1="340" y1="137" x2="348" y2="145" stroke="#A5B4FC" strokeWidth="0.8" opacity="0.25" />
    <line x1="372" y1="137" x2="364" y2="145" stroke="#A5B4FC" strokeWidth="0.8" opacity="0.25" />
    <line x1="348" y1="145" x2="364" y2="145" stroke="#C7D2FE" strokeWidth="0.8" opacity="0.3" />
    {/* Center node pulse */}
    <circle cx="356" cy="139" r="1.2" fill="white" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Bottom scan line */}
    <line x1="305" y1="172" x2="405" y2="172" stroke="url(#dg)" strokeWidth="2.8" strokeLinecap="round" />
    {/* Tick marks */}
    <line x1="318" y1="167" x2="318" y2="177" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="336" y1="167" x2="336" y2="177" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="354" y1="167" x2="354" y2="177" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="372" y1="167" x2="372" y2="177" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="390" y1="167" x2="390" y2="177" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

    {/* Data arrow */}
    <path d="M349,172 L356,186 L363,172" stroke="#C7D2FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* ═══ NOSE BRIDGE ═══ */}
    <path d="M224,148 Q240,160 256,148" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />

    {/* ═══ Breathing pulse dots ═══ */}
    <circle cx="18" cy="140" r="2.5" fill="#818CF8" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="462" cy="140" r="2.5" fill="#818CF8" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" begin="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="240" cy="28" r="2" fill="#A5B4FC" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" begin="0.7s" repeatCount="indefinite" />
    </circle>
    <circle cx="240" cy="252" r="2" fill="#A5B4FC" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" begin="2.2s" repeatCount="indefinite" />
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
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "70vw",
            height: "70vw",
            maxWidth: 700,
            maxHeight: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginBottom: 40,
            animation: "heroIn 1s ease-out both",
          }}
        >
          <HeroLogo />
        </div>

        {/* Wordmark */}
        <span
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontSize: "clamp(12px, 1.6vw, 15px)",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#94A3B8",
            marginBottom: 24,
            position: "relative",
            zIndex: 2,
            animation: "heroIn 1s ease-out 0.2s both",
          }}
        >
          SUTAERU
        </span>

        {/* CTA */}
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "13px 36px",
            borderRadius: 999,
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontFamily: "var(--v2-font-heading)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#C7D2FE",
            cursor: "pointer",
            transition: "all .25s ease",
            position: "relative",
            zIndex: 2,
            animation: "heroIn 1s ease-out 0.4s both",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)";
            e.currentTarget.style.background = "rgba(99,102,241,0.18)";
            e.currentTarget.style.color = "#E0E7FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
            e.currentTarget.style.background = "rgba(99,102,241,0.1)";
            e.currentTarget.style.color = "#C7D2FE";
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
            opacity: 0.5,
          }}
        >
          &copy; 2025 Sutaeru
        </span>
      </footer>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
