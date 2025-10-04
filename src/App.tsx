import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import RoleSelect from "./pages/RoleSelect";
import Settings from "./pages/Settings";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import SubmitClaim from "./pages/employee/SubmitClaim";
import ApprovedExpenses from "./pages/employee/ApprovedExpenses";
import EditProfile from "./pages/employee/EditProfile";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ApprovedClaims from "./pages/admin/ApprovedClaims";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/claim" element={<SubmitClaim />} />
          <Route path="/employee/approved" element={<ApprovedExpenses />} />
          <Route path="/employee/edit-profile" element={<EditProfile />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/claim" element={<SubmitClaim />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/approved-claims" element={<ApprovedClaims />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
