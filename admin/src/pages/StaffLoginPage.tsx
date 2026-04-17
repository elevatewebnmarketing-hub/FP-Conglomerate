import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "../components/AdminNav.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicApiBaseUrl, getStaffToken, postStaffLogin, setStaffToken } from "@/lib/elevateApi";
import { toast } from "sonner";

const defaultSlug = import.meta.env.VITE_PUBLIC_ORGANIZATION_SLUG?.trim() ?? "";

export default function StaffLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationSlug, setOrganizationSlug] = useState(defaultSlug);
  const [submitting, setSubmitting] = useState(false);

  if (getStaffToken()) {
    return <Navigate to="/leads" replace />;
  }

  const apiConfigured = Boolean(getPublicApiBaseUrl());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiConfigured) {
      toast.error("API not configured", {
        description: "Set VITE_PUBLIC_API_BASE_URL in admin environment.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { access_token } = await postStaffLogin({ email, password, organizationSlug });
      setStaffToken(access_token);
      toast.success("Signed in");
      navigate("/leads", { replace: true });
    } catch (err) {
      toast.error("Sign-in failed", {
        description: err instanceof Error ? err.message : "Check your credentials.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <AdminNav />
      <main className="min-h-[60vh] bg-muted/25 pb-24 pt-8">
        <div className="section-shell max-w-md">
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="font-editorial text-2xl">Staff sign in</CardTitle>
              <CardDescription>
                Elevate org admin — uses <code className="text-xs">POST /v1/auth/login</code>. JWT is stored in
                session storage for this tab only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!apiConfigured && (
                <p className="mb-4 text-sm text-destructive">
                  Set <code className="text-xs">VITE_PUBLIC_API_BASE_URL</code> in <code className="text-xs">admin/.env</code>.
                </p>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-slug">Organization slug</Label>
                  <Input
                    id="org-slug"
                    value={organizationSlug}
                    onChange={(ev) => setOrganizationSlug(ev.target.value)}
                    autoComplete="organization"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting || !apiConfigured}>
                  {submitting ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
