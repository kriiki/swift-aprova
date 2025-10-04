import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, Flag } from "lucide-react";

interface StatusBadgeProps {
  status: "approved" | "pending" | "rejected" | "flagged";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    approved: {
      icon: CheckCircle2,
      label: "Approved",
      className: "status-approved",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      className: "status-pending",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      className: "status-rejected",
    },
    flagged: {
      icon: Flag,
      label: "Flagged",
      className: "status-flagged",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} flex items-center gap-1 border`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
