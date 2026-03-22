import {
  MessageSquare, Brain, Layers, CloudLightning, Plug, Compass,
  FolderOpen, Receipt, CheckSquare, Phone, BarChart3, Sparkles,
  TrendingUp, Activity, LayoutGrid, Palette, Image, Building2,
  MessageCircle, ShoppingCart, CreditCard, Shield, Rss, Heart,
  Settings, GitBranch, ClipboardCheck,
  Plus, Upload, MessageSquarePlus
} from "lucide-react";
import WidgetCard, { type WidgetConfig } from "./WidgetCard";
import WidgetLoading from "./WidgetLoading";

const allWidgets: WidgetConfig[] = [
  // Large widgets
  {
    id: "chat",
    label: "Kemma Chat",
    icon: MessageSquare,
    path: "/chat",
    size: "large",
    color: "indigo",
    description: "Continue your conversation with Kemma",
    noPadding: true,
  },
  {
    id: "board",
    label: "S1 Intelligence",
    icon: LayoutGrid,
    path: "/board",
    size: "large",
    color: "blue",
    description: "Model status, usage & agent hub",
  },
  // Medium widgets
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
    size: "medium",
    color: "orange",
    description: "Active tasks & progress",
  },
  {
    id: "files",
    label: "Files",
    icon: FolderOpen,
    path: "/files",
    size: "medium",
    color: "green",
    description: "Recent files & storage",
  },
  {
    id: "memories",
    label: "Memories",
    icon: CloudLightning,
    path: "/memories",
    size: "medium",
    color: "indigo",
    description: "Your saved memory vault",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Layers,
    path: "/skills",
    size: "medium",
    color: "purple",
    description: "Collected agent skills",
  },
  {
    id: "receipts",
    label: "Receipts",
    icon: Receipt,
    path: "/receipts",
    size: "medium",
    color: "amber",
    description: "Monthly totals & history",
  },
  {
    id: "kemma-calls",
    label: "Kemma Calls",
    icon: Phone,
    path: "/kemma-calls",
    size: "medium",
    color: "cyan",
    description: "Voice AI & call history",
  },
  // Additional modules
  {
    id: "identity",
    label: "Identity",
    icon: Brain,
    path: "/identity",
    size: "medium",
    color: "purple",
    description: "Your AI persona & preferences",
  },
  {
    id: "connections",
    label: "Connections",
    icon: Plug,
    path: "/connections",
    size: "medium",
    color: "blue",
    description: "Linked services & APIs",
  },
  {
    id: "discover",
    label: "Discover",
    icon: Compass,
    path: "/discover",
    size: "medium",
    color: "pink",
    description: "Explore new skills & agents",
  },
  {
    id: "feed",
    label: "Feed",
    icon: Rss,
    path: "/feed",
    size: "medium",
    color: "orange",
    description: "Activity & updates",
  },
  // Forge group
  {
    id: "atelier",
    label: "Atelier",
    icon: Palette,
    path: "/atelier",
    size: "medium",
    color: "purple",
    noPadding: true,
    description: "Creative workspace",
  },
  {
    id: "generate",
    label: "Generate",
    icon: Sparkles,
    path: "/generate",
    size: "medium",
    color: "indigo",
    description: "AI content generation",
  },
  {
    id: "image-gen",
    label: "Image Gen",
    icon: Image,
    path: "/image-gen",
    size: "medium",
    color: "pink",
    description: "AI image creation",
  },
  // Office group
  {
    id: "business",
    label: "Businesses",
    icon: Building2,
    path: "/business",
    size: "medium",
    color: "amber",
    description: "Manage your businesses",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    path: "/dashboard",
    size: "medium",
    color: "blue",
    description: "Analytics overview",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
    size: "medium",
    color: "indigo",
    description: "Business reports",
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: ShoppingCart,
    path: "/procurement",
    size: "medium",
    color: "green",
    description: "Purchasing & orders",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    path: "/whatsapp",
    size: "medium",
    color: "green",
    description: "Business messaging",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    path: "/billing",
    size: "medium",
    color: "purple",
    description: "Payments & subscriptions",
  },
  {
    id: "review",
    label: "Review Queue",
    icon: ClipboardCheck,
    path: "/review",
    size: "medium",
    color: "orange",
    description: "Pending reviews",
  },
  {
    id: "workflow",
    label: "Workflows",
    icon: GitBranch,
    path: "/workflow",
    size: "medium",
    color: "cyan",
    noPadding: true,
    description: "Automation flows",
  },
  // Health & KPIs
  {
    id: "health",
    label: "System Health",
    icon: Heart,
    path: "/health",
    size: "medium",
    color: "red",
    description: "Platform vitals",
  },
  {
    id: "kpis",
    label: "KPIs",
    icon: TrendingUp,
    path: "/kpis",
    size: "medium",
    color: "indigo",
    description: "Key performance indicators",
  },
  // Settings
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
    size: "medium",
    color: "purple",
    description: "Preferences & config",
  },
];

// Quick Actions small widget
function QuickActionsWidget({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div
      className="v2-widget-card v2-widget-small"
      style={{ cursor: "default" }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <h3
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--v2-text-secondary)",
            margin: "0 0 12px",
          }}
        >
          Quick Actions
        </h3>
        <div className="flex gap-2">
          {[
            { icon: MessageSquarePlus, label: "New Chat", path: "/chat" },
            { icon: Upload, label: "Upload", path: "/files" },
            { icon: Plus, label: "New Task", path: "/tasks" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(action.path);
              }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "10px 8px",
                borderRadius: 12,
                background: "var(--v2-glass-bg)",
                border: "1px solid var(--v2-border)",
                cursor: "pointer",
                transition: "all 200ms ease",
                color: "var(--v2-text-secondary)",
                fontFamily: "var(--v2-font-body)",
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              <action.icon className="w-4 h-4" style={{ color: "var(--v2-accent)" }} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface WidgetGridProps {
  loading?: boolean;
  isAdmin?: boolean;
  onWidgetClick: (widget: WidgetConfig) => void;
  onNavigate: (path: string) => void;
}

export default function WidgetGrid({ loading, isAdmin, onWidgetClick, onNavigate }: WidgetGridProps) {
  if (loading) return <WidgetLoading />;

  // Filter admin-only widgets
  const adminOnlyIds = ["admin", "kpis", "health"];
  const visibleWidgets = isAdmin
    ? allWidgets
    : allWidgets.filter((w) => !adminOnlyIds.includes(w.id));

  return (
    <div className="v2-page-fade">
      <div className="v2-widget-grid">
        {/* Quick Actions at top */}
        <QuickActionsWidget onNavigate={onNavigate} />

        {/* All widgets */}
        {visibleWidgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} onClick={onWidgetClick} />
        ))}

        {/* Admin widget if admin */}
        {isAdmin && (
          <WidgetCard
            widget={{
              id: "admin",
              label: "Admin Panel",
              icon: Shield,
              path: "/admin",
              size: "medium",
              color: "red",
              description: "System administration",
            }}
            onClick={onWidgetClick}
          />
        )}
      </div>
    </div>
  );
}

export { allWidgets };
