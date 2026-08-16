interface Props {
  titel: string;
  omschrijving?: string;
  acties?: React.ReactNode;
}

export default function PageHeader({
  titel,
  omschrijving,
  acties,
}: Readonly<Props>) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          {titel}
        </h1>

        {omschrijving && (
          <p className="mt-2 max-w-2xl text-slate-500">
            {omschrijving}
          </p>
        )}

      </div>

      {acties && (
        <div className="flex flex-wrap gap-3">
          {acties}
        </div>
      )}

    </div>
  );
}