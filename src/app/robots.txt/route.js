// src/app/robots.txt/route.js
// Serves /robots.txt

export async function GET() {
  const rawSiteUrl = process.env.NEXTAUTH_URL || "https://www.softkingo.com";
  const siteUrl = String(rawSiteUrl).replace(/\/$/, "");

  const content = `User-agent: *
Allow: /

# Block private areas
Disallow: /login/
Disallow: /admin/
Disallow: /api/

# Optional (keep if these paths exist)
Disallow: /phpmyadmin/
Disallow: /cgi-bin/
Disallow: /scripts/
Disallow: /private/
Disallow: /temp/

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
