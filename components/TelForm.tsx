"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Vestiging } from "@/types";

import { producten } from "@/data/producten";

import TelCategorie from "./TelCategorie";
import ControlePagina from "./ControlePagina";
import SpeciaalsmakenTeller from "./SpeciaalsmakenTeller";

import TelHeader from "@/components/tellen/TelHeader";
import TelNavigatie from "@/components/tellen/TelNavigatie";

import { berekenBestelling } from "@/lib/bestelEngine";
import { getControleBestelling } from "@/lib/tellen/getControleBestelling";
import { getProductenVoorStap } from "@/lib/tellen/getProductenVoorStap";
import { getStappen } from "@/lib/tellen/getStappen";
import { opslaanBestelling } from "@/lib/tellen/opslaanBestelling";

interface Props {
  vestiging: Vestiging;
}

export default function TelForm({
  vestiging,
}: Props) {
  const router = useRouter();

const stappen = useMemo(
  () => getStappen(vestiging),
  [vestiging]
);

  const [telling, setTelling] = useState<Record<string, number>>({});
  const [stap, setStap] = useState(0);
  const [medewerker, setMedewerker] = useState("");
  const [opmerking, setOpmerking] = useState("");
  const [opslaanBezig, setOpslaanBezig] = useState(false);

  function wijzig(
    id: string,
    waarde: number
  ) {
    setTelling((vorige) => ({
      ...vorige,
      [id]: waarde,
    }));
  }

  const artikelen = useMemo(
    () =>
      producten.map((product) => ({
        id: product.id,
        naam: product.naam,
        aantal: telling[product.id] ?? 0,
      })),
    [telling]
  );

  const advies = useMemo(
    () =>
      berekenBestelling(
        artikelen,
        producten,
        vestiging
      ),
    [artikelen, vestiging]
  );

  const controleBestelling = useMemo(
    () =>
      getControleBestelling(
        advies,
        vestiging
      ),
    [advies, vestiging]
  );

  const controleStap =
    stap === stappen.length;

  const huidigeStap = controleStap
    ? null
    : stappen[stap];

  const huidigeProducten = controleStap
    ? []
    : getProductenVoorStap(
        vestiging,
        huidigeStap!.key
      );

  function volgende() {
    if (stap < stappen.length) {
      setStap((s) => s + 1);
    }
  }

  function vorige() {
    if (stap > 0) {
      setStap((s) => s - 1);
    }
  }

  async function opslaan() {
    if (opslaanBezig) return;

    if (!medewerker.trim()) {
      alert("Vul de naam van de medewerker in.");
      return;
    }

    setOpslaanBezig(true);

    try {
      await opslaanBestelling({
        vestiging,
        medewerker,
        opmerking,
        advies,
      });

      alert(
        "✅ Bestelling opgeslagen."
      );

      router.push("/historie");
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Er is iets misgegaan."
      );
    } finally {
      setOpslaanBezig(false);
    }
  }

  return (
    <div className="space-y-6">

      <TelHeader
        vestiging={vestiging}
        medewerker={medewerker}
        onMedewerkerChange={
          setMedewerker
        }
        stap={stap}
        totaalStappen={
          stappen.length
        }
        controleStap={
          controleStap
        }
      />

      {!controleStap ? (
        huidigeStap?.key ===
        "speciaalsmaken" ? (
          <SpeciaalsmakenTeller
            waarde={
              telling.speciaalsmaken ??
              0
            }
            onChange={(waarde) =>
              wijzig(
                "speciaalsmaken",
                waarde
              )
            }
            slagroom={
              telling.slagroom ?? 0
            }
            onSlagroomChange={(
              waarde
            ) =>
              wijzig(
                "slagroom",
                waarde
              )
            }
          />
        ) : (
          <TelCategorie
            titel={
              huidigeStap!.titel
            }
            producten={
              huidigeProducten
            }
            telling={telling}
            vestiging={
              vestiging
            }
            onChange={wijzig}
          />
        )
      ) : (
        <ControlePagina
          controleBestelling={
            controleBestelling
          }
          opmerking={opmerking}
          setOpmerking={
            setOpmerking
          }
        />
      )}

      <TelNavigatie
        stap={stap}
        totaalStappen={
          stappen.length
        }
        controleStap={
          controleStap
        }
        opslaanBezig={
          opslaanBezig
        }
        onVorige={vorige}
        onVolgende={volgende}
        onOpslaan={opslaan}
      />

    </div>
  );
}