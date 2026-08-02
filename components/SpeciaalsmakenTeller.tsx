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
    <section className="rounded-xl bg-white p-4 shadow md:p-6">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          ⭐ Speciaalsmaken
        </h2>

        <p className="text-sm text-gray-500">
          Tel het totaal aantal bakken speciaalsmaken en de aanwezige slagroom.
        </p>
      </div>

      <div className="mb-3 grid grid-cols-[1fr_70px_90px] border-b pb-2 text-sm font-semibold md:grid-cols-[1fr_90px_140px] md:text-base">
        <div>Product</div>

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
          buffer={6}
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
        <strong>Let op:</strong> tel alleen de daadwerkelijk aanwezige voorraad.
        Aangebroken bakken worden volgens de vaste telafspraken verwerkt.
      </div>
    </section>
  );
}