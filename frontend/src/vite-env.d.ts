/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full URL of the admin app for footer link, e.g. https://admin.example.com */
  readonly VITE_ADMIN_URL?: string;
  /** Elevate API base URL (no trailing slash), e.g. https://api.example.com */
  readonly VITE_PUBLIC_API_BASE_URL?: string;
  /**
   * When "true", use same-origin `/v1/...` URLs (requires Vercel rewrite to Render — avoids CORS on the marketing site).
   */
  readonly VITE_PUBLIC_API_RELATIVE?: string;
  /** Publishable site key for POST /v1/public/leads (X-Site-Key) */
  readonly VITE_PUBLIC_SITE_KEY?: string;
  readonly VITE_PUBLIC_LEAD_INDUSTRY_VERTICAL?: string;
  readonly VITE_PUBLIC_LEAD_SOURCE_SYSTEM?: string;
  readonly VITE_PUBLIC_LEAD_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
