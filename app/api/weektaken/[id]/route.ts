import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;
  const { naam, voltooid } = await req.json();

  const taak = await prisma.weekTaak.update({
    where: { id },
    data: {
      naam,
      voltooid,
      voltooidOp: voltooid ? new Date() : null,
    },
  });

  return NextResponse.json(taak);
}