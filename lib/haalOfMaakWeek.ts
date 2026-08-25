import { prisma } from "@/lib/prisma";
import { getWeekInfo } from "./week";

export async function haalOfMaakWeek(
  vestigingNaam: string
) {
  const { jaar, week } = getWeekInfo();

  try {
    const vestiging =
      await prisma.vestiging.findUnique({
        where: {
          naam: vestigingNaam,
        },
      });

    if (!vestiging) {
      throw new Error(
        `Vestiging "${vestigingNaam}" bestaat niet.`
      );
    }

    const bestaandeWeek =
      await prisma.week.findUnique({
        where: {
          vestigingId_jaar_week: {
            vestigingId: vestiging.id,
            jaar,
            week,
          },
        },
      });

    if (bestaandeWeek) {
      return bestaandeWeek;
    }

    return await prisma.week.create({
      data: {
        vestigingId: vestiging.id,
        jaar,
        week,
        afgesloten: false,
        afgeslotenOp: null,
      },
    });
  } catch (error) {
    console.error(
      "❌ Fout bij ophalen of aanmaken van week:"
    );
    console.error(error);

    throw error;
  }
}