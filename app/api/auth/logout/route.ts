import { NextResponse } from "next/server";

import { log } from "@/lib/logger";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "clevers_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  await log({
    actie: "LOGOUT",
    entiteit: "Gebruiker",
  });

  return response;
}