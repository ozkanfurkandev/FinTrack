import type { ICategory } from "../Interfaces";

interface FilterBarProps {
  filterType: "all" | "income" | "expense";
  filterCategoryId: string;
  categories: ICategory[];
  onTypeChange: (type: "all" | "income" | "expense") => void;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * Filtreleme özellikleri: türe ve kategoriye göre filtre
 */
export default function FilterBar({
  filterType,
  filterCategoryId,
  categories,
  onTypeChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-2.5 py-1.5 transition-colors">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">Filtre:</span>
      <select
        value={filterType}
        onChange={(e) => onTypeChange(e.target.value as "all" | "income" | "expense")}
        className="flex-1 rounded border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none min-w-0"
      >
        <option value="all">Tümü</option>
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
      <select
        value={filterCategoryId}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="flex-1 rounded border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none min-w-0"
      >
        <option value="">Tüm kategoriler</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
