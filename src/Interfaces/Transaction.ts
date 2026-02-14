/**
 * Fintrack - İşlem (gelir/gider) veri tipi
 * CRUD işlemlerinde kullanılacak ana model
 */
export type TransactionType = "income" | "expense";

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  note?: string;
  createdAt: string; // ISO datetime
}
