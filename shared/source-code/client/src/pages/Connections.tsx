import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plug,
  Loader2,
  Plus,
  Ban,
  Key,
  Lock,
  Globe,
  Cpu,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const connectionTypeIcons = {
  llm_api_key: Cpu,
  oauth2: Globe,
  generic_api_key: Key,
};
const connectionTypeLabels = {
  llm_api_key: "LLM API Key",
  oauth2: "OAuth 2.0",
  generic_api_key: "API Key",
};
const connectionTypeColors = {
  llm_api_key: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  oauth2: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  generic_api_key: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};
const statusConfig = {
  active: { icon: CheckCircle2, color: "text-emerald-500", label: "Active" },
  revoked: { icon: XCircle, color: "text-red-500", label: "Revoked" },
  expired: { icon: Clock, color: "text-amber-500", label: "Expired" },
};

export default function Connections() {
  const utils = trpc.useUtils();
  const [isAdding, setIsAdding] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  // Generic form state
  const [provider, setProvider] = useState("");
  const [type, setType] = useState<"llm_api_key" | "oauth2" | "generic_api_key">("generic_api_key");
  const [displayName, setDisplayName] = useState("");
  const [credentials, setCredentials] = useState("");

  const { data: connections, isLoading } = trpc.connections.list.useQuery();

  const addMutation = trpc.connections.add.useMutation({
    onSuccess: () => {
      toast.success("Connection added!");
      utils.connections.list.invalidate();
      setIsAdding(false);
      resetForm();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const revokeMutation = trpc.connections.revoke.useMutation({
    onSuccess: () => {
      toast.success("Connection revoked!");
      utils.connections.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const resetForm = () => {
    setProvider("");
    setType("generic_api_key");
    setDisplayName("");
    setCredentials("");
    setShowCredentials(false);
  };

  const handleAdd = () => {
    addMutation.mutate({
      provider,
      type,
      displayName: displayName || undefined,
      encryptedCredentials: credentials,
    });
  };

  const handleRevoke = (id: number) => {
    if (confirm("Are you sure you want to revoke this connection?")) {
      revokeMutation.mutate({ id });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading connections...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-700 text-foreground">Connections</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage external service connections for your agent
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isAdding ? "secondary" : "default"}
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Connection</>}
          </Button>
        </div>
      </div>

      {/* Add Connection Form */}
      {isAdding && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Add New Connection</CardTitle>
            <CardDescription>
              Connect your agent to external services and APIs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider *</Label>
                <Input
                  id="provider"
                  placeholder="e.g., OpenAI, Slack, GitHub"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="connType">Type *</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llm_api_key">LLM API Key</SelectItem>
                    <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    <SelectItem value="generic_api_key">Generic API Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="connDisplayName">Display Name</Label>
              <Input
                id="connDisplayName"
                placeholder="My OpenAI Key"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentials">Credentials *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="credentials"
                  type={showCredentials ? "text" : "password"}
                  className="pl-9 pr-10"
                  placeholder="API key, token, or credentials"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowCredentials(!showCredentials)}
                >
                  {showCredentials ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your credentials are encrypted before storage
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={!provider || !credentials || addMutation.isPending}
              >
                {addMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connections Grid */}
      {connections && connections.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {connections.map((connection) => {
            const TypeIcon = connectionTypeIcons[connection.type];
            const StatusIcon = statusConfig[connection.status].icon;
            const statusColor = statusConfig[connection.status].color;
            const isActive = connection.status === "active";

            return (
              <Card
                key={connection.id}
                className={cn(
                  !isActive && "opacity-75"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        connectionTypeColors[connection.type].split(" ")[0]
                      )}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {connection.displayName || connection.provider}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            variant="outline"
                            className={cn("text-xs", connectionTypeColors[connection.type])}
                          >
                            {connectionTypeLabels[connection.type]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <StatusIcon className={cn("h-4 w-4", statusColor)} />
                      <span className={cn("text-xs font-medium", statusColor)}>
                        {statusConfig[connection.status].label}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="font-medium capitalize">{connection.provider}</span>
                    </div>

                    {connection.lastUsedAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Used</span>
                        <span>{format(new Date(connection.lastUsedAt), "MMM d, yyyy")}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Added</span>
                      <span>{format(new Date(connection.createdAt), "MMM d, yyyy")}</span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-4 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRevoke(connection.id)}
                        disabled={revokeMutation.isPending}
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Revoke Connection
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Plug className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No connections yet</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
                Add connections to enable your Sutaeru agent to interact with external services
              </p>
              <Button className="mt-4" onClick={() => setIsAdding(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Connection
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

