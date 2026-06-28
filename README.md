# AA Emlak — Ahmet Avcı Real Estate

Bodrum bölgesi için emlak ilan sitesi. Satılık/kiralık konut, villa, iş yeri ve arsa
ilanları; güçlü admin paneli, filtreli arama, harita konumu ve WhatsApp ile hızlı iletişim.

## Teknolojiler

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Leaflet + OpenStreetMap** (harita)
- Veritabanı/depolama: **Supabase** + **Cloudinary** (entegrasyon aşamasında)
- Yayın: **Vercel**

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
```

## Yapı

- `app/(public)/` — herkese açık site (anasayfa, ilanlar, ilan detayı, hakkımda, iletişim)
- `app/admin/` — yönetim paneli (ilan ekle/düzenle/sil, içerik & iletişim ayarları)
- `components/` — paylaşılan arayüz bileşenleri
- `lib/` — veri modeli, site ayarları ve içerik

> Not: İlan verileri şu an `lib/listings.ts` içinde örnek olarak tutuluyor;
> Supabase entegrasyonuyla kalıcı veritabanına taşınacaktır.
