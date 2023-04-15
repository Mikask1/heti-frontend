import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = new URL(request.url);

  if (process.env.NEXT_PUBLIC_STATUS_PRODUCTION === 'coming_soon') {
    url.pathname = '/coming-soon';
    return NextResponse.rewrite(url);
  } else if (process.env.NEXT_PUBLIC_STATUS_PRODUCTION === 'maintenance') {
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
