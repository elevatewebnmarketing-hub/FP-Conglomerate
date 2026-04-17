/** Elevate Central API — HTTP helpers (base URL + auth). No backend in this repo. */

const STAFF_TOKEN_KEY = "elevate_v1_access_token";

export function getPublicApiBaseUrl(): string {
  const raw = import.meta.env.VITE_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return "";
  return raw.replace(/\/$/, "");
}

export function isElevateConfigured(): boolean {
  return Boolean(getPublicApiBaseUrl() && import.meta.env.VITE_PUBLIC_SITE_KEY?.trim());
}

export function apiUrl(path: string): string {
  const base = getPublicApiBaseUrl();
  if (!base) throw new Error("VITE_PUBLIC_API_BASE_URL is not set");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Public marketing / lead capture — requires site key (never JWT). */
export async function publicFetch(path: string, init?: RequestInit): Promise<Response> {
  const siteKey = import.meta.env.VITE_PUBLIC_SITE_KEY?.trim();
  if (!getPublicApiBaseUrl() || !siteKey) {
    throw new Error("Missing VITE_PUBLIC_API_BASE_URL or VITE_PUBLIC_SITE_KEY");
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
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
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

/** POST /v1/public/leads — body must match OpenAPI (industryVertical, sourceSystem, formId, email, fullName, message, …). */
export async function submitPublicLead(body: Record<string, unknown>): Promise<void> {
  const res = await publicFetch("/v1/public/leads", {
    method: "POST",
    body: JSON.stringify(body),
  });
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
  const res = await fetch(apiUrl("/v1/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
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
