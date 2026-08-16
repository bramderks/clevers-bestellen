import { NextResponse } from "next/server";

import { verstuurBestelling } from "@/lib/automation/verzenden";

export async function POST(
  request: Request
) {
  try {
    const bestelling =
      await request.json();

    await verstuurBestelling(
      bestelling
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Automatisch bestellen mislukt.",
      },
      {
        status: 500,
      }
    );
  }
}