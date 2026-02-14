import { useState, useMemo } from "react";
import type { ITransaction, ICategory } from "../Interfaces";
import TransactionForm from "../Components/TransactionForm";
import TransactionList from "../Components/TransactionList";
import StatCard from "../Components/StatCard";
import FilterBar from "../Components/FilterBar";
import SimpleChart from "../Components/SimpleChart";

interface DashboardProps {
  transactions: ITransaction[];
  categories: ICategory[];
  onAdd: (data: Omit<ITransaction, "id" | "createdAt">) => void;
  onUpdate: (id: string, updates: Partial<ITransaction>) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

/**
 * Fintrack ana sayfası: Dashboard
 * İstatistikler, grafik, filtreleme ve CRUD bileşenlerini bir araya getirir
 */
export default function Dashboard({
  transactions,
  categories,
  onAdd,
  onUpdate,
  onDelete,
  isDark,
  onToggleDark,
}: DashboardProps) {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);

  // Filtrelenmiş işlem listesi (listeleme + filtreleme özellikleri)
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];
    if (filterType !== "all") {
      list = list.filter((t) => t.type === filterType);
    }
    if (filterCategoryId) {
      list = list.filter((t) => t.categoryId === filterCategoryId);
    }
    // Tarihe göre yeniden eskiye
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list;
  }, [transactions, filterType, filterCategoryId]);

  // Dashboard istatistikleri (tüm işlemler üzerinden)
  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalExpense = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const balance = totalIncome - totalExpense;

  const handleUpdate = (id: string, updates: Partial<ITransaction>) => {
    onUpdate(id, updates);
    setEditingTransaction(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors flex flex-col">
      {/* Üst başlık + dark mode toggle - Tam sayfa genişliğinde */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors">
        <div className="relative flex items-center justify-center px-3 py-2">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent tracking-tight dark:from-blue-400 dark:via-blue-300 dark:to-emerald-400 drop-shadow-sm">
              💰 Fintrack
            </h1>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 tracking-wide">
              Kişisel Finans Takip Uygulaması
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleDark}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            title={isDark ? "Açık moda geç" : "Koyu moda geç"}
          >
            {isDark ? "☀️ Açık" : "🌙 Koyu"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-3 py-2 flex-1 overflow-y-auto">
        {/* Dashboard istatistikleri */}
        <section className="mb-2 grid gap-2 sm:grid-cols-3">
          <StatCard
            title="Toplam Gelir"
            value={`₺${totalIncome.toLocaleString("tr-TR")}`}
            variant="income"
          />
          <StatCard
            title="Toplam Gider"
            value={`₺${totalExpense.toLocaleString("tr-TR")}`}
            variant="expense"
          />
          <StatCard
            title="Bakiye"
            value={`₺${balance.toLocaleString("tr-TR")}`}
            variant="balance"
          />
        </section>

        {/* Filtreleme - kompakt tek satır */}
        <section className="mb-2">
          <FilterBar
            filterType={filterType}
            filterCategoryId={filterCategoryId}
            categories={categories}
            onTypeChange={setFilterType}
            onCategoryChange={setFilterCategoryId}
          />
        </section>

        {/* Grafik */}
        <section className="mb-2">
          <SimpleChart transactions={transactions} />
        </section>

        <div className="grid gap-2 lg:grid-cols-[300px_1fr]">
          {/* Sol: İşlem ekleme / düzenleme formu */}
          <aside>
            <TransactionForm
              categories={categories}
              onSubmit={onAdd}
              editTransaction={editingTransaction}
              onCancelEdit={() => setEditingTransaction(null)}
              onUpdate={handleUpdate}
            />
          </aside>

          {/* Sağ: İşlem listesi (Listeleme + Silme + Güncelleme tetikleyici) */}
          <section>
            <TransactionList
              transactions={filteredTransactions}
              categories={categories}
              onEdit={setEditingTransaction}
              onDelete={onDelete}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
