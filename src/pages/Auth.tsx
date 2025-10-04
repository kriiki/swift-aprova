import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";

const Auth = () => {
  const navigate = useNavigate();
  const { currencies } = useCurrency();
  const [isApprovalPending, setIsApprovalPending] = useState(false);
  const [loginData, setLoginData] = useState({ name: "", password: "", firmCode: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    number: "",
    email: "",
    firmCode: "",
    nationality: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.name || !loginData.password || !loginData.firmCode) {
      toast.error("Please fill all fields");
      return;
    }
    // Simulate login
    localStorage.setItem("user", JSON.stringify(loginData));
    navigate("/role-select");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.firmCode) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsApprovalPending(true);
    toast.success("Signup request submitted! Approval may take 2-3 working days.");
  };

  const handleSetPassword = () => {
    toast.success("Password set successfully! You can now login.");
    setIsApprovalPending(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary-foreground"
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
          </div>
          <h2 className="text-3xl font-heading font-bold text-gradient-primary">APROVA</h2>
        </div>

        {isApprovalPending ? (
          <Card>
            <CardHeader>
              <CardTitle>Approval Pending</CardTitle>
              <CardDescription>
                Your signup request has been submitted. You'll receive an email to set your password
                once approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Set Password (After Approval)</Label>
                <Input type="password" placeholder="Enter password" />
              </div>
              <Button onClick={handleSetPassword} className="w-full bg-gradient-primary">
                Set Password
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <Tabs defaultValue="login">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={loginData.name}
                        onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Firm Code</Label>
                      <Input
                        value={loginData.firmCode}
                        onChange={(e) => setLoginData({ ...loginData, firmCode: e.target.value })}
                        placeholder="Enter firm code"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-primary">
                      Login
                    </Button>
                  </CardContent>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        value={signupData.number}
                        onChange={(e) => setSignupData({ ...signupData, number: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Firm Code</Label>
                      <Input
                        value={signupData.firmCode}
                        onChange={(e) => setSignupData({ ...signupData, firmCode: e.target.value })}
                        placeholder="Enter firm code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nationality</Label>
                      <Select
                        value={signupData.nationality}
                        onValueChange={(value) =>
                          setSignupData({ ...signupData, nationality: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.slice(0, 20).map((curr) => (
                            <SelectItem key={curr.code} value={curr.code}>
                              {curr.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-primary">
                      Sign Up
                    </Button>
                  </CardContent>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
