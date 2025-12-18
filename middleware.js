// // middleware.js
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   if (!pathname.startsWith('/admin')) {
//     return NextResponse.next();
//   }

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const loginUrl = new URL('/login', req.url);
//   const unauthorizedUrl = new URL('/admin/unauthorized', req.url);

//   if (!token) {
//     loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   const roles = token.roles || [];
//   const allowed = ['admin', 'manager', 'writer', 'agent'];
//   const ok = roles.some((r) => allowed.includes(r));

//   if (!ok && !pathname.startsWith('/admin/unauthorized')) {
//     return NextResponse.redirect(unauthorizedUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };











// import { withAuth } from 'next-auth/middleware';

// const roleRoutes = {
//   admin: ['/admin'], // admin can see everything under /admin
//   manager: ['/admin', '/admin/leads', '/admin/tickets', '/admin/users'],
//   writer: ['/admin', '/admin/blog', '/admin/insights', '/admin/e-guides'],
//   agent: ['/admin', '/admin/tickets', '/admin/leads'],
// };

// export default withAuth(
//   function middleware() {
//     // You can customize responses here if needed (e.g. log access)
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const pathname = req.nextUrl.pathname;

//         // Not logged in -> redirect to /login
//         if (!token) return false;

//         const roles = token.roles || [];
//         if (!roles.length) return false;

//         // Admin can access any /admin route
//         if (roles.includes('admin')) return true;

//         // Other roles: check allowed prefixes
//         const allowed = roles.some((role) => {
//           const prefixes = roleRoutes[role];
//           if (!prefixes) return false;
//           return prefixes.some((p) => pathname.startsWith(p));
//         });

//         return allowed;
//       },
//     },
//     pages: {
//       signIn: '/login',
//     },
//   }
// );

// export const config = {
//   matcher: ['/admin/:path*'],
// };










import { withAuth } from 'next-auth/middleware';

const roleRoutes = {
  admin: ['/admin'],
  manager: ['/admin', '/admin/leads', '/admin/tickets', '/admin/users'],
  writer: ['/admin', '/admin/blog', '/admin/insights', '/admin/e-guides'],
  agent: ['/admin', '/admin/tickets', '/admin/leads'],
};

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Not logged in -> let NextAuth redirect to /login
        if (!token) return false;

        const roles = token.roles || [];
        if (!roles.length) return false;

        if (roles.includes('admin')) return true;

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
