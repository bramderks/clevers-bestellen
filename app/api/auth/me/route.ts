import { NextRequest, NextResponse } from "next/server";
import { haalErpGebruiker } from "@/lib/erp-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const gebruiker = await haalErpGebruiker(request);
  if (!gebruiker) {
    return NextResponse.json({ gebruiker: null }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json({ gebruiker }, { headers: { "Cache-Control": "no-store" } });
}
