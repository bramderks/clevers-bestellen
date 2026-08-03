import { genereerBestelPdf } from "@/lib/genereerPdf";

import type {
  BestelAdvies,
  Vestiging,
} from "@/types";

interface OpslaanParams {
  vestiging: Vestiging;
  medewerker: string;
  opmerking: string;
  advies: BestelAdvies[];
}

export async function opslaanBestelling({
  vestiging,
  medewerker,
  opmerking,
  advies,
}: OpslaanParams) {
  const datum = new Date().toISOString();

  const regels = advies.map((regel) => ({
    productId: regel.id,
    productNaam: regel.naam,
    geteld: regel.geteld,
    buffer: regel.buffer,
    besteld: regel.bestellen,
    bestelGroep: regel.bestelGroep,
  }));

  const response = await fetch(
    "/api/bestelling",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        datum,
        vestiging,
        medewerker,
        type: "telling",
        opmerking,
        regels,
      }),
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ??
        "Opslaan mislukt."
    );
  }

  genereerBestelPdf({
    vestiging,
    datum,
    bestelling: advies,
  });

  return result;
}