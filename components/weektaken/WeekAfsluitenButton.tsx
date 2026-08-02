"use client";

import { useState } from "react";

type Props = {
  weekId: string;
  afgesloten: boolean;
};

export default function WeekAfsluitenButton({
  weekId,
  afgesloten,
}: Props) {
  const [laden, setLaden] =
    useState(false);

  async function afsluiten() {
    if (afgesloten || laden) {
      return;
    }

    const akkoord = confirm(
      "Weet je zeker dat je deze week definitief wilt afsluiten?\n\nHierna kunnen geen taken meer worden gewijzigd."
    );

    if (!akkoord) {
      return;
    }

    setLaden(true);

    try {
      const res = await fetch(
        "/api/weektaken/afsluiten",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            weekId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      location.reload();
    } catch {
      alert(
        "Het afsluiten van de week is mislukt."
      );
      setLaden(false);
    }
  }

  if (afgesloten) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 px-5 py-3 font-semibold text-red-700">
        🔒 Deze week is afgesloten
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={afsluiten}
      disabled={laden}
      className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {laden
        ? "Week afsluiten..."
        : "🔒 Week afsluiten"}
    </button>
  );
}