import { NextRequest, NextResponse } from "next/server";

import { gebruikerOpEmail, isActief } from "@/lib/auth";
import { log } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "E-mailadres ontbreekt.",
        },
        {
          status: 400,
        },
      );
    }

    const gebruiker = await gebruikerOpEmail(email);

    const ipAdres =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;

    const userAgent =
      request.headers.get("user-agent") ??
      undefined;

    if (!gebruiker || !isActief(gebruiker)) {
await log({
  actie: "LOGIN_MISLUKT",
  entiteit: "Gebruiker",
  details: {
    melding:
      "Onbekende of inactieve gebruiker.",
  },
  ipAdres,
  userAgent,
});

      return NextResponse.json(
        {
          error: "Ongeldige inloggegevens.",
        },
        {
          status: 401,
        },
      );
    }

    await log({
      gebruikerId: gebruiker.id,
      actie: "LOGIN_GELUKT",
      entiteit: "Gebruiker",
      entiteitId: gebruiker.id,
      ipAdres,
      userAgent,
    });

    const response = NextResponse.json({
      success: true,
      gebruiker: {
        id: gebruiker.id,
        naam: gebruiker.naam,
        email: gebruiker.email,
      },
    });

    response.cookies.set({
      name: "clevers_session",
      value: gebruiker.id,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Interne serverfout.",
      },
      {
        status: 500,
      },
    );
  }
}