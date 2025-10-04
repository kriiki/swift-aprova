import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    toast.success(`Currency changed to ${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-bold text-gradient-primary">Settings</h1>
          <p className="text-muted-foreground">Customize your APROVA experience</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how APROVA looks for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === "dark" ? "Currently using dark theme" : "Currently using light theme"}
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>Select your preferred currency for displaying amounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name} ({curr.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
