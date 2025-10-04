import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

const SubmitClaim = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Claim submitted successfully!");
      setLoading(false);
      navigate("/employee");
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
      toast.success("File uploaded successfully");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Submit Expense Claim" onBack={() => navigate("/employee")}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Expense Claim</CardTitle>
          <CardDescription>Fill in the details of your expense claim</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Expense Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Client Lunch, Travel Expense"
              />
            </div>

            <div className="space-y-2">
              <Label>Amount *</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="meals">Meals</SelectItem>
                  <SelectItem value="supplies">Office Supplies</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add any additional details..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Receipt/Bill</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or PDF (max. 5MB)
                  </p>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/employee")} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-primary">
                Submit Claim
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default SubmitClaim;
