import { Link, useParams } from "react-router-dom";
import { Seo, SEO_DEFAULT_DESCRIPTION, SITE_NAME } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaAsset from "@/components/MediaAsset";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/content/SiteContentContext";
import type { BlogPost } from "@/content/brand";
import { breadcrumbListJsonLd } from "@/lib/breadcrumbJsonLd";

function truncateMeta(s: string, max = 160): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function postDescription(post: BlogPost): string {
  if (post.metaDescription?.trim()) return truncateMeta(post.metaDescription);
  if (post.excerpt?.trim()) return truncateMeta(post.excerpt);
  if (post.body?.trim()) return truncateMeta(post.body);
  return SEO_DEFAULT_DESCRIPTION;
}

function absoluteSiteUrl(pathOrUrl: string): string | undefined {
  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!base) return undefined;
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${p}`;
}

function blogPostingJsonLd(post: BlogPost, path: string): Record<string, unknown> {
  const canonical = absoluteSiteUrl(path);
  const cover = post.image?.trim();
  const imageUrl = cover ? absoluteSiteUrl(cover) ?? cover : undefined;
  const logoUrl = absoluteSiteUrl("/logos/bsc-logo.png");
  const datePublished = post.dateIso?.trim() || post.date?.trim();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(datePublished ? { datePublished } : {}),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      ...(logoUrl ? { logo: { "@type": "ImageObject", url: logoUrl } } : {}),
    },
    ...(canonical ? { mainEntityOfPage: { "@type": "WebPage", "@id": canonical } } : {}),
  };
}

export default function BlogPostPage() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const { content } = useSiteContent();
  const post = content.blogPosts.find((p) => p.slug === postSlug);
  const path = postSlug ? `/blog/${postSlug}` : "/blog";

  if (!postSlug) {
    return (
      <>
        <Seo title="Blog" path="/blog" description={SEO_DEFAULT_DESCRIPTION} noindex />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="section-shell pt-32 pb-24">
          <p className="text-muted-foreground">Invalid URL.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Seo
          title="Blog post"
          path={path}
          description="This article is not available. Return to the blog index."
          noindex
        />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="section-shell pt-32 pb-24">
          <p className="text-muted-foreground mb-4">This article could not be found.</p>
          <Button asChild variant="outline">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const description = postDescription(post);
  const img = post.image ?? "";
  const postPath = `/blog/${post.slug}`;
  const ogImage = img ? absoluteSiteUrl(img) ?? img : undefined;
  const crumbs = breadcrumbListJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: postPath },
  ]);
  const postLd = blogPostingJsonLd(post, postPath);
  const structuredData = crumbs ? [crumbs, postLd] : postLd;

  return (
    <>
      <Seo
        title={post.title}
        path={postPath}
        description={description}
        keywords={post.keywords}
        ogImage={ogImage}
        ogType="article"
        jsonLd={structuredData}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-32 pb-32 section-shell">
        <p className="eyebrow mb-4">
          <Link to="/blog" className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
        </p>
        {img ? (
          <MediaAsset
            src={img}
            alt={post.title}
            className="w-full h-[240px] md:h-[420px] object-cover border border-border mb-10 dark:brightness-75"
            priority
          />
        ) : null}
        {post.date ? (
          <p className="text-xs text-muted-foreground tracking-wide mb-4">{post.date}</p>
        ) : null}
        <h1 className="font-editorial text-4xl md:text-6xl text-foreground mb-8 max-w-4xl leading-tight">{post.title}</h1>
        {post.excerpt ? <p className="text-lg text-muted-foreground max-w-3xl mb-10">{post.excerpt}</p> : null}
        {post.body ? (
          <div className="prose prose-neutral dark:prose-invert max-w-3xl whitespace-pre-wrap text-foreground leading-relaxed">
            {post.body}
          </div>
        ) : (
          <p className="text-muted-foreground max-w-3xl">No body content.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
