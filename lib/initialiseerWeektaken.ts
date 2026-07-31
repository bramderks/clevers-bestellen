import { prisma } from "@/lib/prisma";
import { weektakenNijmegen } from "@/data/weektaken/nijmegen";

export async function initialiseerWeektaken(
  weekId: string
) {
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

  const bestaandeSet = new Set(
    bestaandeTaken.map(
      (t) => `${t.categorie}|${t.taak}`
    )
  );

  // Later uitbreiden met Roermond
  const taken = weektakenNijmegen;

  for (const categorie of taken) {
    for (const taak of categorie.taken) {
      const sleutel = `${categorie.categorie}|${taak.taak}`;

      if (bestaandeSet.has(sleutel)) {
        continue;
      }

      await prisma.weekTaak.create({
        data: {
          weekId,
          categorie:
            categorie.categorie,
          taak: taak.taak,
          voltooid: false,
        },
      });
    }
  }
}