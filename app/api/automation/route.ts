import { NextResponse } from "next/server";
import { verstuurBestelling } from "@/lib/automation/verzenden";

export async function POST(req: Request) {
  try {
    const bestelling = await req.json();

    await verstuurBestelling(bestelling);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Automatisch bestellen mislukt.",
      },
      { status: 500 }
    );
  }
}