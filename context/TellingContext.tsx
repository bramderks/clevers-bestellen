"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import {
  maakLegeTelling,
  zetVoorraad,
  zetVestiging,
  zetDatum,
  zetMedewerker,
  VoorraadTelling,
} from "@/lib/voorraadState";

interface TellingContextType {
  telling: VoorraadTelling;

  setVestiging: (vestiging: "nijmegen" | "roermond") => void;
  setDatum: (datum: string) => void;
  setMedewerker: (naam: string) => void;

  setAantal: (productId: string, aantal: number) => void;

  reset: () => void;
}

const TellingContext = createContext<TellingContextType | null>(null);

export function TellingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [telling, setTelling] = useState(maakLegeTelling());

  const value = useMemo(
    () => ({
      telling,

      setVestiging: (vestiging: "nijmegen" | "roermond") =>
        setTelling((t) => zetVestiging(t, vestiging)),

      setDatum: (datum: string) =>
        setTelling((t) => zetDatum(t, datum)),

      setMedewerker: (naam: string) =>
        setTelling((t) => zetMedewerker(t, naam)),

      setAantal: (productId: string, aantal: number) =>
        setTelling((t) => zetVoorraad(t, productId, aantal)),

      reset: () => setTelling(maakLegeTelling()),
    }),
    [telling]
  );

  return (
    <TellingContext.Provider value={value}>
      {children}
    </TellingContext.Provider>
  );
}

export function useTelling() {
  const context = useContext(TellingContext);

  if (!context) {
    throw new Error(
      "useTelling moet binnen een TellingProvider worden gebruikt."
    );
  }

  return context;
}