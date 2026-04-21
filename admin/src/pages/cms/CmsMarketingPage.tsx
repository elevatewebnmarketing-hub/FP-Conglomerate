import CmsBlogPage from "./CmsBlogPage.tsx";

export default function CmsMarketingPage() {
  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="eyebrow mb-1">CMS</p>
          <h2 className="font-editorial text-3xl text-foreground">Marketing content</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Optional API drafts for blog posts. Public SEO articles, images, and portfolio highlights are versioned in{" "}
            <code className="text-xs bg-muted px-1 rounded">frontend/src/content/brand.ts</code>. Hiring listings are
            disabled on the public site by default.
          </p>
        </div>
        <CmsBlogPage embedded />
      </div>
    </main>
  );
}
