import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    '/dashboard',
    '/tasks',
    '/staking',
    '/nft',
    '/referral',
    '/roadmap',
    '/community',
    '/admin',
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLoginPage = pathname === '/login';

  // ইউজার লগইন না থাকলে /login পেজে পাঠাবে
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ইউজার লগইন থাকলে /login পেজে যেতে দেবে না, ড্যাশবোর্ডে রিডাইরেক্ট করবে
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tasks/:path*',
    '/staking/:path*',
    '/nft/:path*',
    '/referral/:path*',
    '/roadmap/:path*',
    '/community/:path*',
    '/admin/:path*',
    '/login',
  ],
};