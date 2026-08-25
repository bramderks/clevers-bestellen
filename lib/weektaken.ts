import { prisma } from "@/lib/prisma";

export async function haalWeektakenOp() {
  return prisma.weekTaak.findMany({
    orderBy: [
      {
        categorie: "asc",
      },
      {
        titel: "asc",
      },
    ],
  });
}

export async function maakTaak(data: {
  weekId: string;
  categorie: string;
  titel: string;
}) {
  return prisma.weekTaak.create({
    data,
  });
}

export async function vinkTaakAf(
  id: string
) {
  return prisma.weekTaak.update({
    where: {
      id,
    },
    data: {
      voltooid: true,
      voltooidOp: new Date(),
    },
  });
}