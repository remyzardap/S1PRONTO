import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, LogOut, Settings } from "lucide-react";
import { useLocation } from "wouter";
import ThemeToggle, { type ThemeMode } from "./ThemeToggle";

interface TopBarProps {
  user: { name?: string; email?: string } | null;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onLogout: () => void;
}

export default function TopBar({ user, themeMode, onToggleTheme, onLogout }: TopBarProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="v2-topbar">
      {/* Left: Logo */}
      <button
        onClick={() => setLocation("/dashboard")}
        className="flex items-center gap-2.5"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "var(--v2-accent-gradient)",
            boxShadow: "0 0 16px var(--v2-accent-glow)",
          }}
        >
          <Brain className="w-4 h-4 text-white" />
        </div>
        <span
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--v2-text)",
          }}
        >
          Sutaeru
        </span>
      </button>

      {/* Right: Theme toggle + User */}
      <div className="flex items-center gap-3">
        <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center"
              style={{
                background: "none",
                border: "1px solid var(--v2-border)",
                cursor: "pointer",
                borderRadius: "50%",
                width: 36,
                height: 36,
                padding: 0,
              }}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  style={{
                    background: "rgba(var(--v2-accent-rgb), 0.12)",
                    color: "var(--v2-accent)",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "var(--v2-font-heading)",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setLocation("/settings")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
