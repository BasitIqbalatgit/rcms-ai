// // /middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   console.log("Middleware running for path:", request.nextUrl.pathname);
  
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
  
//   console.log("Token received:", token ? "Yes" : "No");

//   // Define public routes that don't require authentication
//   const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/verify-email'];
//   const path = request.nextUrl.pathname;

//   // Check if the current path is a public route
//   const isPublicRoute = publicRoutes.some(route => 
//     path === route || path.startsWith('/api/auth')
//   );

//   // Allow public routes and API routes that need to be accessible
//   if (isPublicRoute) {
//     return NextResponse.next();
//   }

//   // If not authenticated and trying to access protected route, redirect to login
//   if (!token) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
//     return NextResponse.redirect(loginUrl);
//   }

//   // Role-based route protection - using console.log to debug
//   console.log('Token role:', token.role);
//   const userRole = token.role as string;

//   // Admin routes
//   if (path.startsWith('/admin') && userRole !== 'admin') {
//     console.log('Access denied to admin route');
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // Operator routes
//   if (path.startsWith('/operator') && userRole !== 'operator') {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // SaaS Provider routes
//   if ((path.startsWith('/saas') || path.startsWith('/saas_provider')) && 
//       userRole !== 'saas_provider') {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// // Configure the paths that should be checked by the middleware
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|public).*)',
//     '/',
//   ],

// };




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  console.log("Middleware running for path:", request.nextUrl.pathname);
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  console.log("Token received:", token ? "Yes" : "No");

  const path = request.nextUrl.pathname;

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/verify-email'];
  
  // Check if the current path is a public route or auth-related route
  const isPublicRoute = publicRoutes.some(route => path === route);
  const isAuthRoute = path.startsWith('/api/auth');

  // Allow public routes and all auth routes to pass through
  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next();
  }

  // If not authenticated and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection - using console.log to debug
  console.log('Token role:', token.role);
  const userRole = token.role as string;

  // Admin routes
  if (path.startsWith('/admin') && userRole !== 'admin') {
    console.log('Access denied to admin route');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Operator routes
  if (path.startsWith('/operator') && userRole !== 'operator') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // SaaS Provider routes
  if ((path.startsWith('/saas') || path.startsWith('/saas_provider')) && 
      userRole !== 'saas_provider') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth (auth endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
    '/',
  ],
};