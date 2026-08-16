import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface AuditInput {
  gebruikerId?: string;
  actie: string;
  entiteit: string;
  entiteitId?: string;
  succes?: boolean;
  melding?: string;
  details?: Prisma.InputJsonValue | null;
  ipAdres?: string;
  userAgent?: string;
  appVersie?: string;
  buildVersie?: string;
}

export async function schrijfAudit({
  gebruikerId,
  actie,
  entiteit,
  entiteitId,
  succes = true,
  melding,
  details,
  ipAdres,
  userAgent,
  appVersie,
  buildVersie,
}: AuditInput) {
  return prisma.auditLog.create({
    data: {
      gebruikerId,
      actie,
      entiteit,
      entiteitId,
      succes,
      melding,
      details:
        details === null
          ? Prisma.JsonNull
          : details,
      ipAdres,
      userAgent,
      appVersie,
      buildVersie,
    },
  });
}