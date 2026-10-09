import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.cookies.has("clevers_session")) return NextResponse.next();
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/tellen/:path*",
    "/historie/:path*",
    "/producten/:path*",
    "/weektaken/:path*",
    "/factuurcontrole/:path*",
    "/bestelling/:path*",
  ],
};
