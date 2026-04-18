/** Minimal shapes for Elevate API JSON — align with GET /v1/openapi.json on your deployment. */

export type Paginated<T> = {
  items: T[];
  total?: number;
  limit?: number;
  offset?: number;
};

export type OrganizationAdmin = {
  id?: string;
  name?: string;
  slug?: string;
  leadsNotificationEmail?: string | null;
};

export type SiteAdmin = {
  id: string;
  organizationId?: string;
  label?: string;
  leadsNotificationEmail?: string | null;
  isActive?: boolean;
  allowedOrigins?: string[] | null;
};

export type BlogPostPublic = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  status?: string;
  publishedAt?: string | null;
  coverMediaAssetId?: string | null;
  coverUrl?: string | null;
  createdAt?: string;
};

export type HiringPositionPublic = {
  id?: string;
  title: string;
  location?: string | null;
  type?: string | null;
  description?: string | null;
  imageMediaAssetId?: string | null;
  imageUrl?: string | null;
};

export type PortfolioProjectPublic = {
  id?: string;
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  imageMediaAssetId?: string | null;
  imageUrl?: string | null;
};

export type BlogPostAdmin = BlogPostPublic & Record<string, unknown>;
export type HiringPositionAdmin = HiringPositionPublic & Record<string, unknown>;
export type PortfolioProjectAdmin = PortfolioProjectPublic & Record<string, unknown>;
