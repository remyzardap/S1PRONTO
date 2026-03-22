import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";
import { CommandPalette } from "./CommandPalette";
import { FloatingVideoPlayer } from "./FloatingVideoPlayer";
import { Button } from "./ui/button";
import TopBar from "./TopBar";
import WidgetGrid from "./WidgetGrid";
import ExpandableView from "./ExpandableView";
import { useV2Theme } from "./ThemeToggle";
import { allWidgets } from "./WidgetGrid";
import type { WidgetConfig } from "./WidgetCard";

// ─── Shared UI primitives (used by KemmaCalls, AgentHub, etc.) ─────────────
const glassColors = {
  blue: "#5B8DEF",
  purple: "#8B5CF6",
  textWhite: "#FFFFFF",
  glassBg: "rgba(17, 24, 39, 0.8)",
  glassBorder: "rgba(91, 141, 239, 0.2)",
};

export const GlassCard = ({
  children,
  style = {},
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      background: glassColors.glassBg,
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      border: `1px solid ${glassColors.glassBorder}`,
      padding: "20px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const GradientText = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <span
    style={{
      background: `linear-gradient(135deg, ${glassColors.blue}, ${glassColors.purple})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontWeight: 700,
      ...style,
    }}
  >
    {children}
  </span>
);

export const PrimaryButton = ({
  children,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <button
    onClick={onClick}
    style={{
      background: `linear-gradient(135deg, ${glassColors.blue}, ${glassColors.purple})`,
      color: glassColors.textWhite,
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 20px rgba(91, 141, 239, 0.3)",
      ...style,
    }}
  >
    {children}
  </button>
);

export const SecondaryButton = ({
  children,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      color: glassColors.textWhite,
      border: `1px solid ${glassColors.glassBorder}`,
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </button>
);

export default function DashboardLayout({
  children,
  noPadding,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  const { loading, user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { mode, toggle } = useV2Theme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  // All hooks above — no conditional hooks below
  const hasDirectChildren = children !== undefined && children !== null;
  const currentWidget = allWidgets.find((w) => w.path === location);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!user) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "var(--v2-bg)" }}
      >
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1
              className="text-2xl font-semibold tracking-tight text-center"
              style={{ color: "var(--v2-text)", fontFamily: "var(--v2-font-heading)" }}
            >
              Sign in to continue
            </h1>
            <p
              className="text-sm text-center max-w-sm"
              style={{ color: "var(--v2-text-secondary)" }}
            >
              Access to this dashboard requires authentication.
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = "/login")}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  const handleWidgetClick = (widget: WidgetConfig) => {
    setLocation(widget.path);
  };

  const handleBack = () => {
    setLocation("/dashboard");
  };

  // If we have direct children from routing, show expanded view with back button
  if (hasDirectChildren) {
    return (
      <div style={{ background: "var(--v2-bg)", minHeight: "100vh" }}>
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        <FloatingVideoPlayer />
        <ExpandableView
          title={currentWidget?.label || "Page"}
          onBack={handleBack}
          themeMode={mode}
          onToggleTheme={toggle}
          user={user}
          noPadding={noPadding}
        >
          <main
            className={
              noPadding
                ? "flex-1 flex flex-col overflow-hidden"
                : "flex-1 p-4 overflow-y-auto"
            }
            style={{ background: "var(--v2-bg)" }}
          >
            {children}
          </main>
        </ExpandableView>
      </div>
    );
  }

  // Widget home screen (fallback — used when DashboardLayout is rendered without children)
  return (
    <div
      style={{
        background: "var(--v2-bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <FloatingVideoPlayer />
      <TopBar
        user={user}
        themeMode={mode}
        onToggleTheme={toggle}
        onLogout={logout}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div
          style={{
            padding: "32px 24px 16px",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--v2-font-heading)",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 32px)",
              color: "var(--v2-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: 14,
              color: "var(--v2-text-muted)",
              margin: "8px 0 0",
            }}
          >
            Your command center. Click any widget to expand.
          </p>
        </div>

        <WidgetGrid
          isAdmin={user?.role === "admin"}
          onWidgetClick={handleWidgetClick}
          onNavigate={setLocation}
        />
      </div>
    </div>
  );
}
