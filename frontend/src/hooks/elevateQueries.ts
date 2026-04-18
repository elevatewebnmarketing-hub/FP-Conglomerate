import { useQuery } from "@tanstack/react-query";
import {
  getMarketingOrganizationSlug,
  isPublicCmsEnabled,
  normalizeItems,
  publicOrgJson,
} from "@/lib/elevateApi";
import type { BlogPostPublic, HiringPositionPublic, PortfolioProjectPublic } from "@/lib/elevateApiTypes";

export function useElevateBlogPosts(limit = 24) {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "blog-posts", slug, limit],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/blog-posts?limit=${limit}&offset=0`,
      );
      return normalizeItems<BlogPostPublic>(data);
    },
  });
}

export function useElevateBlogPost(postSlug: string | undefined) {
  const org = getMarketingOrganizationSlug();
  const enabled = Boolean(org && postSlug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "blog-post", org, postSlug],
    enabled: enabled && Boolean(postSlug),
    queryFn: async () => {
      return publicOrgJson<BlogPostPublic>(
        `/v1/public/org/${encodeURIComponent(org!)}/blog-posts/${encodeURIComponent(postSlug!)}`,
      );
    },
  });
}

export function useElevateHiringPositions() {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "hiring-positions", slug],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/hiring-positions`,
      );
      return normalizeItems<HiringPositionPublic>(data);
    },
  });
}

export function useElevatePortfolioProjects() {
  const slug = getMarketingOrganizationSlug();
  const enabled = Boolean(slug) && isPublicCmsEnabled();
  return useQuery({
    queryKey: ["elevate", "portfolio-projects", slug],
    enabled,
    queryFn: async () => {
      const data = await publicOrgJson<unknown>(
        `/v1/public/org/${encodeURIComponent(slug!)}/portfolio-projects`,
      );
      return normalizeItems<PortfolioProjectPublic>(data);
    },
  });
}
