import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";

export default function HiringSection() {
  const { content } = useSiteContent();

  const featuredRole =
    content.hiring.roles.find((r) => r.image) ?? content.hiring.roles[0];

  return (
    <section className="section-space section-shell">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 border border-border bg-secondary/30 p-8 md:p-10">
          <p className="eyebrow mb-4">Hiring</p>
          <h2 className="font-editorial text-4xl md:text-5xl mb-5">
            {content.hiring.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {content.hiring.summary}
          </p>
          <MediaAsset
            src={content.hiring.heroImage || content.galleryItems[0]?.src}
            alt="Hiring"
            className="w-full h-44 object-cover border border-border mb-8 dark:brightness-75"
          />
          <Link to="/careers" className="text-sm text-accent">
            View open roles →
          </Link>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col">
          {featuredRole && (
            <article className="border border-border p-6 md:p-8 lg:flex-1 lg:flex lg:flex-col lg:justify-between">
              <div>
                <p className="eyebrow mb-3">Featured opening</p>
                <h3 className="font-editorial text-2xl md:text-3xl">
                  {featuredRole.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {featuredRole.location} · {featuredRole.type}
                </p>
                {featuredRole.salaryRange && (
                  <p className="text-sm font-medium text-foreground mt-3">
                    {featuredRole.salaryRange}
                  </p>
                )}
                {featuredRole.description && (
                  <p className="text-sm text-muted-foreground mt-5 leading-relaxed line-clamp-3">
                    {featuredRole.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-5 border-t border-border pt-5">
                  To apply, send your CV and a short statement of interest to{" "}
                  <a
                    href={`mailto:${content.brand.contactEmail}`}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {content.brand.contactEmail}
                  </a>
                  .
                </p>
              </div>
              <div className="mt-8">
                <Link to="/careers" className="text-sm text-accent">
                  See all open roles →
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
