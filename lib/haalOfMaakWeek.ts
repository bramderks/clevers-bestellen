import { prisma } from "@/lib/prisma";
import { getWeekInfo } from "./week";

export async function haalOfMaakWeek(
  vestiging: string
) {
  const { jaar, week } =
    getWeekInfo();

  try {
    const bestaandeWeek =
      await prisma.week.findUnique({
        where: {
          vestiging_jaar_week: {
            vestiging,
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
        vestiging,
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