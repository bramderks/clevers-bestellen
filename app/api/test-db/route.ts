import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const aantal = await prisma.bestelling.count();

    return NextResponse.json({
      success: true,
      aantal,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database niet bereikbaar",
      },
      { status: 500 }
    );
  }
}