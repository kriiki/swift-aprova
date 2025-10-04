import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrency();
  const [formData, setFormData] = useState({
    name: "John Doe",
    designation: "Senior Developer",
    department: "Engineering",
    location: "New York, USA",
    manager: "Jane Smith",
    currency: selectedCurrency,
  });

  const handleSave = () => {
    setSelectedCurrency(formData.currency);
    localStorage.setItem("userProfile", JSON.stringify(formData));
    toast.success("Profile updated successfully");
    navigate("/employee");
  };

  return (
    <DashboardLayout
      title="Edit Profile"
      onBack={() => navigate("/employee")}
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input
                value={formData.designation}
                disabled
                placeholder="To be set by admin"
              />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input
                value={formData.department}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter your location"
              />
            </div>
            <div className="space-y-2">
              <Label>Manager</Label>
              <Input
                value={formData.manager}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code} - {curr.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/employee")}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-primary">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EditProfile;
