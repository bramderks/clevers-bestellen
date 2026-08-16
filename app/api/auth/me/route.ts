import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("clevers_session");

  if (!session) {
    return NextResponse.json(
      { gebruiker: null },
      { status: 401 },
    );
  }

  const gebruiker = await prisma.gebruiker.findUnique({
    where: {
      id: session.value,
    },
    include: {
      vestiging: true,
      medewerker: true,
      rollen: {
        include: {
          rol: true,
        },
      },
    },
  });

  if (!gebruiker || !gebruiker.actief) {
    return NextResponse.json(
      { gebruiker: null },
      { status: 401 },
    );
  }

  return NextResponse.json({
    gebruiker: {
      id: gebruiker.id,
      naam: gebruiker.naam,
      email: gebruiker.email,
      vestiging: gebruiker.vestiging,
      medewerker: gebruiker.medewerker,
      rollen: gebruiker.rollen.map((r) => r.rol.naam),
    },
  });
}