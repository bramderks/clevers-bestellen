"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  ConfirmDialog,
} from "@/modules/shared/ui";

interface Props {
  id: string;
  naam: string;
}

export default function ProductDeleteDialog({
  id,
  naam,
}: Readonly<Props>) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function verwijderen() {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/producten/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Product kon niet worden verwijderd."
        );
      }

      setOpen(false);

      router.push("/producten");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="danger"
        loading={loading}
        onClick={() => setOpen(true)}
      >
        Verwijderen
      </Button>

      <ConfirmDialog
        open={open}
        titel="Product verwijderen"
        bericht={`Weet je zeker dat je "${naam}" wilt verwijderen?`}
        loading={loading}
        onBevestig={verwijderen}
        onAnnuleer={() => setOpen(false)}
      />
    </>
  );
}