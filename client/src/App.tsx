import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Workflow from "./pages/Workflow";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BusinessProvider } from "./contexts/BusinessContext";
import { VideoPlayerProvider } from "./contexts/VideoPlayerContext";
import BusinessPage from "./pages/Business";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Atelier from "./pages/Atelier";
import Files from "./pages/Files";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import AuditLogs from "./pages/AuditLogs";
import Chat from "./pages/Chat";
import Onboarding from "./pages/Onboarding";
import Skills from "./pages/Skills";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import PublicProfile from "./pages/PublicProfile";
import ComponentShowcase from "./pages/ComponentShowcase";
import ImageGen from "./pages/ImageGen";
import KemmaCalls from "./pages/KemmaCalls";
import Feed from "./pages/Feed";
import DashboardLayout from "./components/DashboardLayout";
import { useAuth } from "./_core/hooks/useAuth";
import { IntelligenceProvider } from "./_core/hooks/useSutaeruIntelligence";
import { useLocation } from "wouter";
import { useEffect } from "react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return null;
  if (!isAuthenticated) return null;
  return <Component />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/u/:handle" component={PublicProfile} />

      {/* Widget Home — shows the widget grid */}
      <Route path="/dashboard">
        {isAuthenticated ? (
          <DashboardLayout>{null}</DashboardLayout>
        ) : (
          <ProtectedRoute component={Dashboard} />
        )}
      </Route>

      {/* Dashboard analytics page — separate from widget grid */}
      <Route path="/dashboard-page">
        {isAuthenticated ? (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Dashboard} />
        )}
      </Route>

      {/* All protected routes — expand from widget grid */}
      <Route path="/atelier">
        {isAuthenticated ? (
          <DashboardLayout noPadding>
            <Atelier />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Atelier} />
        )}
      </Route>
      <Route path="/files">
        {isAuthenticated ? (
          <DashboardLayout>
            <Files />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Files} />
        )}
      </Route>
      <Route path="/settings">
        {isAuthenticated ? (
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Settings} />
        )}
      </Route>
      <Route path="/feed">
        {isAuthenticated ? (
          <Feed />
        ) : (
          <ProtectedRoute component={Feed} />
        )}
      </Route>
      <Route path="/kemma-calls">
        {isAuthenticated ? (
          <DashboardLayout>
            <KemmaCalls />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={KemmaCalls} />
        )}
      </Route>
      <Route path="/tasks">
        {isAuthenticated ? (
          <DashboardLayout>
            <Tasks />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Tasks} />
        )}
      </Route>
      <Route path="/admin/audit-logs">
        {isAuthenticated ? (
          <DashboardLayout>
            <AuditLogs />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={AuditLogs} />
        )}
      </Route>
      <Route path="/admin">
        {isAuthenticated ? (
          <DashboardLayout>
            <Admin />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Admin} />
        )}
      </Route>
      <Route path="/chat">
        {isAuthenticated ? (
          <DashboardLayout noPadding>
            <Chat />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Chat} />
        )}
      </Route>
      <Route path="/skills">
        {isAuthenticated ? (
          <DashboardLayout>
            <Skills />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Skills} />
        )}
      </Route>
      <Route path="/onboarding">
        {isAuthenticated ? (
          <DashboardLayout>
            <Onboarding />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Onboarding} />
        )}
      </Route>
      <Route path="/business">
        {isAuthenticated ? (
          <DashboardLayout>
            <BusinessPage />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={BusinessPage} />
        )}
      </Route>
      <Route path="/components">
        {isAuthenticated ? (
          <DashboardLayout>
            <ComponentShowcase />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={ComponentShowcase} />
        )}
      </Route>
      <Route path="/image-gen">
        {isAuthenticated ? (
          <ImageGen />
        ) : (
          <ProtectedRoute component={ImageGen} />
        )}
      </Route>
      <Route path="/workflow">
        {isAuthenticated ? (
          <DashboardLayout noPadding>
            <Workflow />
          </DashboardLayout>
        ) : (
          <ProtectedRoute component={Workflow} />
        )}
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BusinessProvider>
          <VideoPlayerProvider>
          <IntelligenceProvider>
            <TooltipProvider>
              <Toaster richColors position="top-right" />
              <AppRoutes />
            </TooltipProvider>
          </IntelligenceProvider>
          </VideoPlayerProvider>
        </BusinessProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
