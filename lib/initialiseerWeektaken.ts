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
        include: {
          vestiging: true,
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
          titel: true,
        },
      });

    const bestaandeSet = new Set(
      bestaandeTaken.map(
        (taak) =>
          `${taak.categorie ?? ""}|${taak.titel}`
      )
    );

    /*
     * Op dit moment is alleen de weektakenlijst
     * van Nijmegen beschikbaar.
     *
     * Zodra Roermond een eigen takenbestand krijgt,
     * kan hier eenvoudig tussen de twee lijsten
     * worden gekozen.
     */
    const taken =
      week.vestiging?.naam === "Roermond"
        ? weektakenNijmegen
        : weektakenNijmegen;

    const nieuweTaken: {
      weekId: string;
      categorie: string | null;
      titel: string;
      omschrijving: string | null;
      voltooid: boolean;
    }[] = [];

    for (const categorie of taken) {
      for (const taak of categorie.taken) {
        const sleutel = `${
          categorie.categorie ?? ""
        }|${taak.taak}`;

        if (bestaandeSet.has(sleutel)) {
          continue;
        }

        nieuweTaken.push({
          weekId,
          categorie:
            categorie.categorie ?? null,
          titel: taak.taak,
          omschrijving: null,
          voltooid: false,
        });
      }
    }

    if (nieuweTaken.length === 0) {
      return;
    }

    await prisma.weekTaak.createMany({
      data: nieuweTaken,
    });
  } catch (error) {
    console.error(
      "❌ Fout bij initialiseren van weektaken:"
    );
    console.error(error);

    throw error;
  }
}