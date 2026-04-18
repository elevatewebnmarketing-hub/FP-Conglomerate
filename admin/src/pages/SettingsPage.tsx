import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizeItems, staffGet, staffPatch } from "@/lib/elevateApi";
import type { OrganizationAdmin, SiteAdmin } from "@/lib/elevateApiTypes";
import { toast } from "sonner";

export default function SettingsPage() {
  const [orgEmail, setOrgEmail] = useState("");
  const [sites, setSites] = useState<SiteAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const org = await staffGet<OrganizationAdmin>("/v1/admin/organization");
        if (cancelled) return;
        setOrgEmail(org.leadsNotificationEmail ?? "");
        const raw = await staffGet<unknown>("/v1/admin/sites");
        if (cancelled) return;
        setSites(normalizeItems<SiteAdmin>(raw));
      } catch (e) {
        toast.error("Failed to load settings", {
          description: e instanceof Error ? e.message : String(e),
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const saveOrg = async () => {
    setSaving(true);
    try {
      await staffPatch("/v1/admin/organization", {
        leadsNotificationEmail: orgEmail.trim() || null,
      });
      toast.success("Organization updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveSiteEmail = async (siteId: string, email: string) => {
    try {
      await staffPatch(`/v1/admin/sites/${siteId}`, {
        leadsNotificationEmail: email.trim() || null,
      });
      toast.success("Site updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <p className="eyebrow mb-1">Elevate</p>
            <h2 className="font-editorial text-3xl text-foreground">Lead notification emails</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Server resolves site override first, then organization fallback. Requires Resend on the API.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Organization fallback</CardTitle>
                  <CardDescription>GET/PATCH /v1/admin/organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-email">leadsNotificationEmail</Label>
                    <Input
                      id="org-email"
                      type="email"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      placeholder="ops@example.com"
                    />
                  </div>
                  <Button type="button" onClick={() => void saveOrg()} disabled={saving}>
                    Save organization
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-editorial text-xl">Sites</CardTitle>
                  <CardDescription>Per-site override — PATCH /v1/admin/sites/:siteId</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sites.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No sites returned.</p>
                  ) : (
                    sites.map((site) => (
                      <SiteEmailRow
                        key={site.id}
                        site={site}
                        onSave={(email) => void saveSiteEmail(site.id, email)}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
    </main>
  );
}

function SiteEmailRow({ site, onSave }: { site: SiteAdmin; onSave: (email: string) => void }) {
  const [val, setVal] = useState(site.leadsNotificationEmail ?? "");
  useEffect(() => {
    setVal(site.leadsNotificationEmail ?? "");
  }, [site.leadsNotificationEmail]);

  return (
    <div className="rounded-lg border border-border/80 p-4 space-y-2">
      <p className="text-sm font-medium">{site.label ?? site.id}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 space-y-1">
          <Label className="text-xs text-muted-foreground">leadsNotificationEmail</Label>
          <Input type="email" value={val} onChange={(e) => setVal(e.target.value)} placeholder="optional" />
        </div>
        <Button type="button" variant="secondary" onClick={() => onSave(val)}>
          Save
        </Button>
      </div>
    </div>
  );
}
