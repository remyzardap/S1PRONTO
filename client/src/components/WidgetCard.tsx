import { ArrowRight, type LucideIcon } from "lucide-react";

export interface WidgetConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  size: "large" | "medium" | "small";
  color?: string;
  description?: string;
  preview?: React.ReactNode;
  noPadding?: boolean;
}

interface WidgetCardProps {
  widget: WidgetConfig;
  onClick: (widget: WidgetConfig) => void;
}

const sizeClasses: Record<string, string> = {
  large: "v2-widget-large",
  medium: "v2-widget-medium",
  small: "v2-widget-small",
};

const colorMap: Record<string, string> = {
  teal: "rgba(20, 184, 166, 0.10)",
  purple: "rgba(139, 92, 246, 0.10)",
  blue: "rgba(14, 165, 233, 0.10)",
  orange: "rgba(245, 158, 11, 0.10)",
  green: "rgba(34, 197, 94, 0.10)",
  pink: "rgba(236, 72, 153, 0.10)",
  red: "rgba(239, 68, 68, 0.10)",
  amber: "rgba(245, 166, 35, 0.10)",
  indigo: "rgba(99, 102, 241, 0.10)",
  cyan: "rgba(6, 182, 212, 0.10)",
};

const iconColorMap: Record<string, string> = {
  teal: "#14b8a6",
  purple: "#8b5cf6",
  blue: "#0ea5e9",
  orange: "#f59e0b",
  green: "#22c55e",
  pink: "#ec4899",
  red: "#ef4444",
  amber: "#F5A623",
  indigo: "#6366f1",
  cyan: "#06b6d4",
};

export default function WidgetCard({ widget, onClick }: WidgetCardProps) {
  const Icon = widget.icon;
  const color = widget.color || "indigo";
  const bgColor = colorMap[color] || colorMap.indigo;
  const icoColor = iconColorMap[color] || iconColorMap.indigo;

  return (
    <div
      className={`v2-widget-card ${sizeClasses[widget.size]} ${widget.size === "large" ? "v2-widget-span-2" : ""}`}
      onClick={() => onClick(widget)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(widget)}
    >
      <div className="flex items-start justify-between" style={{ position: "relative", zIndex: 2 }}>
        <div className="flex items-center gap-3">
          <div
            className="v2-icon-pill"
            style={{ background: bgColor, color: icoColor }}
          >
            <Icon className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--v2-font-heading)",
                fontWeight: 600,
                fontSize: widget.size === "large" ? 16 : 14,
                color: "var(--v2-text)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {widget.label}
            </h3>
            {widget.description && (
              <p
                style={{
                  fontFamily: "var(--v2-font-body)",
                  fontSize: 12,
                  color: "var(--v2-text-muted)",
                  margin: "4px 0 0",
                  lineHeight: 1.4,
                }}
              >
                {widget.description}
              </p>
            )}
          </div>
        </div>
        <div className="v2-open-arrow" style={{ color: "var(--v2-text-muted)", marginTop: 2 }}>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Preview content */}
      {widget.preview && (
        <div style={{ marginTop: 16, position: "relative", zIndex: 2 }}>
          {widget.preview}
        </div>
      )}
    </div>
  );
}
