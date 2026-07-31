import { prisma } from "@/lib/prisma";
import { haalOfMaakWeek } from "./haalOfMaakWeek";
import { weektakenNijmegen } from "@/data/weektaken/nijmegen";

export async function initialiseerWeektaken(
  vestiging: string
) {
  const week = await haalOfMaakWeek(vestiging);

  const aantal = await prisma.weekTaak.count({
    where: {
      weekId: week.id,
    },
  });

  if (aantal > 0) return week;

  const bron =
    vestiging === "Nijmegen"
      ? weektakenNijmegen
      : [];

  for (const categorie of bron) {
for (const taak of categorie.taken) {
  await prisma.weekTaak.create({
    data: {
      weekId: week.id,
      taakId: taak.id,
      categorie: categorie.categorie,
      taak: taak.taak,
    },
  });
}
  }

  return week;
}