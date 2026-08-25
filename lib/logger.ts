import { Prisma } from "@prisma/client";

import { schrijfAudit } from "@/lib/audit";

interface LogInput {
  gebruikerId?: string;
  actie: string;
  entiteit: string;
  entiteitId?: string;
  details?: Prisma.InputJsonValue | null;
  ipAdres?: string;
  userAgent?: string;
}

export async function log({
  gebruikerId,
  actie,
  entiteit,
  entiteitId,
  details,
  ipAdres,
  userAgent,
}: LogInput) {
  await schrijfAudit({
    gebruikerId,
    actie,
    entiteit,
    entiteitId,
    details,
    ipAdres,
    userAgent,
  });
}