import { prisma } from "@/lib/prisma";
import { weektakenNijmegen } from "@/data/weektaken/nijmegen";

export async function initialiseerWeektaken(
  weekId: string
) {
  const week = await prisma.week.findUnique({
    where: {
      id: weekId,
    },
  });

  if (!week) return;

  const bestaat = await prisma.weekTaak.count({
    where: {
      weekId,
    },
  });

  if (bestaat > 0) return;

  // Later uitbreiden met Roermond
  const taken = weektakenNijmegen;

  for (const categorie of taken) {
    for (const taak of categorie.taken) {
      await prisma.weekTaak.create({
        data: {
          weekId,
          categorie: categorie.categorie,
          taak: taak.taak,
          voltooid: false,
        },
      });
    }
  }
}