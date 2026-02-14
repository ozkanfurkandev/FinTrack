import type { ITransaction } from "../Interfaces";

interface SimpleChartProps {
  transactions: ITransaction[];
  maxBarHeight?: number;
}

/**
 * Basit bar grafik - Gelir vs Gider karşılaştırması
 * Eğitim amaçlı; dış kütüphane kullanılmadan
 */
export default function SimpleChart({ transactions, maxBarHeight = 85 }: SimpleChartProps) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const max = Math.max(income, expense, 1);
  const incomeHeight = (income / max) * maxBarHeight;
  const expenseHeight = (expense / max) * maxBarHeight;

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 transition-colors">
      <h3 className="mb-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">Gelir / Gider Özeti</h3>
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="w-14 rounded-t-lg bg-emerald-500 dark:bg-emerald-600 transition-all"
            style={{ height: `${incomeHeight}px` }}
            title={`Gelir: ₺${income.toLocaleString("tr-TR")}`}
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Gelir</span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            ₺{income.toLocaleString("tr-TR")}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="w-14 rounded-t-lg bg-red-500 dark:bg-red-600 transition-all"
            style={{ height: `${expenseHeight}px` }}
            title={`Gider: ₺${expense.toLocaleString("tr-TR")}`}
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Gider</span>
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            ₺{expense.toLocaleString("tr-TR")}
          </span>
        </div>
      </div>
    </div>
  );
}
