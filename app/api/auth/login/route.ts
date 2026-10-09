import { NextRequest, NextResponse } from "next/server";
import { maakErpSessie } from "@/lib/erp-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.CLEVERS_ERP_BASE_URL?.replace(/\/+$/, "");
  const secret = process.env.CLEVERS_BESTELLEN_INTEGRATION_SECRET;
  if (!baseUrl || !secret) {
    return NextResponse.json({ error: "De koppeling met Clevers ERP is nog niet volledig ingesteld." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const wachtwoord = typeof body?.wachtwoord === "string" ? body.wachtwoord : "";
    if (!email || !wachtwoord) return NextResponse.json({ error: "Vul e-mailadres en wachtwoord in." }, { status: 400 });

    const response = await fetch(baseUrl + "/api/integraties/bestellen/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-clevers-integration-secret": secret },
      body: JSON.stringify({ email, wachtwoord }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.gebruiker?.id) {
      return NextResponse.json({ error: data?.message ?? "Inloggen mislukt." }, { status: response.status || 502 });
    }

    const result = NextResponse.json({ success: true, gebruiker: data.gebruiker });
    result.cookies.set({
      name: "clevers_session",
      value: maakErpSessie(data.gebruiker.id, secret),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    result.headers.set("Cache-Control", "no-store");
    return result;
  } catch (error) {
    console.error("ERP login koppeling mislukt", error);
    return NextResponse.json({ error: "Clevers ERP is momenteel niet bereikbaar. Probeer het opnieuw." }, { status: 502 });
  }
}
