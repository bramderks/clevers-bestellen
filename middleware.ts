import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { APP } from "@/lib/config/app";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Applicatie-informatie
  response.headers.set("X-App-Name", APP.naam);
  response.headers.set("X-App-Version", APP.versie);
  response.headers.set("X-License", APP.licentie);
  response.headers.set("X-Copyright", APP.copyright);

  // Basisbeveiliging
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};