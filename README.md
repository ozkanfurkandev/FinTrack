# Fintrack - Kişisel Finans Takip Uygulaması

React (TypeScript) ile geliştirilmiş, gelir/gider takibi yapan modern bir web uygulaması. Netlify ile tek tıkla yayına alınabilir.

## Özellikler

- **Gelir / Gider takibi** – İşlem ekleme, listeleme, güncelleme ve silme (CRUD)
- **Kategoriler ve renkli etiketler** – Maaş, Market, Ulaşım, Fatura vb.
- **Dashboard istatistikleri** – Toplam gelir, gider ve bakiye kartları
- **Grafik** – Gelir / Gider karşılaştırma çubuğu
- **Filtreleme** – Türe (gelir/gider) ve kategoriye göre filtre
- **Modern arayüz** – Tailwind CSS ile responsive tasarım

## Proje Yapısı

```
src/
├── Components/     # Yeniden kullanılabilir bileşenler
│   ├── TransactionForm.tsx   # Ekleme + Güncelleme formu
│   ├── TransactionList.tsx   # Listeleme + Silme/Düzenle aksiyonları
│   ├── StatCard.tsx          # İstatistik kartı
│   ├── FilterBar.tsx         # Filtre alanları
│   └── SimpleChart.tsx       # Gelir/Gider grafiği
├── Pages/
│   └── Dashboard.tsx        # Ana sayfa (dashboard)
├── Interfaces/              # TypeScript arayüzleri
│   ├── Transaction.ts
│   ├── Category.ts
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Gereksinimler

- Node.js 18+
- npm veya yarn

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (http://localhost:5173)
npm run dev

# Production build
npm run build

# Build önizlemesi
npm run preview
```


## Ekran Görüntüsü

Aşağıda uygulamanın ana ekranı (Dashboard) yer almaktadır: istatistik kartları, gelir/gider grafiği, filtre alanı, işlem ekleme formu ve işlem listesi görünmektedir.

![Fintrack Dashboard](docs/screenshot.png)<img width="905" height="790" alt="FinTrack-NormalMod" src="https://github.com/user-attachments/assets/6e902cd8-556b-47bb-b30a-6fcdfb280fbd" /><img width="903" height="785" alt="FinTrack-DarkMod" src="https://github.com/user-attachments/assets/d4d4dc96-482e-45b1-859b-f224c7453c84" />
<img width="905" height="790" alt="FinTrack-Categories" src="https://github.com/user-attachments/assets/8924190c-b1d5-4976-b830-94d164479f27" /><img width="905" height="790" alt="FinTrack-GelirGider" src="https://github.com/user-attachments/assets/5de9869b-5cc5-4401-92c2-8622bca9c442" /><img width="905" height="790" alt="FinTrack-Edit" src="https://github.com/user-attachments/assets/806ed538-c2db-42d3-981d-db74455be84b" />

## Teknolojiler

- **React 18** + **TypeScript**
- **Vite** – Build aracı (Netlify uyumlu)
- **Tailwind CSS 4** – Stil
- State yönetimi: **React hooks** (useState, useMemo, useEffect)

## Lisans

MIT
