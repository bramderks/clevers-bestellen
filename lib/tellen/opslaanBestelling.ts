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

function vestigingNaam(
  vestiging: Vestiging
): string {
  switch (vestiging) {
    case "roermond":
      return "Roermond";

    case "nijmegen":
      return "Nijmegen";

    default:
      return vestiging;
  }
}

export async function opslaanBestelling({
  vestiging,
  medewerker,
  opmerking,
  advies,
}: OpslaanParams) {
  if (!medewerker.trim()) {
    throw new Error(
      "Vul de naam van de medewerker in."
    );
  }

  const datum =
    new Date().toISOString();

  const regels = advies.map(
    (regel) => ({
      productId: regel.id,

      productNaam:
        regel.naam,

      geteld:
        regel.geteld,

      buffer:
        regel.buffer,

      besteld:
        regel.bestellen,

      bestelGroep:
        regel.bestelGroep,
    })
  );

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

        vestiging:
          vestigingNaam(vestiging),

        medewerker:
          medewerker.trim(),

        opmerking:
          opmerking.trim(),

        regels,
      }),
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ??
        "Versturen mislukt."
    );
  }

  return result;
}