import type { ITransaction, ICategory } from "../Interfaces";
import { colorMap } from "./TransactionForm";

interface TransactionListProps {
  transactions: ITransaction[];
  categories: ICategory[];
  onEdit: (transaction: ITransaction) => void;
  onDelete: (id: string) => void;
}

/**
 * Görev LİSTELEME + tek satırda düzenle/sil aksiyonları
 * CRUD: Listeleme, Güncelleme (tetikleyici), Silme
 */
export default function TransactionList({
  transactions,
  categories,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const getCategory = (id: string) => categories.find((c) => c.id === id);
  const getColorClass = (color: string) =>
    colorMap[color] ?? "bg-slate-100 text-slate-800 border-slate-300";

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        Henüz işlem yok. Yukarıdan yeni işlem ekleyebilirsiniz.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">İşlem Listesi</h2>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-600">
        {transactions.map((t) => {
          const cat = getCategory(t.categoryId);
          const tagClass = cat ? getColorClass(cat.color) : "";
          return (
            <li
              key={t.id}
              className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-2 hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-100">{t.title}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`inline-flex rounded-full border px-1.5 py-0.5 text-xs font-medium ${tagClass}`}
                  >
                    {cat?.name ?? "Diğer"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t.date}</span>
                  {t.note && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[100px]" title={t.note}>
                      {t.note}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-semibold ${
                    t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} ₺{t.amount.toLocaleString("tr-TR")}
                </span>
                <button
                  type="button"
                  onClick={() => onEdit(t)}
                  className="rounded px-1.5 py-0.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  title="Düzenle"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(t.id)}
                  className="rounded px-1.5 py-0.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  title="Sil"
                >
                  Sil
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
