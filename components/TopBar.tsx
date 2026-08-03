import Link from "next/link";

interface Props {
  title?: string;
}

export default function TopBar({
  title = "Clevers Bestelsysteem",
}: Props) {
  return (
    <header className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between px-5 py-4">

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 hover:shadow-md active:scale-95"
        >
          <span>🏠</span>

          <span>
            Home
          </span>
        </Link>

        <div className="text-center">

          <h1 className="text-xl font-bold tracking-tight text-slate-800 md:text-2xl">
            {title}
          </h1>

          <p className="hidden text-sm text-slate-500 md:block">
            Clevers Bestelsysteem
          </p>

        </div>

        <div className="w-24" />

      </div>

    </header>
  );
}