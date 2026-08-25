import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface AuditInput {
  gebruikerId?: string;
  actie: string;
  entiteit: string;
  entiteitId?: string;
  details?: Prisma.InputJsonValue | null;
  ipAdres?: string;
  userAgent?: string;
}

export async function schrijfAudit({
  gebruikerId,
  actie,
  entiteit,
  entiteitId,
  details,
  ipAdres,
  userAgent,
}: AuditInput) {
  return prisma.auditLog.create({
    data: {
      gebruikerId,
      actie,
      entiteit,
      entiteitId,
      details:
        details === null
          ? Prisma.JsonNull
          : details,
      ipAdres,
      userAgent,
    },
  });
}