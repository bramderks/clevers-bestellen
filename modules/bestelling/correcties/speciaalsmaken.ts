import { prisma } from "@/lib/prisma";

export interface SpeciaalSmaak {
  productId: string;
  naam: string;
  categorie: string;
}

export async function haalSpeciaalsmakenOp(
  vestigingId: string,
): Promise<SpeciaalSmaak[]> {
  const buffers = await prisma.productBuffer.findMany({
    where: {
      vestigingId,
      product: {
        actief: true,
        categorie: "SPECIAAL",
      },
    },
    include: {
      product: true,
    },
    orderBy: {
      product: {
        naam: "asc",
      },
    },
  });

  return buffers.map((buffer) => ({
    productId: buffer.product.id,
    naam: buffer.product.naam,
    categorie: buffer.product.categorie,
  }));
}

export async function isSpeciaalSmaak(
  vestigingId: string,
  productId: string,
): Promise<boolean> {
  const producten =
    await haalSpeciaalsmakenOp(vestigingId);

  return producten.some(
    (product) => product.productId === productId,
  );
}

export async function aantalSpeciaalsmaken(
  vestigingId: string,
): Promise<number> {
  const producten =
    await haalSpeciaalsmakenOp(vestigingId);

  return producten.length;
}

export async function namenSpeciaalsmaken(
  vestigingId: string,
): Promise<string[]> {
  const producten =
    await haalSpeciaalsmakenOp(vestigingId);

  return producten.map(
    (product) => product.naam,
  );
}