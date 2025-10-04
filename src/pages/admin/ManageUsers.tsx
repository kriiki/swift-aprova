import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Employee", designation: "Senior Developer", department: "Engineering" },
    { id: 2, name: "Jane Smith", role: "Manager", designation: "Engineering Manager", department: "Engineering" },
    { id: 3, name: "Bob Johnson", role: "Employee", designation: "Sales Executive", department: "Sales" },
  ]);

  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editData, setEditData] = useState({ designation: "", department: "" });

  const handleEdit = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(userId);
      setEditData({ designation: user.designation, department: user.department });
    }
  };

  const handleSave = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, designation: editData.designation, department: editData.department }
        : u
    ));
    setEditingUser(null);
    toast.success("User details updated successfully");
  };

  return (
    <DashboardLayout
      title="Manage Users"
      onBack={() => navigate("/admin")}
    >
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage employee and manager designations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg space-y-3">
                {editingUser === user.id ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Name</Label>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Role</Label>
                        <p className="font-medium">{user.role}</p>
                      </div>
                      <div>
                        <Label>Designation</Label>
                        <Input
                          value={editData.designation}
                          onChange={(e) => setEditData({ ...editData, designation: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Input
                          value={editData.department}
                          onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSave(user.id)} className="bg-gradient-primary">
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingUser(null)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Name</Label>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Role</Label>
                        <p className="font-medium">{user.role}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Designation</Label>
                        <p className="font-medium">{user.designation}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Department</Label>
                        <p className="font-medium">{user.department}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(user.id)}>
                      Edit
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageUsers;
