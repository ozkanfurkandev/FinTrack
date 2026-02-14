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

## Netlify ile Yayına Alma

1. Projeyi GitHub’da **public** bir repoya yükleyin.
2. [Netlify](https://netlify.com) → **Add new site** → **Import an existing project**.
3. Repoyu seçin; build ayarları otomatik okunur:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy** ile yayına alın.

`netlify.toml` dosyası projede tanımlıdır; SPA yönlendirmesi bu dosyadan uygulanır.

## Ekran Görüntüsü

Aşağıda uygulamanın ana ekranı (Dashboard) yer almaktadır: istatistik kartları, gelir/gider grafiği, filtre alanı, işlem ekleme formu ve işlem listesi görünmektedir.

![Fintrack Dashboard](docs/screenshot.png)

> **Not:** Ekran görüntüsü projeyi çalıştırdıktan sonra `docs/screenshot.png` olarak eklenebilir. Yayın öncesi `npm run dev` ile uygulamayı açıp bir ekran görüntüsü alıp bu dosyayı güncelleyebilirsiniz.

## Teknolojiler

- **React 18** + **TypeScript**
- **Vite** – Build aracı (Netlify uyumlu)
- **Tailwind CSS 4** – Stil
- State yönetimi: **React hooks** (useState, useMemo, useEffect)

## Lisans

MIT
