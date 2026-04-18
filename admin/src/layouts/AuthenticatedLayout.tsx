import { Navigate } from "react-router-dom";
import { getStaffToken } from "@/lib/elevateApi";
import AdminDashboardShell from "../components/AdminDashboardShell.tsx";

export default function AuthenticatedLayout() {
  if (!getStaffToken()) {
    return <Navigate to="/login" replace />;
  }
  return <AdminDashboardShell />;
}
