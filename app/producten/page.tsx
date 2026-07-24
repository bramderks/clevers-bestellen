"use client";

import { producten } from "../../data/producten";

export default function ProductenPagina() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10">

          <h1 className="text-4xl font-bold mb-2">
            Productbeheer
          </h1>

          <p className="text-gray-500 mb-8">
            Beheer alle producten van het Clevers Bestelsysteem.
          </p>

          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">

              <thead className="bg-slate-100">
                <tr>

                  <th className="text-left p-3">
                    ID
                  </th>

                  <th className="text-left p-3">
                    Naam
                  </th>

                  <th className="text-left p-3">
                    Categorie
                  </th>

<th className="text-left p-3">
  Bestel bij
</th>

<th className="text-left p-3">
  Bestelgroep
</th>

                  <th className="text-center p-3">
                    Actief
                  </th>

                </tr>
              </thead>

              <tbody>

                {producten.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-3 font-mono text-sm">
                      {product.id}
                    </td>

                    <td className="p-3">
                      {product.naam}
                    </td>

                    <td className="p-3 capitalize">
                      {product.categorie}
                    </td>

<td className="p-3">
  {product.bestelBij}
</td>

                    <td className="text-center p-3">
                      {product.actief ? "✅" : "❌"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </main>
  );
}