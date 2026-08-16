import type { ReactNode } from "react";

interface Props {
  titel?: string;
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
}

const styles = {
  info: {
    wrapper: "border-blue-200 bg-blue-50",
    title: "text-blue-800",
    text: "text-blue-700",
  },
  success: {
    wrapper: "border-green-200 bg-green-50",
    title: "text-green-800",
    text: "text-green-700",
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50",
    title: "text-amber-800",
    text: "text-amber-700",
  },
  danger: {
    wrapper: "border-red-200 bg-red-50",
    title: "text-red-800",
    text: "text-red-700",
  },
};

export default function Alert({
  titel,
  children,
  variant = "info",
}: Readonly<Props>) {
  const style = styles[variant];

  return (
    <div
      className={`rounded-xl border px-5 py-4 ${style.wrapper}`}
    >
      {titel && (
        <h3 className={`mb-2 font-semibold ${style.title}`}>
          {titel}
        </h3>
      )}

      <div className={`text-sm ${style.text}`}>
        {children}
      </div>
    </div>
  );
}