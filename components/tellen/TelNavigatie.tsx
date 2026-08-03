interface Props {
  stap: number;
  totaalStappen: number;
  controleStap: boolean;
  opslaanBezig: boolean;
  onVorige: () => void;
  onVolgende: () => void;
  onOpslaan: () => void;
}

export default function TelNavigatie({
  stap,
  totaalStappen,
  controleStap,
  opslaanBezig,
  onVorige,
  onVolgende,
  onOpslaan,
}: Props) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

      <button
        type="button"
        onClick={onVorige}
        disabled={stap === 0}
        className="w-full rounded-xl bg-slate-300 px-6 py-3 font-medium transition hover:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        ← Vorige
      </button>

      {!controleStap ? (
        <button
          type="button"
          onClick={onVolgende}
          className={`w-full rounded-xl px-6 py-3 font-medium text-white transition sm:w-auto ${
            stap === totaalStappen - 1
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {stap === totaalStappen - 1
            ? "Naar controle"
            : "Volgende →"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpslaan}
          disabled={opslaanBezig}
          className="w-full rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {opslaanBezig
            ? "Opslaan..."
            : "Opslaan + PDF"}
        </button>
      )}

    </div>
  );
}