import { Link } from "react-router-dom";
import { Seo, SITE_NAME } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import type { BlogPost } from "@/content/brand";

const BLOG_INDEX_DESCRIPTION =
  "Official FP Conglomerate blog: Abuja multi-sector group updates spanning governance, humanitarian programs (MIA), commercial development (Gwarinpa Mall), AGE services, and ministry (OBA).";

function absoluteUrl(path: string): string | undefined {
  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (!base) return undefined;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function blogIndexJsonLd(posts: BlogPost[]): Record<string, unknown> {
  const blogUrl = absoluteUrl("/blog");
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description: BLOG_INDEX_DESCRIPTION,
    ...(blogUrl ? { url: blogUrl } : {}),
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: absoluteUrl(`/blog/${encodeURIComponent(p.slug)}`),
      image: p.image?.startsWith("http") ? p.image : absoluteUrl(p.image),
    })),
  };
}

export default function BlogPage() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { content } = useSiteContent();
  const staticPosts = content.blogPosts.filter((p) => p.slug?.trim());
  const featured = staticPosts[0];
  const rest = staticPosts.slice(1);

  const featuredImage = featured?.image;
  const featuredTitle = featured?.title ?? "";
  const featuredExcerpt = featured?.excerpt ?? "";
  const featuredDate = featured?.date ?? "";
  const featuredSlug = featured?.slug;

  return (
    <>
      <Seo
        title="Blog"
        path="/blog"
        description={BLOG_INDEX_DESCRIPTION}
        keywords="FP Conglomerate blog, Abuja business news, Nigeria humanitarian updates, Gwarinpa Mall, MIA programs"
        jsonLd={blogIndexJsonLd(staticPosts)}
      />
      <Navbar />
      <main className="pt-32 pb-32 section-shell" ref={ref}>
        <div
          className={`mb-20 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-5">Blog and News</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-foreground max-w-4xl">
            Insights and field updates from across the FP group.
          </h1>
          <p className="mt-6 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Articles are published here first. For partnerships or corrections, use the official contact page only—do
            not rely on third-party copies of this content.
          </p>
        </div>

        {featured ? (
          <article
            className={`border border-border bg-secondary/30 p-8 md:p-12 lg:p-14 mb-14 md:mb-16 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {featuredImage ? (
              <MediaAsset
                src={featuredImage}
                alt={featuredTitle}
                className="w-full h-[240px] md:h-[360px] object-cover border border-border mb-8 dark:brightness-75"
                priority
              />
            ) : null}
            <p className="text-xs text-muted-foreground tracking-wide mb-4">{featuredDate}</p>
            <h2 className="font-editorial text-3xl md:text-5xl text-foreground mb-6 leading-tight max-w-4xl">{featuredTitle}</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">{featuredExcerpt}</p>
            {featuredSlug ? (
              <Link
                to={`/blog/${encodeURIComponent(featuredSlug)}`}
                className="text-sm text-accent font-medium hover:underline"
              >
                Read more →
              </Link>
            ) : (
              <span className="text-sm text-accent font-medium">Read more →</span>
            )}
          </article>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 gap-x-8">
          {rest.map((post, i) => {
            const slug = post.slug;
            return (
              <article
                key={post.slug}
                className={`py-9 border-b border-border group transition-all duration-500 lg:col-span-10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground tracking-wide mb-2">{post.date}</p>
                    {slug ? (
                      <Link to={`/blog/${encodeURIComponent(slug)}`}>
                        <h3 className="text-2xl font-editorial text-foreground group-hover:text-accent transition-colors duration-300">
                          {post.title}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-2xl font-editorial text-foreground group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">{post.excerpt}</p>
                  </div>
                  {post.image ? (
                    <MediaAsset
                      src={post.image}
                      alt={post.title}
                      className="w-full md:w-40 h-28 object-cover border border-border dark:brightness-75"
                    />
                  ) : null}
                  {slug ? (
                    <Link
                      to={`/blog/${encodeURIComponent(slug)}`}
                      className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                    >
                      Read →
                    </Link>
                  ) : (
                    <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                      Read →
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
