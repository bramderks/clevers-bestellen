import { Prisma } from "@prisma/client";

import { schrijfAudit } from "@/lib/audit";
import { versieInfo } from "@/lib/version";

interface LogInput {
  gebruikerId?: string;

  actie: string;

  entiteit: string;

  entiteitId?: string;

  succes?: boolean;

  melding?: string;

  details?: Prisma.InputJsonValue | null;

  ipAdres?: string;

  userAgent?: string;
}

export async function log({
  gebruikerId,
  actie,
  entiteit,
  entiteitId,
  succes = true,
  melding,
  details,
  ipAdres,
  userAgent,
}: LogInput) {
  const versie = versieInfo();

  await schrijfAudit({
    gebruikerId,
    actie,
    entiteit,
    entiteitId,
    succes,
    melding,
    details,
    ipAdres,
    userAgent,
    appVersie: versie.appVersie,
    buildVersie: versie.buildVersie,
  });
}