import { NextResponse } from "next/server";
import OpenAI from "openai";

import { maakProductPrompt } from "@/lib/productPrompt";
import { normaliseerArtikelen } from "@/lib/normaliseerArtikelen";
import { valideerArtikelen } from "@/lib/validator";
import { OCRArtikel } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  console.log("========== ANALYSE GESTART ==========");

  try {
    const formData = await request.formData();

    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Geen afbeelding ontvangen.",
        },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: maakProductPrompt(),
            },
            {
              type: "input_image",
              image_url: `data:${image.type};base64,${base64}`,
              detail: "high",
            },
          ],
        },
      ],
    });

    const antwoord = response.output_text;

    console.log("========== AI OUTPUT ==========");
    console.log(antwoord);

    let json: {
      artikelen: OCRArtikel[];
      opmerkingen?: string[];
    };

    try {
      json = JSON.parse(antwoord);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "AI gaf geen geldige JSON terug.",
          output: antwoord,
        },
        { status: 500 }
      );
    }

    console.log("========== AI ARTIKELEN ==========");
    console.table(json.artikelen);

    const artikelen = normaliseerArtikelen(json.artikelen ?? []);

    console.log("========== GENORMALISEERD ==========");
    console.table(artikelen);

    console.log(
      "Aantal slagroom:",
      artikelen.filter((a) => a.id === "slagroom").length
    );

    const validatie = valideerArtikelen(artikelen);

    console.log("========== VALIDATIE ==========");
    console.log(validatie);

    if (!validatie.geldig) {
      console.log("========== VALIDATIE FOUTEN ==========");
      console.table(validatie.fouten);

      return NextResponse.json(
        {
          success: false,
          message: "Validatie mislukt.",
          fouten: validatie.fouten,
          artikelen,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      artikelen,
      opmerkingen: json.opmerkingen ?? [],
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type,
      },
      { status: 500 }
    );
  }
}