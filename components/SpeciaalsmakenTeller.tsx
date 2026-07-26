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
    <section className="bg-white rounded-xl shadow p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-5">
        Speciaalsmaken
      </h2>

      <div className="grid grid-cols-[1fr_70px_90px] md:grid-cols-[1fr_90px_140px] font-semibold border-b pb-2 mb-2 text-sm md:text-base">
        <div>Product</div>
        <div className="text-center">Buffer</div>
        <div className="text-center">Geteld</div>
      </div>

      <div className="space-y-1">
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
    </section>
  );
}