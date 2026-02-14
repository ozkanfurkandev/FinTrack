/**
 * Fintrack - Kategori modeli
 * Renkli etiketler ve filtreleme için kullanılır
 */
export interface ICategory {
  id: string;
  name: string;
  color: string; // Tailwind/hex renk kodu
  type: "income" | "expense";
}
