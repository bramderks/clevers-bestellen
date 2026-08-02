import Link from "next/link";

type TopBarProps = {
  title?: string;
};

export default function TopBar({
  title = "Clevers Bestelsysteem",
}: TopBarProps) {
  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
      >
        <span className="text-lg">🏠</span>
        <span>Home</span>
      </Link>

      <h1 className="text-xl font-bold tracking-tight text-slate-800 md:text-2xl">
        {title}
      </h1>

      <div className="w-[98px]" />
    </header>
  );
}