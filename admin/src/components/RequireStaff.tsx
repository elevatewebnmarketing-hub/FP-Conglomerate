import { Navigate } from "react-router-dom";
import { getStaffToken } from "@/lib/elevateApi";

export default function RequireStaff({ children }: { children: React.ReactNode }) {
  if (!getStaffToken()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
