// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Redirect '/signup' to '/login'
  if (url.pathname === '/signup') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check for session cookie on protected routes
  const sessionCookie = req.cookies.get('session'); // Use the name of your session cookie
  
  // If no session cookie is found, redirect to the login page
  if (!sessionCookie && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Proceed to the requested page if authenticated
  return NextResponse.next();
}

// Configure the middleware to match specific routes
export const config = {
  matcher: ['/signup', '/dashboard/:path*'], // Apply middleware to /signup and protected routes
};
