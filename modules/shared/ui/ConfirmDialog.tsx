"use client";

import Modal from "./Modal";
import Button from "./Button";

interface Props {
  open: boolean;
  titel: string;
  bericht: string;

  bevestigLabel?: string;
  annulerenLabel?: string;

  loading?: boolean;

  onBevestig: () => void;
  onAnnuleer: () => void;
}

export default function ConfirmDialog({
  open,
  titel,
  bericht,
  bevestigLabel = "Bevestigen",
  annulerenLabel = "Annuleren",
  loading = false,
  onBevestig,
  onAnnuleer,
}: Readonly<Props>) {
  return (
    <Modal
      open={open}
      titel={titel}
      onClose={onAnnuleer}
      grootte="sm"
    >
      <div className="space-y-8">

        <p className="text-slate-600">
          {bericht}
        </p>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onAnnuleer}
            disabled={loading}
          >
            {annulerenLabel}
          </Button>

          <Button
            variant="danger"
            onClick={onBevestig}
            loading={loading}
          >
            {bevestigLabel}
          </Button>

        </div>

      </div>
    </Modal>
  );
}