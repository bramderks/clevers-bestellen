"use client";

import { weektakenNijmegen } from "@/data/weektaken/nijmegen";

export default function WeektakenPagina() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Weektaken
      </h1>

      {weektakenNijmegen.map((categorie) => (
        <div
          key={categorie.categorie}
          className="border rounded-xl p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">
            {categorie.categorie}
          </h2>

          <div className="space-y-3">
            {categorie.taken.map((taak) => (
              <label
                key={taak}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />

                <span>{taak}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}