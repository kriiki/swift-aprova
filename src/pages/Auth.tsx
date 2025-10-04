import { useState, useEffect } from "react";
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
import aprovaLogo from "@/assets/aprova-logo.png";
import LoadingScreen from "@/components/LoadingScreen";

const Auth = () => {
  const navigate = useNavigate();
  const { currencies, loading: currenciesLoading, setSelectedCurrency } = useCurrency();
  const [isApprovalPending, setIsApprovalPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ name: "", password: "", firmCode: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    number: "",
    email: "",
    firmCode: "",
    nationality: "",
  });
  const [countries, setCountries] = useState<Array<{ name: string; code: string }>>([]);

  useEffect(() => {
    if (currencies.length > 0) {
      // Create a map of currency codes to country names
      fetch("https://restcountries.com/v3.1/all?fields=name,currencies")
        .then(res => res.json())
        .then((data: any[]) => {
          const countryList = data.map(country => ({
            name: country.name.common,
            code: country.currencies ? Object.keys(country.currencies)[0] : ""
          })).filter(c => c.code).sort((a, b) => a.name.localeCompare(b.name));
          setCountries(countryList);
        });
    }
  }, [currencies]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name (letters only)
    if (!/^[a-zA-Z\s]+$/.test(loginData.name)) {
      toast.error("Name must contain letters only");
      return;
    }
    
    // Validate password length
    if (loginData.password.length <= 8) {
      toast.error("Password must exceed 8 characters");
      return;
    }
    
    // Validate firm code format
    const firstChar = loginData.firmCode.charAt(0).toUpperCase();
    if (!['E', 'M', 'A'].includes(firstChar)) {
      toast.error("Firm code must start with E (Employee), M (Manager), or A (Admin)");
      return;
    }
    
    if (!loginData.name || !loginData.password || !loginData.firmCode) {
      toast.error("Please fill all fields");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(loginData));
      setLoading(false);
      navigate("/role-select");
    }, 500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name (letters only)
    if (!/^[a-zA-Z\s]+$/.test(signupData.name)) {
      toast.error("Name must contain letters only");
      return;
    }
    
    // Validate firm code format
    const firstChar = signupData.firmCode.charAt(0).toUpperCase();
    if (!['E', 'M', 'A'].includes(firstChar)) {
      toast.error("Firm code must start with E (Employee), M (Manager), or A (Admin)");
      return;
    }
    
    if (!signupData.name || !signupData.email || !signupData.firmCode || !signupData.nationality) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Set currency based on nationality
    setSelectedCurrency(signupData.nationality);
    localStorage.setItem("userNationality", signupData.nationality);
    
    setIsApprovalPending(true);
    toast.success("Signup request submitted! Approval may take 2-3 working days.");
  };

  const handleSetPassword = (password: string) => {
    if (password.length <= 8) {
      toast.error("Password must exceed 8 characters");
      return;
    }
    toast.success("Password set successfully! You can now login.");
    setIsApprovalPending(false);
  };
  
  if (loading || currenciesLoading) return <LoadingScreen />;

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
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <img 
                src={aprovaLogo} 
                alt="APROVA Logo" 
                className="w-10 h-10 object-contain filter brightness-0 invert"
              />
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
                <Input 
                  type="password" 
                  placeholder="Enter password (more than 8 characters)" 
                  id="approval-password"
                />
              </div>
              <Button 
                onClick={() => {
                  const input = document.getElementById("approval-password") as HTMLInputElement;
                  handleSetPassword(input?.value || "");
                }} 
                className="w-full bg-gradient-primary"
              >
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
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
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
