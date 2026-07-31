"use client";

import { useEffect, useState } from "react";
import CategorieBlok from "@/components/weektaken/CategorieBlok";

type Props = {
  categorieen: {
    categorie: string;
    taken: any[];
  }[];
};

export default function WeektakenClient({
  categorieen,
}: Props) {
  const [allesOpen, setAllesOpen] =
    useState(true);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("weektaken-open", {
        detail: allesOpen,
      })
    );
  }, [allesOpen]);

  return (
    <>
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setAllesOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white"
        >
          ▼ Alles uitklappen
        </button>

        <button
          onClick={() => setAllesOpen(false)}
          className="rounded-lg bg-gray-700 px-5 py-2 font-semibold text-white"
        >
          ▶ Alles inklappen
        </button>
      </div>

      {categorieen.map((groep) => (
        <CategorieBlok
          key={groep.categorie}
          categorie={groep.categorie}
          taken={groep.taken}
        />
      ))}
    </>
  );
}