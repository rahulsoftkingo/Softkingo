# Softkingo Website (Next.js + Prisma + Admin CMS)

A full-stack Next.js (App Router) website for Softkingo with:
- Public site (marketing pages, blog/insights)
- Admin panel for content management
- Prisma + MySQL database
- NextAuth (Credentials) authentication
- Dynamic sitemap + robots.txt

---

## Tech Stack
- **Next.js** (App Router)
- Prisma ORM + MySQL
- NextAuth (Credentials Provider)
- Tailwind CSS

---

## Requirements
- Node.js 18+ (recommended)
- MySQL database (local or hosted)

---

## Environment Variables

Create a `.env` file in the project root:

Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

Auth (NextAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_LONG_RANDOM_SECRET"

text

### Generate a secret
Example:
openssl rand -base64 32

text

> In production, set `NEXTAUTH_URL` to your live domain (e.g. `https://www.softkingo.com`). [web:369]

---

## Install & Run

npm install
npm run dev

text

Open:
- http://localhost:3000

---

## Prisma (DB Setup)

### 1) Generate Prisma Client
npx prisma generate

text

### 2) Run migrations (recommended for local/dev)
npx prisma migrate dev

text

### 3) Prisma Studio (optional)
npx prisma studio

text

---

## Authentication (Admin Login)

- Admin login page: `/login`
- Admin panel: `/admin`

This project uses **NextAuth Credentials**:
- Username + password
- Passwords stored as `passwordHash` (bcrypt)
- Roles stored via `UserRole` → `Role`

If a user is not logged in, `/admin/*` routes should redirect to `/login?callbackUrl=/admin`.

---

## Content System Overview

### Blog / Insights
Stored in `BlogPost` model:
- `type`: blog | featured | press-release | media | article | whitepaper | podcast (etc.)
- `status`: draft | scheduled | published | archived
- `publishedAt`: used for public visibility + sitemap

### E‑Guides
Stored in `EGuide` model:
- Separate public pages: `/e-guides` and `/e-guides/[slug]`
- Separate admin management (if enabled)

### Pages (Services/Hire/Solutions)
Stored in `Page` model:
- `type`: service | hire | solution | etc.
- `status`: draft | published

---

## SEO

### Sitemap
- URL: `/sitemap.xml`
- Generated from:
  - Public static routes
  - Blog posts (published)
  - Blog categories
  - Case studies
  - E‑Guides (published)
  - Published pages (service/hire/solution etc.)

### Robots.txt
- URL: `/robots.txt`
- Blocks private routes like `/admin`, `/login`, `/api`

---

## Project Structure (high level)

src/
app/
(public)/
(admin)/
api/
sitemap.js
robots.txt/route.js
lib/
prisma.js
prisma/
schema.prisma

text

---

## Deployment Notes

- Set production env variables on the server:
  - `DATABASE_URL`
  - `NEXTAUTH_URL` (https://your-domain.com)
  - `NEXTAUTH_SECRET`
- Ensure database is reachable from the deployment environment.
- Run migrations in CI/CD or manually on production.

---

## Troubleshooting

### 401 on `/api/admin/*`
Usually happens when:
- User is not logged in (no session cookie)
- Admin routes are not protected with a server-side redirect

Fix:
- Add `getServerSession(authOptions)` guard in admin layout and redirect to `/login`.

### Hydration errors (head/body/html nesting)
In App Router:
- Only root `app/layout.js` should render `<html>` and `<body>`
- Nested layouts must NOT render `<head>`, `<html>`, or `<body>`

Use Next.js Metadata API instead.

---

## License
Private / Internal project for Softkingo.