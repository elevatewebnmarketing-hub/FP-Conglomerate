/** BreadcrumbList JSON-LD for nested pages (Google + structured parsers). */
export function breadcrumbListJsonLd(
  crumbs: { name: string; path: string }[],
): Record<string, unknown> | undefined {
  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (!base || crumbs.length === 0) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => {
      const p = c.path.startsWith("/") ? c.path : `/${c.path}`;
      const loc = p === "/" ? `${base}/` : `${base}${p}`;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: loc,
      };
    }),
  };
}
