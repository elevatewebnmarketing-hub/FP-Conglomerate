/** Public marketing site URL for “View website” / login back link (admin env). */
export function getPublicMarketingSiteUrl(): string {
  return import.meta.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "http://localhost:8080";
}
