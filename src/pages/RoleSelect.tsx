import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, User } from "lucide-react";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import aprovaLogo from "@/assets/aprova-logo.png";

const RoleSelect = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"admin" | "manager" | "employee" | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: "admin" as const,
      title: "Admin",
      description: "Full system access and management",
      icon: Shield,
      color: "from-primary to-primary-light",
    },
    {
      id: "manager" as const,
      title: "Manager",
      description: "Approve team expenses and manage workflows",
      icon: Users,
      color: "from-accent to-warning",
    },
    {
      id: "employee" as const,
      title: "Employee",
      description: "Submit and track expense claims",
      icon: User,
      color: "from-info to-primary-glow",
    },
  ];

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !password) {
      toast.error("Please enter code and password");
      return;
    }

    setLoading(true);
    localStorage.setItem("userRole", selectedRole || "");
    
    setTimeout(() => {
      setLoading(false);
      navigate(`/${selectedRole}`);
    }, 500);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/auth")}
        className="absolute top-4 left-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="max-w-4xl mx-auto pt-20 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary shadow-glow flex items-center justify-center">
              <img 
                src={aprovaLogo} 
                alt="APROVA Logo" 
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold text-gradient-primary">
            Select Your Role
          </h1>
          <p className="text-muted-foreground">
            Choose your role to access the appropriate dashboard
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.id}
                  className="card-hover cursor-pointer border-2 hover:border-primary/50"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle>{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>
                {roles.find((r) => r.id === selectedRole)?.title} Login
              </CardTitle>
              <CardDescription>
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRoleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your code"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedRole(null)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-primary">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoleSelect;
