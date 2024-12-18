import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Middleware triggered for:', req.nextUrl.pathname); 

  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader
    ?.split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  console.log('Token found:', token); 

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('No token found. Redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
