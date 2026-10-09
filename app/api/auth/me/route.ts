import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("clevers_session")?.value;
  const baseUrl = process.env.CLEVERS_ERP_BASE_URL?.replace(/\/+$/, "");
  const secret = process.env.CLEVERS_BESTELLEN_INTEGRATION_SECRET;

  if (!session || !baseUrl || !secret) {
    return NextResponse.json({ gebruiker: null }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const response = await fetch(baseUrl + "/api/integraties/bestellen/auth?userId=" + encodeURIComponent(session), {
      headers: { "x-clevers-integration-secret": secret },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.gebruiker?.id) {
      const result = NextResponse.json({ gebruiker: null }, { status: 401 });
      result.cookies.delete("clevers_session");
      result.headers.set("Cache-Control", "no-store");
      return result;
    }
    return NextResponse.json({ gebruiker: data.gebruiker }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ gebruiker: null, error: "Clevers ERP is niet bereikbaar." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
