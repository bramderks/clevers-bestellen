import type { NextRequest } from "next/server";

export type ErpGebruiker = {
  id: string;
  naam: string;
  email: string;
  actief: boolean;
  rollen: string[];
  eigenaar: boolean;
  organisaties: Array<{ id: string; naam: string; rol: string }>;
  vestigingen: Array<{ id: string; naam: string; organisatieId: string }>;
};

export async function haalErpGebruiker(request: NextRequest): Promise<ErpGebruiker | null> {
  const session = request.cookies.get("clevers_session")?.value;
  const baseUrl = process.env.CLEVERS_ERP_BASE_URL?.replace(/\/+$/, "");
  const secret = process.env.CLEVERS_BESTELLEN_INTEGRATION_SECRET;
  if (!session || !baseUrl || !secret) return null;

  try {
    const response = await fetch(baseUrl + "/api/integraties/bestellen/auth?userId=" + encodeURIComponent(session), {
      headers: { "x-clevers-integration-secret": secret },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.gebruiker?.id ? data.gebruiker as ErpGebruiker : null;
  } catch {
    return null;
  }
}
