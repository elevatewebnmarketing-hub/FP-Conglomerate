import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

const PORTFOLIO_DESCRIPTION =
  "Selected programs and projects across FP Conglomerate units: commercial development, humanitarian field work, integrated services, and group governance.";

export default function PortfolioPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();
  const projects = content.portfolioProjects ?? [];

  return (
    <>
      <Seo
        title="Portfolio"
        path="/portfolio"
        description={PORTFOLIO_DESCRIPTION}
        keywords="FP Conglomerate portfolio, Abuja commercial development, Nigeria humanitarian projects, Gwarinpa Mall, MIA programs"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "FP Conglomerate portfolio highlights",
          numberOfItems: projects.length,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            description: p.summary,
          })),
        }}
      />
      <Navbar />
      <main className="pt-32 pb-32 section-shell" ref={ref}>
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-5">Portfolio</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-foreground max-w-4xl">Selected work and programs</h1>
          <p className="mt-6 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Highlights are maintained in the website codebase for consistency and SEO. For the latest contractual or
            technical details, contact us through official channels only.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">No portfolio items are configured.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((p) => (
              <article
                key={p.id}
                className={`border border-border bg-card/40 overflow-hidden rounded-lg transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {p.image ? (
                  <MediaAsset
                    src={p.image}
                    alt={p.title}
                    className="w-full h-52 object-cover border-b border-border dark:brightness-75"
                  />
                ) : null}
                <div className="p-6 md:p-8">
                  <h2 className="font-editorial text-2xl md:text-3xl text-foreground">{p.title}</h2>
                  {p.summary ? <p className="mt-3 text-muted-foreground leading-relaxed">{p.summary}</p> : null}
                  {p.body ? (
                    <p className="mt-4 text-sm text-muted-foreground whitespace-pre-wrap line-clamp-6">{p.body}</p>
                  ) : null}
                  <Link to="/contact" className="inline-block mt-6 text-sm text-accent font-medium hover:underline">
                    Discuss this project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
