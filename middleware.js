import { withAuth } from 'next-auth/middleware';

const roleRoutes = {
  admin: ['/admin'], // admin can access everything under /admin
  manager: [
    '/admin/dashboard',
    '/admin/blog', '/admin/categories', '/admin/ebooks', '/admin/blog-analytics',
    '/admin/case-studies', '/admin/portfolio',
    '/admin/services', '/admin/hire', '/admin/solutions',
    '/admin/chat', '/admin/whatsapp', '/admin/newsletters', '/admin/email-campaigns', '/admin/ai-assistance',
    '/admin/leads', '/admin/tickets', '/admin/daily-reports', '/admin/career',
    '/admin/team', '/admin/media', '/admin/events',
    '/admin/profile',
  ],
  writer: [
    '/admin/blog', '/admin/categories', '/admin/ebooks',
    '/admin/case-studies', '/admin/portfolio',
    '/admin/services', '/admin/hire', '/admin/solutions',
    '/admin/media',
    '/admin/profile',
  ],
  agent: [
    '/admin/dashboard',
    '/admin/chat', '/admin/whatsapp',
    '/admin/leads', '/admin/tickets', '/admin/daily-reports',
    '/admin/profile',
  ],
  hr: [
    '/admin/dashboard',
    '/admin/users', '/admin/team', '/admin/career',
    '/admin/profile',
  ],
  employee: [
    '/admin/profile',
  ],
};

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Not logged in -> NextAuth redirects to /login
        if (!token) return false;

        const roles = token.roles || [];
        if (!roles.length) return false;

        // Admin has full access
        if (roles.includes('admin')) return true;

        // Redirect base /admin to dashboard if they have any admin role
        if (pathname === '/admin' || pathname === '/admin/') return true;

        // Role-based access check
        const allowed = roles.some((role) => {
          const prefixes = roleRoutes[role];
          if (!prefixes) return false;
          return prefixes.some((p) => pathname.startsWith(p));
        });

        return allowed;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
