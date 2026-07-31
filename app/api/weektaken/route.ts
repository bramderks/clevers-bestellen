import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialiseerWeektaken } from "@/lib/initialiseerWeektaken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const weekId = searchParams.get("weekId");

  if (!weekId) {
    return NextResponse.json(
      { error: "weekId ontbreekt." },
      { status: 400 }
    );
  }

  await initialiseerWeektaken(weekId);

  const week = await prisma.week.findUnique({
    where: {
      id: weekId,
    },
  });

  if (!week) {
    return NextResponse.json(
      { error: "Week niet gevonden." },
      { status: 404 }
    );
  }

  const taken = await prisma.weekTaak.findMany({
    where: {
      weekId,
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