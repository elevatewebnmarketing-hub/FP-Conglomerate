# FP Conglomerate — marketing + admin

Monorepo: **Vite + React** marketing site in [`frontend/`](frontend/), staff + local content tools in [`admin/`](admin/). Lead capture and org staff features use the **Elevate Central API** over HTTPS (no app database or JWT secrets in this repo).

## Development

```bash
npm install --prefix frontend
npm install --prefix admin
```

Copy [`.env.example`](.env.example) to `frontend/.env` and `admin/.env` and set `VITE_*` values for each app.

```bash
npm run dev              # marketing site (default http://localhost:8080)
npm run dev --prefix admin   # admin (default http://localhost:5174)
```

## Build

```bash
npm run build            # marketing `frontend/dist`
npm run build:admin      # admin `admin/dist`
npm run build:all        # both
```

Production bundles read **`VITE_PUBLIC_API_BASE_URL`** (and other `VITE_*` vars) at **build time**. Set them in your host’s environment (e.g. Vercel/Netlify) before building.

## Elevate API environment

| Variable | App | Purpose |
|----------|-----|---------|
| `VITE_PUBLIC_API_BASE_URL` | frontend, admin | API origin, no trailing slash (e.g. `https://api.example.com`) |
| `VITE_PUBLIC_SITE_KEY` | frontend | Publishable key → `X-Site-Key` on `POST /v1/public/leads` |
| `VITE_PUBLIC_LEAD_INDUSTRY_VERTICAL` etc. | frontend | Lead metadata; must match API / OpenAPI |
| `VITE_PUBLIC_ORGANIZATION_SLUG` | admin | Optional default on staff login |
| `VITE_PUBLIC_SITE_URL` | admin | “Back to site” fallback URL |
| `VITE_SITE_URL` | frontend | Canonical URL for SEO (optional) |

**Secrets** (database, JWT signing, peppers, Cloudinary secrets, etc.) live **only on the Elevate API host**. This repo should only store publishable keys and end-user passwords in the browser where appropriate.

## CORS and origins

The Elevate API must allow your apps’ **exact browser origins** (scheme + host + port), e.g. `https://www.example.com` and `https://admin.example.com`, in its `CORS_ORIGINS` setting. If the API uses per-site `allowed_origins` for public lead posts, those must include the marketing origin as well. **This is configured on the API**, not something you fix only inside this frontend repo.

## Major flows (Elevate)

| UI | HTTP | Auth |
|----|------|------|
| Contact form | `POST /v1/public/leads` | `X-Site-Key: <publishable site key>` |
| Staff login | `POST /v1/auth/login` | Body: `email`, `password`, `organizationSlug` |
| Leads list | `GET /v1/leads` | `Authorization: Bearer <access_token>` |

The **content dashboard** at `/content` in the admin app still saves to **browser localStorage** only; it does not call the Elevate API.

OpenAPI: `GET {BASE}/v1/openapi.json` — align request bodies with the live contract.
