import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  success:
    "bg-green-600 text-white hover:bg-green-700",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}: Readonly<Props>) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {loading ? "Bezig..." : children}
    </button>
  );
}