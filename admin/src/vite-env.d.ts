/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public marketing site URL (no trailing slash), e.g. https://www.example.com */
  readonly VITE_PUBLIC_SITE_URL?: string;
  /** Elevate API base URL (no trailing slash) */
  readonly VITE_PUBLIC_API_BASE_URL?: string;
  /** Default organization slug on staff login */
  readonly VITE_PUBLIC_ORGANIZATION_SLUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
