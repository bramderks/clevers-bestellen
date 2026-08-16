interface Props {
  children: React.ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";
}

const styles = {
  default:
    "bg-slate-100 text-slate-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-amber-100 text-amber-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",
};

export default function Badge({
  children,
  variant = "default",
}: Readonly<Props>) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}