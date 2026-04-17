/** Elevate Central API — HTTP helpers (base URL + auth). No backend in this repo. */

const STAFF_TOKEN_KEY = "elevate_v1_access_token";

/** When true, API calls use same-origin paths like `/v1/...` (use with Vercel rewrite to your Render API — avoids browser CORS). */
export function useRelativeApiBase(): boolean {
  const v = import.meta.env.VITE_PUBLIC_API_RELATIVE?.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

export function getPublicApiBaseUrl(): string {
  if (useRelativeApiBase()) return "";
  const raw = import.meta.env.VITE_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return "";
  return raw.replace(/\/$/, "");
}

export function isElevateConfigured(): boolean {
  const key = import.meta.env.VITE_PUBLIC_SITE_KEY?.trim();
  if (!key) return false;
  return useRelativeApiBase() || Boolean(getPublicApiBaseUrl());
}

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (useRelativeApiBase()) return p;
  const base = getPublicApiBaseUrl();
  if (!base) {
    throw new Error(
      "Set VITE_PUBLIC_API_BASE_URL, or VITE_PUBLIC_API_RELATIVE=true with a same-origin /v1 proxy (see frontend/vercel.json).",
    );
  }
  return `${base}${p}`;
}

/** Public marketing / lead capture — requires site key (never JWT). */
export async function publicFetch(path: string, init?: RequestInit): Promise<Response> {
  const siteKey = import.meta.env.VITE_PUBLIC_SITE_KEY?.trim();
  if (!siteKey || (!useRelativeApiBase() && !getPublicApiBaseUrl())) {
    throw new Error("Missing VITE_PUBLIC_SITE_KEY or API base (VITE_PUBLIC_API_BASE_URL or VITE_PUBLIC_API_RELATIVE).");
  }
  return fetch(apiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      "X-Site-Key": siteKey,
    },
  });
}

export function getStaffToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(STAFF_TOKEN_KEY);
}

export function setStaffToken(token: string): void {
  sessionStorage.setItem(STAFF_TOKEN_KEY, token);
}

export function clearStaffToken(): void {
  sessionStorage.removeItem(STAFF_TOKEN_KEY);
}

/** Org staff — Bearer JWT from POST /v1/auth/login. */
export async function staffFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getStaffToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  if (res.status === 401) {
    clearStaffToken();
    if (typeof window !== "undefined" && !window.location.pathname.endsWith("/login")) {
      window.location.assign("/login");
    }
  }
  return res;
}

export type StaffLoginBody = {
  email: string;
  password: string;
  organizationSlug: string;
};

export type StaffLoginResponse = {
  access_token: string;
};

/** User-facing hint when fetch() fails with no response (CORS, DNS, TLS, mixed content, etc.). */
export function describeFetchFailure(cause: unknown): string {
  const raw = cause instanceof Error ? cause.message : String(cause);
  const isNetwork =
    raw === "Failed to fetch" ||
    /networkerror|load failed|fetch.*abort/i.test(raw) ||
    (cause instanceof TypeError && /fetch/i.test(raw));
  if (!isNetwork) return raw;

  const pageHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const baseStr = getPublicApiBaseUrl();
  const apiHttp = baseStr.startsWith("http://");

  const parts = [
    "No response from the API.",
    useRelativeApiBase()
      ? "Same-origin /v1 proxy failed — confirm Vercel rewrites /v1 to your Render service and redeploy."
      : pageHttps && apiHttp
        ? "This page is HTTPS but the API URL is HTTP (mixed content is blocked). Use an https:// API URL."
        : "Check the API is running, VITE_PUBLIC_API_BASE_URL is correct, and CORS_ORIGINS on the API includes this origin.",
    useRelativeApiBase()
      ? "Mode: VITE_PUBLIC_API_RELATIVE=true (paths under /v1 on this host)."
      : `Current API base: ${baseStr || "(empty)"}.`,
  ].filter(Boolean) as string[];
  return parts.join(" ");
}

/** POST /v1/public/leads — body must match OpenAPI (industryVertical, sourceSystem, formId, email, fullName, message, …). */
export async function submitPublicLead(body: Record<string, unknown>): Promise<void> {
  let res: Response;
  try {
    res = await publicFetch("/v1/public/leads", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  if (res.ok) return;
  let detail = res.statusText || "Request failed";
  try {
    const err = (await res.json()) as { message?: string; error?: string };
    if (typeof err.message === "string") detail = err.message;
    else if (typeof err.error === "string") detail = err.error;
  } catch {
    /* ignore */
  }
  throw new Error(detail);
}

export async function postStaffLogin(body: StaffLoginBody): Promise<StaffLoginResponse> {
  let res: Response;
  try {
    res = await fetch(apiUrl("/v1/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error(describeFetchFailure(e));
  }
  const data = (await res.json().catch(() => ({}))) as StaffLoginResponse & { message?: string; error?: string };
  if (!res.ok) {
    const msg = typeof data.message === "string" ? data.message : res.statusText || "Login failed";
    throw new Error(msg);
  }
  if (!data.access_token) {
    throw new Error("Invalid login response");
  }
  return { access_token: data.access_token };
}
