import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tellen/:path*",
    "/historie/:path*",
    "/producten/:path*",
    "/weektaken/:path*",
  ],
};