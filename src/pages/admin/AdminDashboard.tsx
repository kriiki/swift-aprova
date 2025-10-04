import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, MoreVertical, Settings as SettingsIcon, Bell } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState<"approvals" | "limits" | "notifications">("approvals");
  const [claimLimits, setClaimLimits] = useState({
    manager1: "10000",
    manager2: "15000",
    manager3: "12000",
  });

  const pendingClaims = [
    { id: 1, name: "Manager A", department: "Engineering", amount: 15000, category: "Team Event", date: "2025-01-15", type: "manager" },
    { id: 2, name: "Employee X", department: "Sales", amount: 8000, category: "Travel", date: "2025-01-14", type: "escalated" },
  ];

  const notifications = [
    { id: 1, message: "Manager A approved claim of ₹5,000", time: "2 hours ago" },
    { id: 2, message: "Manager B approved claim of ₹3,200", time: "5 hours ago" },
    { id: 3, message: "Manager C approved claim of ₹7,500", time: "1 day ago" },
  ];

  const handleApprove = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Claim approved successfully");
      setLoading(false);
    }, 500);
  };

  const handleReject = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Claim rejected");
      setLoading(false);
    }, 500);
  };

  const handleSaveLimits = () => {
    toast.success("Claim limits updated successfully");
  };

  if (loading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Admin Dashboard" onBack={() => navigate("/role-select")}>
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === "approvals" ? "default" : "outline"}
          onClick={() => setSelectedView("approvals")}
          className={selectedView === "approvals" ? "bg-gradient-primary" : ""}
        >
          <Check className="w-4 h-4 mr-2" />
          Approvals
        </Button>
        <Button
          variant={selectedView === "limits" ? "default" : "outline"}
          onClick={() => setSelectedView("limits")}
          className={selectedView === "limits" ? "bg-gradient-primary" : ""}
        >
          <SettingsIcon className="w-4 h-4 mr-2" />
          Claim Limits
        </Button>
        <Button
          variant={selectedView === "notifications" ? "default" : "outline"}
          onClick={() => setSelectedView("notifications")}
          className={selectedView === "notifications" ? "bg-gradient-primary" : ""}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </Button>
      </div>

      {selectedView === "approvals" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Pending Admin Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Total: {formatAmount(67000)}</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Manager Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Escalated Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">2</p>
              </CardContent>
            </Card>
          </div>

          {/* Approval Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Manager claims and escalated employee claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{claim.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {claim.department} • {claim.category} • {claim.date}
                      </p>
                      <p className="text-xs text-info mt-1">
                        {claim.type === "manager" ? "Manager Claim" : "Escalated from Manager"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatAmount(claim.amount)}</p>
                      <StatusBadge status="pending" />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-success hover:bg-success/10"
                        onClick={() => handleApprove(claim.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleReject(claim.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === "limits" && (
        <Card>
          <CardHeader>
            <CardTitle>Manager Claim Limits</CardTitle>
            <CardDescription>Set maximum claim amounts that managers can approve</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Manager A - Engineering</Label>
                <Input
                  type="number"
                  value={claimLimits.manager1}
                  onChange={(e) => setClaimLimits({ ...claimLimits, manager1: e.target.value })}
                  placeholder="Enter limit"
                />
              </div>
              <div className="space-y-2">
                <Label>Manager B - Sales</Label>
                <Input
                  type="number"
                  value={claimLimits.manager2}
                  onChange={(e) => setClaimLimits({ ...claimLimits, manager2: e.target.value })}
                  placeholder="Enter limit"
                />
              </div>
              <div className="space-y-2">
                <Label>Manager C - Marketing</Label>
                <Input
                  type="number"
                  value={claimLimits.manager3}
                  onChange={(e) => setClaimLimits({ ...claimLimits, manager3: e.target.value })}
                  placeholder="Enter limit"
                />
              </div>
            </div>
            <Button onClick={handleSaveLimits} className="bg-gradient-primary">
              Save Limits
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedView === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle>Manager Approval Notifications</CardTitle>
            <CardDescription>Recent approvals made by managers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{notif.message}</p>
                    <p className="text-sm text-muted-foreground">{notif.time}</p>
                  </div>
                  <Bell className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
