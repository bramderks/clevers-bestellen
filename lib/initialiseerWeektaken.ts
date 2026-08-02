import { prisma } from "@/lib/prisma";
import { weektakenNijmegen } from "@/data/weektaken/nijmegen";

export async function initialiseerWeektaken(
  weekId: string
) {
  try {
    const week =
      await prisma.week.findUnique({
        where: {
          id: weekId,
        },
      });

    if (!week) {
      return;
    }

    if (week.afgesloten) {
      return;
    }

    const bestaandeTaken =
      await prisma.weekTaak.findMany({
        where: {
          weekId,
        },
        select: {
          categorie: true,
          taak: true,
        },
      });

    const bestaandeSet =
      new Set(
        bestaandeTaken.map(
          (taak) =>
            `${taak.categorie}|${taak.taak}`
        )
      );

    const taken =
      week.vestiging ===
      "Roermond"
        ? weektakenNijmegen
        : weektakenNijmegen;

    const nieuweTaken = [];

    for (const categorie of taken) {
      for (const taak of categorie.taken) {
        const sleutel = `${categorie.categorie}|${taak.taak}`;

        if (
          bestaandeSet.has(sleutel)
        ) {
          continue;
        }

        nieuweTaken.push({
          weekId,
          categorie:
            categorie.categorie,
          taak: taak.taak,
          voltooid: false,
        });
      }
    }

    if (
      nieuweTaken.length > 0
    ) {
      await prisma.weekTaak.createMany({
        data: nieuweTaken,
      });
    }
  } catch (error) {
    console.error(
      "❌ Fout bij initialiseren van weektaken:"
    );
    console.error(error);

    throw error;
  }
}