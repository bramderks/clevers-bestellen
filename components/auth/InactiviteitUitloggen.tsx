"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const INACTIVITEIT_MS = 5 * 60 * 1000;

export default function InactiviteitUitloggen() {
  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let uitgelogd = false;

    const uitloggen = async () => {
      if (uitgelogd) return;
      uitgelogd = true;

      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
        });
      } catch {
        // Ook bij een tijdelijke netwerkfout naar het inlogscherm navigeren.
      } finally {
        router.replace("/login?reden=inactiviteit");
        router.refresh();
      }
    };

    const resetTimer = () => {
      if (uitgelogd) return;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        void uitloggen();
      }, INACTIVITEIT_MS);
    };

    const activiteiten = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ] as const;

    activiteiten.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );
    resetTimer();

    return () => {
      clearTimeout(timeout);
      activiteiten.forEach((event) =>
        window.removeEventListener(event, resetTimer),
      );
    };
  }, [router]);

  return null;
}
