import { useState, useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import type { ITransaction, ICategory } from "./Interfaces";

// Dark mode: localStorage + sistem tercihi ile başlangıç değeri
function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("fintrack-theme");
  if (stored === "dark" || stored === "light") return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Varsayılan kategoriler (renkli etiketler)
const DEFAULT_CATEGORIES: ICategory[] = [
  { id: "cat-1", name: "Maaş", color: "emerald", type: "income" },
  { id: "cat-2", name: "Freelance", color: "blue", type: "income" },
  { id: "cat-3", name: "Yatırım", color: "violet", type: "income" },
  { id: "cat-4", name: "Market", color: "amber", type: "expense" },
  { id: "cat-5", name: "Ulaşım", color: "orange", type: "expense" },
  { id: "cat-6", name: "Fatura", color: "red", type: "expense" },
  { id: "cat-7", name: "Eğlence", color: "pink", type: "expense" },
];

// Örnek başlangıç verisi (eğitim amaçlı)
const getInitialTransactions = (): ITransaction[] => {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      id: "t1",
      title: "Aylık maaş",
      amount: 25000,
      type: "income",
      categoryId: "cat-1",
      date: today,
      note: "Şubat maaşı",
      createdAt: new Date().toISOString(),
    },
    {
      id: "t2",
      title: "Market alışverişi",
      amount: 450,
      type: "expense",
      categoryId: "cat-4",
      date: today,
      createdAt: new Date().toISOString(),
    },
  ];
};

function App() {
  // State yönetimi: React hook'ları ile (useState)
  const [transactions, setTransactions] = useState<ITransaction[]>(getInitialTransactions);
  const [categories] = useState<ICategory[]>(DEFAULT_CATEGORIES);
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Dark mode: html'e "dark" sınıfı ekle / kaldır ve tercihi sakla
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("fintrack-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // CRUD: Ekleme
  const handleAddTransaction = (transaction: Omit<ITransaction, "id" | "createdAt">) => {
    const newTransaction: ITransaction = {
      ...transaction,
      id: `t-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // CRUD: Güncelleme
  const handleUpdateTransaction = (id: string, updates: Partial<ITransaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  // CRUD: Silme
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Dashboard
      transactions={transactions}
      categories={categories}
      onAdd={handleAddTransaction}
      onUpdate={handleUpdateTransaction}
      onDelete={handleDeleteTransaction}
      isDark={isDark}
      onToggleDark={() => setIsDark((d) => !d)}
    />
  );
}

export default App;
