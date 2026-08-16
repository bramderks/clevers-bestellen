import {
  BestelAdviesRegel,
  BestelRegel,
  BufferRegel,
  TelRegel,
} from "../types/bestelling";

export function berekenBestelAdvies(
  telling: TelRegel[],
  buffers: BufferRegel[],
): BestelAdviesRegel[] {
  return telling.map((regel) => {
    const buffer = buffers.find(
      (b) => b.productId === regel.productId,
    );

    if (!buffer) {
      return {
        productId: regel.productId,
        geteld: regel.geteld,
        buffer: 0,
        besteld: 0,
        minimumVoorraad: null,
        maximaleVoorraad: null,
        advies: 0,
        reden: "Geen buffer ingesteld",
      };
    }

    let advies = Math.max(
      0,
      buffer.buffer - regel.geteld,
    );

    let reden = "Normbuffer";

    if (
      buffer.minimumVoorraad !== null &&
      regel.geteld < buffer.minimumVoorraad
    ) {
      advies = Math.max(
        advies,
        buffer.minimumVoorraad -
          regel.geteld,
      );

      reden = "Minimumvoorraad";
    }

    if (
      buffer.maximaleVoorraad !== null &&
      regel.geteld + advies >
        buffer.maximaleVoorraad
    ) {
      advies =
        buffer.maximaleVoorraad -
        regel.geteld;

      if (advies < 0) {
        advies = 0;
      }

      reden = "Maximumvoorraad";
    }

    return {
      productId: regel.productId,
      geteld: regel.geteld,
      buffer: buffer.buffer,
      besteld: advies,
      minimumVoorraad:
        buffer.minimumVoorraad,
      maximaleVoorraad:
        buffer.maximaleVoorraad,
      advies,
      reden,
    };
  });
}

export function totaalAdvies(
  regels: BestelAdviesRegel[],
) {
  return regels.reduce(
    (totaal, regel) => totaal + regel.advies,
    0,
  );
}

export function productenMetAdvies(
  regels: BestelAdviesRegel[],
) {
  return regels.filter(
    (regel) => regel.advies > 0,
  );
}