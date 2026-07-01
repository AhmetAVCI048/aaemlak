-- =============================================================
-- AA Emlak — Migration 02
-- 1) Site ayarları (iletişim + Hakkımda içeriği) için tablo
-- 2) İlanlara kısa/anlamlı sıra numarası (ilan_no)
-- Supabase > SQL Editor > New query > bu dosyanın TAMAMINI yapıştır > Run
-- =============================================================

-- 1) AYARLAR TABLOSU (tek satır, JSON) ------------------------
create table if not exists public.ayarlar (
  id int primary key default 1,
  veri jsonb not null default '{}'::jsonb,
  constraint ayarlar_tek_satir check (id = 1)
);

insert into public.ayarlar (id, veri)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.ayarlar enable row level security;

drop policy if exists "ayarlar_select_herkes" on public.ayarlar;
create policy "ayarlar_select_herkes"
  on public.ayarlar for select using (true);

drop policy if exists "ayarlar_yaz_girisli" on public.ayarlar;
create policy "ayarlar_yaz_girisli"
  on public.ayarlar for all to authenticated
  using (true) with check (true);

-- 2) KISA İLAN NUMARASI (1001, 1002, ...) ---------------------
create sequence if not exists ilan_no_seq start 1001;

alter table public.ilanlar
  add column if not exists ilan_no bigint;

-- Mevcut ilanlara sıra numarası ata
update public.ilanlar
  set ilan_no = nextval('ilan_no_seq')
  where ilan_no is null;

-- Yeni ilanlar otomatik alsın + zorunlu + benzersiz olsun
alter table public.ilanlar
  alter column ilan_no set default nextval('ilan_no_seq');
alter table public.ilanlar
  alter column ilan_no set not null;

create unique index if not exists ilanlar_ilan_no_key
  on public.ilanlar (ilan_no);
