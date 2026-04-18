import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicApiBaseUrl, getStaffToken, staffFetch } from "@/lib/elevateApi";
import { toast } from "sonner";

type UnknownRecord = Record<string, unknown>;

function normalizeLeadsPayload(data: unknown): UnknownRecord[] {
  if (Array.isArray(data)) return data as UnknownRecord[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const list = o.items ?? o.leads ?? o.data;
    if (Array.isArray(list)) return list as UnknownRecord[];
  }
  return [];
}

export default function LeadsPage() {
  const [rows, setRows] = useState<UnknownRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = getStaffToken();
  const apiConfigured = Boolean(getPublicApiBaseUrl());

  const load = useCallback(async () => {
    if (!token || !apiConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await staffFetch("/v1/leads?limit=50");
      if (res.status === 401) return;
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      const data = (await res.json()) as unknown;
      setRows(normalizeLeadsPayload(data));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load leads";
      setError(msg);
      toast.error("Could not load leads", { description: msg });
    } finally {
      setLoading(false);
    }
  }, [token, apiConfigured]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!apiConfigured) {
    return (
      <main className="p-4 sm:p-6">
        <p className="text-destructive text-sm">
          Set <code className="text-xs">VITE_PUBLIC_API_BASE_URL</code> in admin environment.
        </p>
      </main>
    );
  }

  const columns =
    rows && rows.length > 0
      ? Array.from(
          rows.reduce((acc, row) => {
            Object.keys(row).forEach((k) => acc.add(k));
            return acc;
          }, new Set<string>()),
        )
      : ["id", "email", "fullName", "createdAt"];

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-1">Elevate</p>
            <h2 className="font-editorial text-3xl text-foreground">Leads</h2>
            <p className="text-sm text-muted-foreground mt-1">
              <code className="text-xs">GET /v1/leads</code> with staff JWT.{" "}
              <Link to="/content" className="text-accent underline-offset-4 hover:underline">
                Content editor
              </Link>{" "}
              stays local-only.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
              Refresh
            </Button>
          </div>
        </div>

        <Card className="border-border/80 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="font-editorial text-xl">Recent leads</CardTitle>
            <CardDescription>
              {loading ? "Loading…" : error ? error : `${rows?.length ?? 0} row(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-0">
            {!loading && rows && rows.length === 0 && (
              <p className="px-6 py-8 text-sm text-muted-foreground">No leads returned yet.</p>
            )}
            {!loading && rows && rows.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((c) => (
                        <TableHead key={c} className="whitespace-nowrap font-mono text-xs">
                          {c}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={String(row.id ?? i)}>
                        {columns.map((c) => (
                          <TableCell key={c} className="max-w-[min(28rem,40vw)] truncate font-mono text-xs">
                            {formatCell(row[c])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}
