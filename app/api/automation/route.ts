import { NextResponse } from "next/server";

import { verstuurBestelling } from "@/lib/automation/verzenden";
import type { CleversVestiging } from "@/lib/automation/login";

function getVestiging(value: unknown): CleversVestiging {
  if (value === "Nijmegen" || value === "Roermond") return value;
  throw new Error("Ongeldige vestiging voor automatisch bestellen.");
}

export async function POST(request: Request) {
  try {
    const bestelling = await request.json();
    const vestiging = getVestiging(bestelling?.vestiging);

    await verstuurBestelling(vestiging, bestelling?.regels ?? []);

    return NextResponse.json({
      success: true,
      vestiging,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Automatisch bestellen mislukt.",
      },
      {
        status: 500,
      }
    );
  }
}
