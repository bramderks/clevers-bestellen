import { prisma } from "@/lib/prisma";

export async function haalWeektakenOp() {
  return prisma.weekTaak.findMany({
    orderBy: [
      { categorie: "asc" },
      { taak: "asc" },
    ],
  });
}

export async function maakTaak(data: {
  weekId: string;
  categorie: string;
  taak: string;
}) {
  return prisma.weekTaak.create({
    data,
  });
}

export async function vinkTaakAf(
  id: string,
  naam: string
) {
  return prisma.weekTaak.update({
    where: { id },
    data: {
      voltooid: true,
      naam,
      voltooidOp: new Date(),
    },
  });
}
