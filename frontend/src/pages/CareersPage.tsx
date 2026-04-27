import { Seo } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/content/SiteContentContext";
import MediaAsset from "@/components/MediaAsset";
import type { HiringPositionPublic } from "@/lib/elevateApiTypes";
import { useElevateHiringPositions } from "@/hooks/elevateQueries";
import { isPublicCmsEnabled } from "@/lib/elevateApi";

/**
 * Careers content policy:
 * - API-driven listings are opt-in via `VITE_ENABLE_HIRING_CMS=true`.
 * - Default: no public listings; static roles in site content are empty until you add them intentionally.
 */
export default function CareersPage() {
  const { content } = useSiteContent();
  const orgCms = isPublicCmsEnabled();
  const { data: apiRoles, isLoading } = useElevateHiringPositions();

  const useApi = orgCms && !isLoading && apiRoles && apiRoles.length > 0;
  const staticRoles = content.hiring.roles;
  const hasAnyRoles = useApi || staticRoles.length > 0;

  return (
    <>
      <Seo
        title="Careers"
        path="/careers"
        description="Careers at FP Conglomerate. We are not listing open roles on this website right now; use the official contact email for general inquiries only."
        keywords="FP Conglomerate careers, Abuja jobs, Nigeria employment FP Conglomerate"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-32 pb-28">
        <section className="section-shell">
          <p className="eyebrow mb-5">Careers</p>
          <h1 className="font-editorial text-5xl md:text-7xl max-w-4xl">{content.hiring.heading}</h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl">{content.hiring.summary}</p>
          {orgCms && isLoading && (
            <p className="mt-4 text-sm text-muted-foreground">Loading open roles…</p>
          )}
          {content.hiring.heroImage ? (
            <MediaAsset
              src={content.hiring.heroImage}
              alt="Careers"
              className="w-full h-[240px] md:h-[380px] object-cover mt-10 border border-border dark:brightness-75"
            />
          ) : null}
        </section>

        <section className="section-shell py-20 md:py-24">
          {!hasAnyRoles ? (
            <div className="max-w-2xl border border-border bg-muted/20 rounded-lg p-8 md:p-10">
              <h2 className="font-editorial text-2xl text-foreground mb-3">No open listings</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are not advertising vacancies on this page at the moment. Please do not submit CVs or sensitive
                documents unless we request them through an official process. For general questions only, you may use{" "}
                <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${content.brand.contactEmail}`}>
                  {content.brand.contactEmail}
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {useApi
                ? apiRoles!.map((role: HiringPositionPublic, index: number) => {
                    const raw = role as Record<string, unknown>;
                    const applyUrl =
                      typeof raw.application_url === "string" ? raw.application_url : role.applicationUrl;
                    return (
                      <article
                        key={role.id ?? `${role.title}-${index}`}
                        className={`border border-border p-7 md:p-8 ${
                          index % 2 === 0 ? "lg:col-span-5 bg-secondary/25" : "lg:col-span-6 lg:col-start-7"
                        }`}
                      >
                        <h2 className="font-editorial text-3xl">{role.title}</h2>
                        <p className="text-sm text-muted-foreground mt-3">{role.location ?? "—"}</p>
                        {role.description ? (
                          <p className="text-sm text-muted-foreground mt-6 whitespace-pre-wrap">{role.description}</p>
                        ) : null}
                        {applyUrl ? (
                          <p className="mt-6">
                            <a
                              href={applyUrl}
                              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Apply for this role
                            </a>
                          </p>
                        ) : null}
                        <p className="text-sm text-muted-foreground mt-6">
                          {applyUrl
                            ? `For questions, contact ${content.brand.contactEmail}.`
                            : `To apply, send your CV and a short statement of fit to ${content.brand.contactEmail}.`}
                        </p>
                        {role.imageUrl ? (
                          <MediaAsset
                            src={role.imageUrl}
                            alt={role.title}
                            className="w-full h-40 object-cover border border-border mt-6 dark:brightness-75"
                          />
                        ) : null}
                      </article>
                    );
                  })
                : staticRoles.map((role, index) => (
                    <article
                      key={`${role.title}-${index}`}
                      className={`border border-border p-7 md:p-8 ${
                        index % 2 === 0 ? "lg:col-span-5 bg-secondary/25" : "lg:col-span-6 lg:col-start-7"
                      }`}
                    >
                      <h2 className="font-editorial text-3xl">{role.title}</h2>
                      <p className="text-sm text-muted-foreground mt-3">
                        {role.location} · {role.type}
                      </p>
                      {role.salaryRange ? (
                        <p className="text-sm font-medium text-foreground mt-3">
                          Salary: {role.salaryRange}
                        </p>
                      ) : null}
                      {role.description ? (
                        <p className="text-sm text-muted-foreground mt-5 leading-relaxed whitespace-pre-wrap">
                          {role.description}
                        </p>
                      ) : null}
                      <p className="text-sm text-muted-foreground mt-6 border-t border-border pt-5">
                        To apply, send your CV and a short statement of fit to{" "}
                        <a
                          href={`mailto:${content.brand.contactEmail}`}
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {content.brand.contactEmail}
                        </a>
                        .
                      </p>
                    </article>
                  ))}
            </div>
          )}
          {(content.pageImages?.careers ?? []).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {(content.pageImages?.careers ?? []).map((image, index) => (
                <MediaAsset
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Careers visual ${index + 1}`}
                  className="w-full h-56 md:h-72 object-cover border border-border dark:brightness-75"
                />
              ))}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
