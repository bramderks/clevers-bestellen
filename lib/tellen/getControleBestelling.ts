import type {
  BestelAdvies,
  BestelRegel,
  ControleBestelling,
  Product,
  Vestiging,
} from "@/types";

function maakRegel(
  advies: BestelAdvies,
  product: Product
): BestelRegel {
  return {
    product,
    geteld: advies.geteld,
    buffer: advies.buffer,
    bestellen: advies.bestellen,
  };
}

export function getControleBestelling(
  advies: BestelAdvies[],
  vestiging: Vestiging
): ControleBestelling {
  const ijsBestelling: BestelRegel[] = [];
  const drooggoedBestelling: BestelRegel[] = [];

  let speciaalsmaken:
    | BestelRegel
    | null = null;

  let slagroom:
    | BestelRegel
    | null = null;

  for (const regel of advies) {
    const product: Product = {
      id: regel.id,
      naam: regel.naam,

      categorie:
        regel.categorie,

      bestelBij:
        regel.bestelBij,

      bestelGroep:
        regel.bestelGroep,

      buffers: {
        roermond:
          regel.buffer,
        nijmegen:
          regel.buffer,
      },

      telCategorie:
        regel.id === "speciaalsmaken"
          ? "speciaalsmaken"
          : regel.bestelGroep === "drooggoed"
            ? "drooggoed"
            : "hardlopers",

      volgorde:
        regel.volgorde,

      actief: true,

      alternatieveNamen: [],
    };

    const controleRegel =
      maakRegel(
        regel,
        product
      );

    if (
      regel.id ===
      "speciaalsmaken"
    ) {
      speciaalsmaken =
        controleRegel;

      continue;
    }

    if (
      regel.id ===
      "slagroom"
    ) {
      slagroom =
        controleRegel;

      continue;
    }

    if (
      regel.bestelGroep ===
      "ijs"
    ) {
      ijsBestelling.push(
        controleRegel
      );
    } else {
      drooggoedBestelling.push(
        controleRegel
      );
    }
  }

  ijsBestelling.sort(
    (a, b) =>
      a.product.naam.localeCompare(
        b.product.naam,
        "nl"
      )
  );

  drooggoedBestelling.sort(
    (a, b) =>
      a.product.naam.localeCompare(
        b.product.naam,
        "nl"
      )
  );

  return {
    ijsBestelling,

    speciaalsmaken,

    slagroom,

    drooggoedBestelling,

    totaalIJs:
      ijsBestelling.reduce(
        (totaal, regel) =>
          totaal +
          regel.bestellen,
        0
      ) +
      (speciaalsmaken?.bestellen ??
        0),

    totaalDrooggoed:
      drooggoedBestelling.reduce(
        (totaal, regel) =>
          totaal +
          regel.bestellen,
        0
      ),
  };
}