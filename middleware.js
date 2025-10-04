import { NextResponse } from 'next/server';

export function middleware(request) {
  // You can add additional security checks here if needed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};