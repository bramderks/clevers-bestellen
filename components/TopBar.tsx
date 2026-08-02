import Link from "next/link";

type TopBarProps = {
  title?: string;
};

export default function TopBar({
  title = "Clevers Bestelsysteem",
}: TopBarProps) {
  return (
    <header className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md active:scale-95"
        >
          <span className="text-base">🏠</span>
          <span>Home</span>
        </Link>

        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight text-slate-800 md:text-2xl">
            {title}
          </h1>

          <p className="hidden text-xs text-slate-500 md:block">
            Clevers Bestelsysteem
          </p>
        </div>

        <div className="w-[92px]" />
      </div>
    </header>
  );
}