import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const guestOnlyRoutes = ['/', '/signin', '/signup'];
const authOnlyPrefix = '/home';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  if (token && guestOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!token && pathname.startsWith(authOnlyPrefix)) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}