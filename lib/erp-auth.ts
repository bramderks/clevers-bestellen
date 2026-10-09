import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export function maakErpSessie(userId: string, secret: string): string {
  const signature = createHmac("sha256", secret).update(userId).digest("hex");
  return userId + "." + signature;
}

export function controleerErpSessie(session: string, secret: string): string | null {
  const split = session.lastIndexOf(".");
  if (split <= 0) return null;
  const userId = session.slice(0, split);
  const received = session.slice(split + 1);
  const expected = createHmac("sha256", secret).update(userId).digest("hex");
  if (received.length !== expected.length) return null;
  return timingSafeEqual(Buffer.from(received), Buffer.from(expected)) ? userId : null;
}

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
  const userId = controleerErpSessie(session, secret);
  if (!userId) return null;

  try {
    const response = await fetch(baseUrl + "/api/integraties/bestellen/auth?userId=" + encodeURIComponent(userId), {
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
