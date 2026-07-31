import { prisma } from "@/lib/prisma";
import { getWeekInfo } from "./week";

export async function haalOfMaakWeek(
  vestiging: string
) {
  const { jaar, week } = getWeekInfo();

  let record =
    await prisma.week.findUnique({
      where: {
        vestiging_jaar_week: {
          vestiging,
          jaar,
          week,
        },
      },
    });

  if (record) {
    return record;
  }

  record = await prisma.week.create({
    data: {
      vestiging,
      jaar,
      week,
      afgesloten: false,
      afgeslotenOp: null,
    },
  });

  return record;
}