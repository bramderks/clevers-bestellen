import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Ontvangen bestelling:", body);

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

    console.log("✅ BESTELLING OPGESLAGEN");
    console.log(bestelling);

    return NextResponse.json({
      success: true,
      bestelling,
    });
  } catch (error) {
    console.error("❌ FOUT BIJ OPSLAAN");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}