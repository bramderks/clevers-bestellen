"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPagina() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);

  async function aanmelden(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFout("");
    setBezig(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, wachtwoord }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setFout(data.error ?? "Inloggen is niet gelukt.");
        return;
      }
      const bestemming = searchParams.get("next");
      router.replace(bestemming && bestemming.startsWith("/") && !bestemming.startsWith("//") ? bestemming : "/");
      router.refresh();
    } catch {
      setFout("Inloggen is momenteel niet mogelijk. Controleer je verbinding en probeer opnieuw.");
    } finally {
      setBezig(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Clevers Bestellen</h1>
          <p className="mt-2 text-sm text-slate-500">Log in met je Clevers ERP-account</p>
        </div>
        <form className="space-y-5" onSubmit={aanmelden}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">E-mailadres</label>
            <input id="email" type="email" name="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="wachtwoord" className="mb-1 block text-sm font-medium text-slate-700">Wachtwoord</label>
            <input id="wachtwoord" type="password" name="wachtwoord" autoComplete="current-password" required value={wachtwoord} onChange={(e) => setWachtwoord(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-500" />
          </div>
          {fout && <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{fout}</div>}
          <button type="submit" disabled={bezig} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {bezig ? "Bezig met inloggen..." : "Inloggen"}
          </button>
        </form>
        <div className="mt-8 border-t pt-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Iselto B.V.</div>
        <div className="mt-2 text-center text-xs text-slate-400"><Link href="/">Terug naar startscherm</Link></div>
      </div>
    </main>
  );
}
