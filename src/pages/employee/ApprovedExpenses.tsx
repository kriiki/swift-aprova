import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useCurrency } from "@/hooks/useCurrency";

const ApprovedExpenses = () => {
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();

  const approvedExpenses = [
    { id: 1, title: "Office Supplies", amount: 2500, date: "2025-01-15", status: "approved" as const, category: "Supplies" },
    { id: 2, title: "Travel Expense", amount: 5000, date: "2025-01-10", status: "approved" as const, category: "Travel" },
    { id: 3, title: "Team Building", amount: 3200, date: "2025-01-08", status: "approved" as const, category: "Events" },
    { id: 4, title: "Client Meeting", amount: 1800, date: "2025-01-05", status: "approved" as const, category: "Meals" },
    { id: 5, title: "Software License", amount: 4500, date: "2025-01-03", status: "approved" as const, category: "Software" },
  ];

  return (
    <DashboardLayout
      title="Approved Expenses"
      onBack={() => navigate("/employee")}
    >
      <Card>
        <CardHeader>
          <CardTitle>All Approved Expenses</CardTitle>
          <CardDescription>Complete list of your approved expense claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
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
    </DashboardLayout>
  );
};

export default ApprovedExpenses;
