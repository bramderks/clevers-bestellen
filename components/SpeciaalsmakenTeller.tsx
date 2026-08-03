"use client";

import TelRij from "./TelRij";

interface Props {
  waarde: number;
  onChange: (waarde: number) => void;
  slagroom: number;
  onSlagroomChange: (waarde: number) => void;
}

export default function SpeciaalsmakenTeller({
  waarde,
  onChange,
  slagroom,
  onSlagroomChange,
}: Props) {
  return (
    <section className="rounded-xl bg-white p-5 shadow">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          ⭐ Speciaalsmaken
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Tel alleen het totaal aantal bakken speciaalsmaken en de aanwezige slagroom.
        </p>

      </div>

      <div className="mb-3 grid grid-cols-[1fr_60px_152px] border-b pb-2 text-sm font-semibold md:grid-cols-[1fr_90px_190px]">

        <div>
          Product
        </div>

        <div className="text-center">
          Buffer
        </div>

        <div className="text-center">
          Geteld
        </div>

      </div>

      <div className="space-y-2">

        <TelRij
          naam="Speciaalsmaken"
          buffer={12}
          aantal={waarde}
          onChange={onChange}
        />

        <TelRij
          naam="Slagroom"
          buffer={1}
          aantal={slagroom}
          onChange={onSlagroomChange}
        />

      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">

        <strong>Let op:</strong><br />

        • Tel alleen het totaal aantal bakken speciaalsmaken.<br />
        • Losse smaken worden niet afzonderlijk geteld.<br />
        • Slagroom wordt apart geregistreerd.

      </div>

    </section>
  );
}