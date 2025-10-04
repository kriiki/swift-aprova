import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, CheckCircle2, XCircle, FileText, User, Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useCurrency } from "@/hooks/useCurrency";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();
  const [selectedView, setSelectedView] = useState<"overview" | "profile" | "history">("overview");

  const stats = [
    { label: "Total Expenses", value: formatAmount(12500), icon: TrendingUp, color: "text-primary" },
    { label: "Pending", value: "2", icon: Clock, color: "text-warning" },
    { label: "Approved", value: "5", icon: CheckCircle2, color: "text-success" },
    { label: "Rejected", value: "1", icon: XCircle, color: "text-destructive" },
  ];

  const recentExpenses = [
    { id: 1, title: "Office Supplies", amount: 2500, date: "2025-01-15", status: "approved" as const, category: "Supplies" },
    { id: 2, title: "Client Lunch", amount: 1200, date: "2025-01-14", status: "pending" as const, category: "Meals" },
    { id: 3, title: "Travel Expense", amount: 5000, date: "2025-01-10", status: "approved" as const, category: "Travel" },
    { id: 4, title: "Team Event", amount: 800, date: "2025-01-08", status: "rejected" as const, category: "Events" },
  ];

  return (
    <DashboardLayout
      title="Employee Dashboard"
      onBack={() => navigate("/role-select")}
    >
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === "overview" ? "default" : "outline"}
          onClick={() => setSelectedView("overview")}
          className={selectedView === "overview" ? "bg-gradient-primary" : ""}
        >
          <FileText className="w-4 h-4 mr-2" />
          Overview
        </Button>
        <Button
          variant={selectedView === "profile" ? "default" : "outline"}
          onClick={() => setSelectedView("profile")}
          className={selectedView === "profile" ? "bg-gradient-primary" : ""}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
        <Button
          variant={selectedView === "history" ? "default" : "outline"}
          onClick={() => setSelectedView("history")}
          className={selectedView === "history" ? "bg-gradient-primary" : ""}
        >
          <Clock className="w-4 h-4 mr-2" />
          History
        </Button>
      </div>

      {selectedView === "overview" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="card-hover">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button onClick={() => navigate("/employee/claim")} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Claim
              </Button>
              <Button variant="outline" onClick={() => navigate("/employee/approved")}>
                View All Approved Expenses
              </Button>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Your latest expense submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {expense.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{formatAmount(expense.amount)}</span>
                      <StatusBadge status={expense.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View and manage your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Designation</p>
                <p className="font-medium">Senior Developer</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">Engineering</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">New York, USA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Manager</p>
                <p className="font-medium">Jane Smith</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="font-medium">USD</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/employee/edit-profile")}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedView === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Expense History</CardTitle>
            <CardDescription>Complete history of all your expense claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category} • {expense.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{formatAmount(expense.amount)}</span>
                    <StatusBadge status={expense.status} />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View More</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
