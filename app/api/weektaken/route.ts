import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialiseerWeektaken } from "@/lib/initialiseerWeektaken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const vestiging =
    searchParams.get("vestiging") ?? "Nijmegen";

  const week = await initialiseerWeektaken(vestiging);

  const taken = await prisma.weekTaak.findMany({
    where: {
      weekId: week.id,
    },
    orderBy: [
      { categorie: "asc" },
      { taak: "asc" },
    ],
  });

  return NextResponse.json({
    week,
    taken,
  });
}