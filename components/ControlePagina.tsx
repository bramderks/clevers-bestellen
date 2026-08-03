"use client";

import type {
  ControleBestelling,
} from "@/types";

interface Props {
  controleBestelling: ControleBestelling;
  opmerking: string;
  setOpmerking: (
    waarde: string
  ) => void;
}

function Regel({
  naam,
  aantal,
}: {
  naam: string;
  aantal: number;
}) {
  return (
    <div className="flex items-center justify-between border-b px-5 py-3 last:border-b-0">
      <span>{naam}</span>

      <span className="font-semibold">
        {aantal}
      </span>
    </div>
  );
}

function Blok({
  titel,
  kleur,
  children,
  totaal,
}: {
  titel: string;
  kleur: string;
  children: React.ReactNode;
  totaal?: number;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white">

      <div
        className={`border-b px-5 py-3 font-semibold text-white ${kleur}`}
      >
        {titel}
      </div>

      <div>{children}</div>

      {totaal !== undefined && (
        <div className="flex justify-between border-t bg-slate-50 px-5 py-3 font-bold">
          <span>Totaal</span>
          <span>{totaal}</span>
        </div>
      )}

    </section>
  );
}

export default function ControlePagina({
  controleBestelling,
  opmerking,
  setOpmerking,
}: Props) {
  const {
    ijsBestelling,
    speciaalsmaken,
    slagroom,
    drooggoedBestelling,
    totaalIJs,
    totaalDrooggoed,
  } = controleBestelling;

  return (
    <div className="space-y-6">

      <Blok
        titel="🍦 Regulier ijs"
        kleur="bg-blue-700"
        totaal={totaalIJs}
      >
        {ijsBestelling.map((regel) => (
          <Regel
            key={regel.product.id}
            naam={regel.product.naam}
            aantal={regel.bestellen}
          />
        ))}
      </Blok>

      <Blok
        titel="⭐ Speciaalsmaken"
        kleur="bg-amber-500"
      >
        <Regel
          naam="Speciaalsmaken"
          aantal={
            speciaalsmaken?.bestellen ??
            0
          }
        />
      </Blok>

      <Blok
        titel="🍦 Slagroom"
        kleur="bg-sky-600"
      >
        <Regel
          naam="Slagroom"
          aantal={
            slagroom?.bestellen ?? 0
          }
        />
      </Blok>

      <Blok
        titel="📦 Drooggoed"
        kleur="bg-emerald-700"
        totaal={totaalDrooggoed}
      >
        {drooggoedBestelling.map(
          (regel) => (
            <Regel
              key={regel.product.id}
              naam={regel.product.naam}
              aantal={
                regel.bestellen
              }
            />
          )
        )}
      </Blok>

      <section className="rounded-xl border bg-white p-5">

        <label className="mb-2 block font-semibold">
          Opmerking
        </label>

        <textarea
          rows={4}
          value={opmerking}
          onChange={(e) =>
            setOpmerking(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Eventuele opmerking..."
        />

      </section>

    </div>
  );
}