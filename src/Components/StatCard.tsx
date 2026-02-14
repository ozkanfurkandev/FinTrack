import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "income" | "expense" | "balance";
}

const variantStyles = {
  default: "bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100",
  income: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-200",
  expense: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200",
  balance: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200",
};

/**
 * Dashboard istatistik kartı
 * Gelir, gider, bakiye vb. göstermek için kullanılır
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={`rounded-lg border p-2.5 transition-colors ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium opacity-90">{title}</p>
          <p className="mt-0.5 text-lg font-bold">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs opacity-80">{subtitle}</p>}
        </div>
        {icon && <div className="text-xl opacity-70">{icon}</div>}
      </div>
    </div>
  );
}
