import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, MoreVertical, TrendingUp, Clock, Users, Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [selectedClaims, setSelectedClaims] = useState<number[]>([]);
  const [selectedView, setSelectedView] = useState<"queue" | "analytics" | "history">("queue");

  const pendingClaims = [
    { id: 1, employee: "John Doe", department: "Engineering", amount: 2500, category: "Travel", date: "2025-01-15" },
    { id: 2, employee: "Jane Smith", department: "Marketing", amount: 1200, category: "Meals", date: "2025-01-14" },
    { id: 3, employee: "Bob Johnson", department: "Sales", amount: 3200, category: "Client Meeting", date: "2025-01-13" },
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

  const handleBulkApprove = () => {
    if (selectedClaims.length === 0) {
      toast.error("Please select claims to approve");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success(`${selectedClaims.length} claims approved`);
      setSelectedClaims([]);
      setLoading(false);
    }, 500);
  };

  const handleBulkReject = () => {
    if (selectedClaims.length === 0) {
      toast.error("Please select claims to reject");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success(`${selectedClaims.length} claims rejected`);
      setSelectedClaims([]);
      setLoading(false);
    }, 500);
  };

  if (loading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Manager Dashboard" onBack={() => navigate("/role-select")}>
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === "queue" ? "default" : "outline"}
          onClick={() => setSelectedView("queue")}
          className={selectedView === "queue" ? "bg-gradient-primary" : ""}
        >
          <Clock className="w-4 h-4 mr-2" />
          Approval Queue
        </Button>
        <Button
          variant={selectedView === "analytics" ? "default" : "outline"}
          onClick={() => setSelectedView("analytics")}
          className={selectedView === "analytics" ? "bg-gradient-primary" : ""}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Analytics
        </Button>
        <Button
          variant={selectedView === "history" ? "default" : "outline"}
          onClick={() => setSelectedView("history")}
          className={selectedView === "history" ? "bg-gradient-primary" : ""}
        >
          <Users className="w-4 h-4 mr-2" />
          History
        </Button>
      </div>

      {selectedView === "queue" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Total: {formatAmount(45000)}</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Approved This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Team Avg Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatAmount(3200)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button onClick={() => navigate("/manager/claim")} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Submit My Claim
              </Button>
              {selectedClaims.length > 0 && (
                <>
                  <Button onClick={handleBulkApprove} variant="outline" className="border-success text-success">
                    <Check className="w-4 h-4 mr-2" />
                    Approve Selected ({selectedClaims.length})
                  </Button>
                  <Button onClick={handleBulkReject} variant="outline" className="border-destructive text-destructive">
                    <X className="w-4 h-4 mr-2" />
                    Reject Selected ({selectedClaims.length})
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Approval Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and approve team expense claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedClaims.includes(claim.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedClaims([...selectedClaims, claim.id]);
                        } else {
                          setSelectedClaims(selectedClaims.filter((id) => id !== claim.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{claim.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {claim.department} • {claim.category} • {claim.date}
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

      {selectedView === "analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Team Expense Analytics</CardTitle>
            <CardDescription>Insights into team spending patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Top Category</p>
                <p className="text-2xl font-bold">Travel (40%)</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">This Month vs Last</p>
                <p className="text-2xl font-bold text-success">-12%</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground py-8">
              Analytics charts and detailed insights will be displayed here
            </p>
          </CardContent>
        </Card>
      )}

      {selectedView === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Approval History</CardTitle>
            <CardDescription>Past approved and rejected claims</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              Historical approval records will be displayed here
            </p>
            <Button variant="outline" className="w-full">View More</Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default ManagerDashboard;
