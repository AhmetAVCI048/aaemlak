-- =============================================================
-- AA Emlak — Supabase veritabanı kurulumu
-- Supabase panelinde: SQL Editor > New query > bu dosyanın TAMAMINI yapıştır > Run
-- =============================================================

-- 1) İLANLAR TABLOSU ------------------------------------------
create table if not exists public.ilanlar (
  id uuid primary key default gen_random_uuid(),
  baslik text not null,
  aciklama text default '',
  fiyat numeric not null default 0,
  tip text not null default 'satilik',          -- satilik | kiralik
  kategori text not null default 'konut',        -- konut | isyeri | arsa | gunluk
  alt_kategori text,                             -- Daire, Villa, Müstakil Ev...
  durum text not null default 'aktif',           -- aktif | rezerve | satildi
  rozetler text[] default '{}',

  il text default '',
  ilce text default '',
  mahalle text default '',

  oda_sayisi text,
  banyo_sayisi int,
  brut_metrekare int,
  net_metrekare int,
  bina_yasi int,
  bulundugu_kat text,
  kat_sayisi int,
  isitma text,
  aidat int,
  esyali boolean,
  krediye_uygun boolean,

  cephe text[] default '{}',
  ic_ozellikler text[] default '{}',
  dis_ozellikler text[] default '{}',
  manzara text[] default '{}',

  gorseller text[] default '{}',
  video text,
  enlem double precision,
  boylam double precision,

  olusturma_tarihi timestamptz not null default now()
);

-- Sıralama/filtreleme için faydalı indeksler
create index if not exists ilanlar_tarih_idx on public.ilanlar (olusturma_tarihi desc);
create index if not exists ilanlar_kategori_idx on public.ilanlar (kategori);
create index if not exists ilanlar_tip_idx on public.ilanlar (tip);

-- 2) GÜVENLİK (RLS) -------------------------------------------
-- Herkes ilanları OKUYABİLİR; sadece giriş yapmış admin EKLE/GÜNCELLE/SİL yapabilir.
alter table public.ilanlar enable row level security;

drop policy if exists "ilanlar_select_herkes" on public.ilanlar;
create policy "ilanlar_select_herkes"
  on public.ilanlar for select
  using (true);

drop policy if exists "ilanlar_yaz_girisli" on public.ilanlar;
create policy "ilanlar_yaz_girisli"
  on public.ilanlar for all
  to authenticated
  using (true)
  with check (true);

-- 3) FOTOĞRAF / VİDEO DEPOSU ----------------------------------
-- "ilan-medya" adında herkese açık (okunabilir) bir depo (bucket) oluşturur.
insert into storage.buckets (id, name, public)
values ('ilan-medya', 'ilan-medya', true)
on conflict (id) do nothing;

-- Depo kuralları: herkes okur, giriş yapmış admin yükler/siler.
drop policy if exists "medya_select_herkes" on storage.objects;
create policy "medya_select_herkes"
  on storage.objects for select
  using (bucket_id = 'ilan-medya');

drop policy if exists "medya_yaz_girisli" on storage.objects;
create policy "medya_yaz_girisli"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'ilan-medya')
  with check (bucket_id = 'ilan-medya');

-- 4) ÖRNEK İLANLAR (site boş görünmesin diye) -----------------
insert into public.ilanlar
  (baslik, aciklama, fiyat, tip, kategori, alt_kategori, durum, rozetler,
   il, ilce, mahalle, oda_sayisi, banyo_sayisi, brut_metrekare, net_metrekare,
   bina_yasi, bulundugu_kat, kat_sayisi, isitma, aidat, esyali, krediye_uygun,
   cephe, ic_ozellikler, dis_ozellikler, manzara, gorseller, enlem, boylam)
values
  ('Bodrum Yalıkavak''ta Deniz Manzaralı Lüks 3+1 Villa',
   'Yalıkavak''ta, denize yürüme mesafesinde, full deniz manzaralı, özel havuzlu lüks villa. Geniş teras, ankastre mutfak ve kapalı otopark mevcuttur.',
   18500000, 'satilik', 'konut', 'Villa', 'aktif', array['Fırsat'],
   'Muğla', 'Bodrum', 'Yalıkavak', '3+1', 3, 220, 190, 1, 'Müstakil', 2,
   'Yerden Isıtma', 0, false, true,
   array['Güney','Batı'], array['Ankastre Mutfak','Klima','Ebeveyn Banyosu','Şömine'],
   array['Açık Yüzme Havuzu','Bahçe','Güvenlik','Kapalı Otopark'], array['Deniz'],
   array['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
         'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80'],
   37.1080, 27.2870),

  ('Bodrum Merkezde Eşyalı Kiralık 2+1 Daire',
   'Bodrum merkezde, çarşıya yakın, yeni binada eşyalı ve kullanıma hazır 2+1 daire.',
   35000, 'kiralik', 'konut', 'Daire', 'aktif', array['Acil'],
   'Muğla', 'Bodrum', 'Merkez', '2+1', 1, 95, 85, 5, '3. Kat', 5,
   'Klima', 750, true, false,
   array['Doğu'], array['Beyaz Eşya','Klima','Çelik Kapı'],
   array['Asansör'], array['Şehir'],
   array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
   37.0344, 27.4305),

  ('Gümüşlük''te Doğayla İç İçe Müstakil 4+1 Ev',
   'Gümüşlük''te, sakin bir konumda, bahçeli müstakil ev. Yatırım ve oturum için ideal.',
   9750000, 'satilik', 'konut', 'Müstakil Ev', 'aktif', array[]::text[],
   'Muğla', 'Bodrum', 'Gümüşlük', '4+1', 2, 180, 160, 7, 'Müstakil', 2,
   'Doğalgaz (Kombi)', 0, false, true,
   array['Güney'], array['Şömine','Ankastre Mutfak'],
   array['Bahçe','Açık Otopark'], array['Doğa'],
   array['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80'],
   37.0510, 27.2360);
