import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface HistorieInput {
  gebruikerId?: string;
  vestigingId?: string;
  type: string;
  gebeurtenis: string;
  omschrijving?: string;
  details?: Prisma.InputJsonValue | null;
  ipAdres?: string;
  userAgent?: string;
}

export async function schrijfHistorie({
  gebruikerId,
  vestigingId,
  type,
  gebeurtenis,
  omschrijving,
  details,
  ipAdres,
  userAgent,
}: HistorieInput) {
  return prisma.activiteit.create({
    data: {
      gebruikerId,
      vestigingId,
      module: type,
      actie: gebeurtenis,
      entiteit: omschrijving,
      metadata:
        details === null
          ? Prisma.JsonNull
          : details,
    },
  });
}