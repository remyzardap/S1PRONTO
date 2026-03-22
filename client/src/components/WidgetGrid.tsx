import {
  MessageSquare, Layers, FolderOpen, CheckSquare, Phone,
  Sparkles, Rss, Palette, Image, Building2,
  BarChart3, Settings, GitBranch, Shield,
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
    id: "skills",
    label: "Skills",
    icon: Layers,
    path: "/skills",
    size: "medium",
    color: "purple",
    description: "Collected agent skills",
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
    path: "/dashboard-page",
    size: "medium",
    color: "blue",
    description: "Analytics overview",
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

interface WidgetGridProps {
  loading?: boolean;
  isAdmin?: boolean;
  onWidgetClick: (widget: WidgetConfig) => void;
  onNavigate: (path: string) => void;
}

export default function WidgetGrid({ loading, isAdmin, onWidgetClick, onNavigate }: WidgetGridProps) {
  if (loading) return <WidgetLoading />;

  return (
    <div className="v2-page-fade">
      <div className="v2-widget-grid">
        {/* All widgets */}
        {allWidgets.map((widget) => (
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
