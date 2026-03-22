import { ArrowLeft } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import ThemeToggle, { type ThemeMode } from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ExpandableViewProps {
  title: string;
  children: ReactNode;
  onBack: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  user?: { name?: string } | null;
  noPadding?: boolean;
}

export default function ExpandableView({
  title,
  children,
  onBack,
  themeMode,
  onToggleTheme,
  user,
  noPadding,
}: ExpandableViewProps) {
  const [animState, setAnimState] = useState<"entering" | "visible" | "exiting">("entering");

  useEffect(() => {
    const timer = setTimeout(() => setAnimState("visible"), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setAnimState("exiting");
    setTimeout(() => onBack(), 250);
  };

  return (
    <div
      className={`v2-expanded-view ${animState === "entering" || animState === "visible" ? "v2-expand-enter" : "v2-expand-exit"}`}
    >
      {/* Expanded top bar */}
      <div className="v2-expanded-topbar">
        <button
          onClick={handleBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--v2-text-secondary)",
            fontFamily: "var(--v2-font-body)",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 0",
            transition: "color 200ms ease",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <h2
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontWeight: 600,
            fontSize: 14,
            color: "var(--v2-text)",
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {title}
        </h2>

        <div className="flex items-center gap-3">
          <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
          <Avatar className="h-7 w-7">
            <AvatarFallback
              style={{
                background: "rgba(var(--v2-accent-rgb), 0.12)",
                color: "var(--v2-accent)",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "var(--v2-font-heading)",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Page content */}
      <div
        className="v2-page-fade"
        style={{
          flex: 1,
          padding: noPadding ? 0 : undefined,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 56px)",
          background: "var(--v2-bg)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
