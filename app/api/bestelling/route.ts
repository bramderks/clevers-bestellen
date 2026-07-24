import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const bestelling = await prisma.bestelling.create({
      data: {
        datum: new Date(body.datum),
        vestiging: body.vestiging,
        type: body.type,

        regels: {
          create: body.regels.map((r: any) => ({
            productId: r.productId,
            productNaam: r.productNaam,
            geteld: r.geteld,
            buffer: r.buffer,
            besteld: r.besteld,
            bestelGroep: r.bestelGroep,
          })),
        },
      },

      include: {
        regels: true,
      },
    });

    return NextResponse.json(bestelling);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        error: "Opslaan mislukt",
      },
      {
        status: 500,
      }
    );
  }
}