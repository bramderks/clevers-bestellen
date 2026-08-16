import { prisma } from "@/lib/prisma";

export interface Hardloper {
  productId: string;
  naam: string;
  factor: number;
}

export async function haalHardlopersOp(
  vestigingId: string,
): Promise<Hardloper[]> {
  const buffers = await prisma.productBuffer.findMany({
    where: {
      vestigingId,
    },
    include: {
      product: true,
    },
    orderBy: {
      product: {
        volgorde: "asc",
      },
    },
  });

  return buffers
    .filter(
      (buffer) =>
        buffer.product.actief &&
        buffer.buffer > 0,
    )
    .map((buffer) => ({
      productId: buffer.product.id,
      naam: buffer.product.naam,
      factor: 1,
    }));
}

export async function isHardloper(
  vestigingId: string,
  productId: string,
): Promise<boolean> {
  const hardlopers =
    await haalHardlopersOp(vestigingId);

  return hardlopers.some(
    (product) => product.productId === productId,
  );
}

export async function factorVoorProduct(
  vestigingId: string,
  productId: string,
): Promise<number> {
  const hardlopers =
    await haalHardlopersOp(vestigingId);

  const product = hardlopers.find(
    (p) => p.productId === productId,
  );

  return product?.factor ?? 1;
}