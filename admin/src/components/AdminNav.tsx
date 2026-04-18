import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links: { to: string; label: string }[] = [
  { to: "/login", label: "Staff login" },
  { to: "/leads", label: "Leads" },
  { to: "/settings", label: "Settings" },
  { to: "/cms/blog", label: "CMS — Blog" },
  { to: "/cms/hiring", label: "CMS — Hiring" },
  { to: "/cms/portfolio", label: "CMS — Portfolio" },
  { to: "/content", label: "Content (local)" },
];

export default function AdminNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75"
      aria-label="Admin"
    >
      <div className="section-shell flex flex-wrap gap-2 py-3 text-sm">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "rounded-md px-3 py-1.5 transition-colors",
              pathname === to || (to !== "/" && pathname.startsWith(`${to}/`))
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
