import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface HistorieInput {
  bestellingId?: number;
  gebruikerId?: string;
  vestigingId?: string;

  type: string;
  gebeurtenis: string;

  omschrijving?: string;

  details?: Prisma.InputJsonValue | null;

  ipAdres?: string;
  userAgent?: string;

  appVersie?: string;
  buildVersie?: string;
}

export async function schrijfHistorie({
  bestellingId,
  gebruikerId,
  vestigingId,
  type,
  gebeurtenis,
  omschrijving,
  details,
  ipAdres,
  userAgent,
  appVersie,
  buildVersie,
}: HistorieInput) {
  return prisma.historie.create({
    data: {
      bestellingId,
      gebruikerId,
      vestigingId,
      type,
      gebeurtenis,
      omschrijving,
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