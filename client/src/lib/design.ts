// Design tokens & shared style helpers — Aura Design System
// Used by Chat, CommandPalette, ChatHeader, etc.

import type { CSSProperties } from "react";

// ─── Font shorthands ───
export const F: CSSProperties = { fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" };
export const FD: CSSProperties = { fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" };
export const FM: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

// ─── Color palette — Aura navy/indigo ───
export const MOCHA = "#6366F1";
export const MOCHA_DARK = "#0C0F1A";
export const AMBER = "#6366F1";
export const TEXT_PRIMARY = "#FFFFFF";
export const TEXT_MUTED = "#64748B";
export const TEXT_SOFT = "#94A3B8";

// ─── Page background ───
export const PAGE_BG: CSSProperties = {
  background: "#111827",
  minHeight: "100vh",
};

// ─── Noise overlay ───
export const NOISE_OVERLAY: CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
  opacity: 0.015,
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

// ─── Glass card style — Aura glassmorphism ───
export const glassCard: CSSProperties = {
  background: "rgba(28,34,53,0.8)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(42,51,80,0.6)",
  borderRadius: 16,
  boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
};

// ─── Inner glow (for focused elements) ───
export const innerGlowStrong: CSSProperties = {
  boxShadow:
    "inset 0 0 30px rgba(99,102,241,0.08), 0 0 40px rgba(99,102,241,0.04)",
};
