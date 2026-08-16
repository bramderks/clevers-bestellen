interface Props {
  tekst?: string;
}

export default function Loading({
  tekst = "Laden...",
}: Readonly<Props>) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

      <p className="mt-6 text-sm text-slate-500">
        {tekst}
      </p>

    </div>
  );
}