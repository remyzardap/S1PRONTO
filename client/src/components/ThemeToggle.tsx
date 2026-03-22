import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

export function useV2Theme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      return (document.documentElement.getAttribute("data-theme") as ThemeMode) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return { mode, setMode, toggle };
}

export default function ThemeToggle({
  mode,
  onToggle,
}: {
  mode: ThemeMode;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="v2-theme-toggle"
      style={{
        padding: "8px",
        borderRadius: "12px",
        background: "var(--v2-glass-bg)",
        border: "1px solid var(--v2-border)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 200ms ease",
        color: "var(--v2-text-secondary)",
        width: 36,
        height: 36,
      }}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
