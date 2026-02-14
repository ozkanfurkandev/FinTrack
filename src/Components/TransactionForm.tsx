import { useState, useEffect } from "react";
import type { ITransaction, ICategory } from "../Interfaces";

interface TransactionFormProps {
  categories: ICategory[];
  onSubmit: (data: Omit<ITransaction, "id" | "createdAt">) => void;
  /** Güncelleme modunda doldurulacak işlem */
  editTransaction?: ITransaction | null;
  onCancelEdit?: () => void;
  onUpdate?: (id: string, updates: Partial<ITransaction>) => void;
}

// Kategori rengini Tailwind sınıfına çevir (etiketler için; light + dark mode)
const colorMap: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700",
  blue: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700",
  violet: "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-900/40 dark:text-violet-200 dark:border-violet-700",
  amber: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700",
  orange: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700",
  red: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700",
  pink: "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900/40 dark:text-pink-200 dark:border-pink-700",
};

/**
 * Görev EKLEME ve GÜNCELLEME formu
 * Tek component ile hem yeni işlem hem düzenleme yapılır
 */
export default function TransactionForm({
  categories,
  onSubmit,
  editTransaction,
  onCancelEdit,
  onUpdate,
}: TransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  // Düzenleme modunda form alanlarını doldur
  useEffect(() => {
    if (editTransaction) {
      setTitle(editTransaction.title);
      setAmount(String(editTransaction.amount));
      setType(editTransaction.type);
      setCategoryId(editTransaction.categoryId);
      setDate(editTransaction.date);
      setNote(editTransaction.note ?? "");
    } else {
      setTitle("");
      setAmount("");
      setType("expense");
      setCategoryId(categories.find((c) => c.type === "expense")?.id ?? "");
      setDate(new Date().toISOString().slice(0, 10));
      setNote("");
    }
  }, [editTransaction, categories]);

  // Tip değişince kategori listesini uyumlu yap (geçerli kategori yoksa ilkini seç)
  const filteredCategories = categories.filter((c) => c.type === type);
  useEffect(() => {
    const filtered = categories.filter((c) => c.type === type);
    if (filtered.length > 0 && !filtered.some((c) => c.id === categoryId)) {
      setCategoryId(filtered[0].id);
    }
  }, [type, categories, categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0 || !categoryId) return;

    if (editTransaction && onUpdate) {
      onUpdate(editTransaction.id, {
        title: title.trim(),
        amount: numAmount,
        type,
        categoryId,
        date,
        note: note.trim() || undefined,
      });
      onCancelEdit?.();
    } else {
      onSubmit({
        title: title.trim(),
        amount: numAmount,
        type,
        categoryId,
        date,
        note: note.trim() || undefined,
      });
    }
    setTitle("");
    setAmount("");
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 shadow-sm transition-colors"
    >
      <h2 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {editTransaction ? "İşlemi Düzenle" : "Yeni İşlem Ekle"}
      </h2>
      <div className="space-y-2">
        <div>
          <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Market alışverişi"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 px-2 py-1.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Tutar (₺)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 px-2 py-1.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Tür</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
            >
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
            </select>
          </div>
          <div>
            <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Kategori</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
            >
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-0.5 block text-xs font-medium text-slate-600 dark:text-slate-300">Not (isteğe bağlı)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Kısa not..."
            className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 px-2 py-1.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            {editTransaction ? "Güncelle" : "Ekle"}
          </button>
          {editTransaction && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              İptal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export { colorMap };
