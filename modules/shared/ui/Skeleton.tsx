interface Props {
  regels?: number;
}

export default function Skeleton({
  regels = 3,
}: Readonly<Props>) {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 h-6 w-1/3 rounded bg-slate-200" />

      <div className="space-y-4">

        {Array.from({ length: regels }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-slate-200"
          />
        ))}

      </div>

    </div>
  );
}