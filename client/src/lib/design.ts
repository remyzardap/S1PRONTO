// Design tokens & shared style helpers
// Used by Chat, CommandPalette, ChatHeader, etc.

import type { CSSProperties } from "react";

// ─── Font shorthands ───
export const F: CSSProperties = { fontFamily: "'Syne', sans-serif" };
export const FD: CSSProperties = { fontFamily: "'DM Sans', sans-serif" };
export const FM: CSSProperties = { fontFamily: "'JetBrains Mono', 'DM Mono', monospace" };

// ─── Color palette ───
export const MOCHA = "#f5f2ed";
export const MOCHA_DARK = "#1a1610";
export const AMBER = "#F5A623";
export const TEXT_PRIMARY = "#f0f0f5";
export const TEXT_MUTED = "rgba(240,240,245,0.45)";
export const TEXT_SOFT = "rgba(240,240,245,0.65)";

// ─── Page background ───
export const PAGE_BG: CSSProperties = {
  background: "var(--v2-bg, #0a0a0f)",
  minHeight: "100vh",
};

// ─── Noise overlay ───
export const NOISE_OVERLAY: CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
  opacity: 0.025,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
};

// ─── Animations (CSS keyframe names or inline strings) ───
export const CSS_ANIM = {
  fadeIn: "fade-in 0.4s ease forwards",
  rise: "rise 0.5s ease forwards",
  pulseGlow: "pulse-glow 2.5s ease-in-out infinite",
};

// ─── Glass card style ───
export const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  boxShadow: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
};

// ─── Inner glow (for focused elements) ───
export const innerGlowStrong: CSSProperties = {
  boxShadow:
    "inset 0 0 30px rgba(var(--v2-accent-rgb, 20,184,166),0.08), 0 0 40px rgba(var(--v2-accent-rgb, 20,184,166),0.04)",
};
