import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  onBack?: () => void;
  showSettings?: boolean;
}

const DashboardLayout = ({ children, title, onBack, showSettings = true }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-heading font-bold text-gradient-primary">APROVA</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showSettings && (
              <Button variant="ghost" size="icon" onClick={handleSettings}>
                <Settings className="w-5 h-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-heading font-bold mb-6">{title}</h2>
        {children}
      </main>

      {/* Settings Button (Fixed Bottom Right) */}
      {showSettings && (
        <Button
          onClick={handleSettings}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-primary hover:shadow-glow"
          size="icon"
        >
          <Settings className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default DashboardLayout;
