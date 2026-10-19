import { NextRequest, NextResponse } from "next/server";

async function geldigeErpSessie(session: string | undefined, secret: string | undefined): Promise<boolean> {
  if (!session || !secret) return false;

  const split = session.lastIndexOf(".");
  if (split <= 0) return false;

  const userId = session.slice(0, split);
  const ontvangen = session.slice(split + 1);
  if (!userId || !/^[a-f0-9]{64}$/i.test(ontvangen)) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(userId),
    );
    const verwacht = Array.from(new Uint8Array(signature), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    if (ontvangen.length !== verwacht.length) return false;

    let verschil = 0;
    for (let i = 0; i < verwacht.length; i++) {
      verschil |= ontvangen.charCodeAt(i) ^ verwacht.charCodeAt(i);
    }
    return verschil === 0;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("clevers_session")?.value;
  const secret = process.env.CLEVERS_BESTELLEN_INTEGRATION_SECRET;

  if (await geldigeErpSessie(session, secret)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set({
    name: "clevers_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tellen/:path*",
    "/historie/:path*",
    "/producten/:path*",
    "/factuurcontrole/:path*",
    "/bestelling/:path*",
  ],
};
