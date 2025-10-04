import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useCurrency } from "@/hooks/useCurrency";

const ApprovedClaims = () => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();

  const approvedClaims = [
    { id: 1, name: "Manager A", type: "Manager", amount: 12000, category: "Team Event", date: "2025-01-14" },
    { id: 2, name: "Employee X", type: "Employee", amount: 5000, category: "Travel", date: "2025-01-13" },
    { id: 3, name: "Manager B", type: "Manager", amount: 8500, category: "Client Meeting", date: "2025-01-12" },
    { id: 4, name: "Employee Y", type: "Employee", amount: 3200, category: "Software", date: "2025-01-11" },
  ];

  return (
    <DashboardLayout
      title="Approved Claims History"
      onBack={() => navigate("/admin")}
    >
      <Card>
        <CardHeader>
          <CardTitle>All Approved Claims</CardTitle>
          <CardDescription>Complete history of claims approved by admin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvedClaims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{claim.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.type} • {claim.category} • {claim.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{formatAmount(claim.amount)}</span>
                  <StatusBadge status="approved" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ApprovedClaims;
