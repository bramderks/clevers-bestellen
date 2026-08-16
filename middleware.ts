import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/tellen",
  "/historie",
  "/producten",
  "/medewerkers",
  "/planning",
  "/weektaken",
  "/instellingen",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const beveiligd = PROTECTED_PATHS.some((pad) =>
    pathname.startsWith(pad),
  );

  if (!beveiligd) {
    return NextResponse.next();
  }

  const sessie = request.cookies.get("clevers_session");

  if (!sessie) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tellen/:path*",
    "/historie/:path*",
    "/producten/:path*",
    "/medewerkers/:path*",
    "/planning/:path*",
    "/weektaken/:path*",
    "/instellingen/:path*",
  ],
};