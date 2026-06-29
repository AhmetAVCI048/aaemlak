"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type Ilan,
  type IlanTipi,
  type Kategori,
  type IlanDurumu,
} from "@/lib/listings";
import {
  kategoriAgaci,
  cepheSecenekleri,
  icOzellikSecenekleri,
  disOzellikSecenekleri,
  manzaraSecenekleri,
} from "@/lib/categories";
import { supabaseTarayici } from "@/lib/supabase/client";
import Harita from "@/components/Harita";
import KategoriSecici from "./KategoriSecici";
import CokluSecim from "./CokluSecim";
import { ImageIcon, TrashIcon, LocationIcon } from "@/components/icons";

const ROZET_SECENEKLERI = ["Acil", "Fırsat", "Fiyat Düştü", "Yeni"];

type Medya = { url: string; file?: File };

/** Dosyayı Supabase deposuna yükler ve herkese açık URL'ini döner. */
async function medyaYukle(sb: SupabaseClient, file: File): Promise<string> {
  const uzanti = file.name.split(".").pop() ?? "bin";
  const ad = `${Date.now()}-${Math.random().toString(36).slice(2)}.${uzanti}`;
  const { error } = await sb.storage.from("ilan-medya").upload(ad, file, {
    cacheControl: "3600",
  });
  if (error) throw error;
  return sb.storage.from("ilan-medya").getPublicUrl(ad).data.publicUrl;
}

export default function IlanForm({ ilan }: { ilan?: Ilan }) {
  const router = useRouter();
  const duzenleme = Boolean(ilan);

  const [form, setForm] = useState({
    baslik: ilan?.baslik ?? "",
    aciklama: ilan?.aciklama ?? "",
    tip: (ilan?.tip ?? "satilik") as IlanTipi,
    kategori: (ilan?.kategori ?? "konut") as Kategori,
    altKategori: ilan?.altKategori ?? "Daire",
    durum: (ilan?.durum ?? "aktif") as IlanDurumu,
    fiyat: ilan?.fiyat?.toString() ?? "",
    il: ilan?.il ?? "Muğla",
    ilce: ilan?.ilce ?? "Bodrum",
    mahalle: ilan?.mahalle ?? "",
    odaSayisi: ilan?.odaSayisi ?? "",
    banyoSayisi: ilan?.banyoSayisi?.toString() ?? "",
    brutMetrekare: ilan?.brutMetrekare?.toString() ?? "",
    netMetrekare: ilan?.netMetrekare?.toString() ?? "",
    binaYasi: ilan?.binaYasi?.toString() ?? "",
    bulunduguKat: ilan?.bulunduguKat ?? "",
    katSayisi: ilan?.katSayisi?.toString() ?? "",
    isitma: ilan?.isitma ?? "",
    aidat: ilan?.aidat?.toString() ?? "",
    esyali: ilan?.esyali ?? false,
    krediyeUygun: ilan?.krediyeUygun ?? false,
  });
  const [rozetler, setRozetler] = useState<string[]>(ilan?.rozetler ?? []);
  const [gorseller, setGorseller] = useState<Medya[]>(
    (ilan?.gorseller ?? []).map((u) => ({ url: u }))
  );
  const [video, setVideo] = useState<Medya | null>(
    ilan?.video ? { url: ilan.video } : null
  );
  const [enlem, setEnlem] = useState<number | undefined>(ilan?.enlem);
  const [boylam, setBoylam] = useState<number | undefined>(ilan?.boylam);
  const [cephe, setCephe] = useState<string[]>(ilan?.cephe ?? []);
  const [icOzellikler, setIcOzellikler] = useState<string[]>(ilan?.icOzellikler ?? []);
  const [disOzellikler, setDisOzellikler] = useState<string[]>(ilan?.disOzellikler ?? []);
  const [manzara, setManzara] = useState<string[]>(ilan?.manzara ?? []);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const kategoriDegistir = (k: Kategori) =>
    setForm((f) => ({ ...f, kategori: k, altKategori: kategoriAgaci[k].turler[0] ?? "" }));

  const rozetDegistir = (r: string) =>
    setRozetler((list) =>
      list.includes(r) ? list.filter((x) => x !== r) : [...list, r]
    );

  const fotoEkle = (files: FileList | null) => {
    if (!files) return;
    const yeni = Array.from(files).map((f) => ({ url: URL.createObjectURL(f), file: f }));
    setGorseller((g) => [...g, ...yeni]);
  };
  const fotoSil = (url: string) => setGorseller((g) => g.filter((x) => x.url !== url));
  const kapakYap = (url: string) =>
    setGorseller((g) => {
      const secilen = g.find((x) => x.url === url);
      if (!secilen) return g;
      return [secilen, ...g.filter((x) => x.url !== url)];
    });
  const videoEkle = (files: FileList | null) => {
    if (files && files[0]) setVideo({ url: URL.createObjectURL(files[0]), file: files[0] });
  };

  const sayi = (v: string): number | null => (v.trim() === "" ? null : Number(v));

  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    setKaydediliyor(true);

    const sb = supabaseTarayici();
    if (!sb) {
      // Supabase yapılandırılmadıysa demo davranışı
      setTimeout(() => router.push("/admin/ilanlar"), 800);
      return;
    }

    try {
      // 1) Yeni dosyaları depoya yükle, mevcut URL'leri koru
      const gorselUrlleri: string[] = [];
      for (const g of gorseller) {
        gorselUrlleri.push(g.file ? await medyaYukle(sb, g.file) : g.url);
      }
      let videoUrl: string | null = video?.url ?? null;
      if (video?.file) videoUrl = await medyaYukle(sb, video.file);

      // 2) Satırı hazırla
      const satir = {
        baslik: form.baslik,
        aciklama: form.aciklama,
        fiyat: Number(form.fiyat) || 0,
        tip: form.tip,
        kategori: form.kategori,
        alt_kategori: form.altKategori || null,
        durum: form.durum,
        rozetler,
        il: form.il,
        ilce: form.ilce,
        mahalle: form.mahalle,
        oda_sayisi: form.odaSayisi || null,
        banyo_sayisi: sayi(form.banyoSayisi),
        brut_metrekare: sayi(form.brutMetrekare),
        net_metrekare: sayi(form.netMetrekare),
        bina_yasi: sayi(form.binaYasi),
        bulundugu_kat: form.bulunduguKat || null,
        kat_sayisi: sayi(form.katSayisi),
        isitma: form.isitma || null,
        aidat: sayi(form.aidat),
        esyali: form.esyali,
        krediye_uygun: form.krediyeUygun,
        cephe,
        ic_ozellikler: icOzellikler,
        dis_ozellikler: disOzellikler,
        manzara,
        gorseller: gorselUrlleri,
        video: videoUrl,
        enlem: enlem ?? null,
        boylam: boylam ?? null,
      };

      // 3) Ekle veya güncelle
      const sonuc = duzenleme
        ? await sb.from("ilanlar").update(satir).eq("id", ilan!.id)
        : await sb.from("ilanlar").insert(satir);
      if (sonuc.error) throw sonuc.error;

      router.push("/admin/ilanlar");
      router.refresh();
    } catch (err) {
      setHata("Kayıt sırasında hata: " + (err as Error).message);
      setKaydediliyor(false);
    }
  };

  const konutMu = form.kategori === "konut" || form.kategori === "gunluk";

  return (
    <form onSubmit={kaydet} className="pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-800">
          {duzenleme ? "İlanı Düzenle" : "Yeni İlan Ekle"}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Kategori */}
        <Kart baslik="Kategori Seçimi">
          <KategoriSecici
            kategori={form.kategori}
            tip={form.tip}
            altKategori={form.altKategori}
            onKategori={kategoriDegistir}
            onTip={(t) => set("tip", t)}
            onAltKategori={(a) => set("altKategori", a)}
          />
        </Kart>

        {/* Fotoğraflar */}
        <Kart baslik="Fotoğraflar">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gorseller.map((g, i) => (
              <div key={g.url} className="group relative aspect-square overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.url} alt="" className="h-full w-full object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-md bg-accent-500 px-2 py-0.5 text-xs font-bold text-brand-900">
                    Kapak
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => fotoSil(g.url)}
                  className="absolute right-1.5 top-1.5 rounded-md bg-red-600 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Fotoğrafı sil"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => kapakYap(g.url)}
                    className="absolute inset-x-1.5 bottom-1.5 rounded-md bg-brand-900/85 py-1.5 text-xs font-semibold text-white opacity-0 transition hover:bg-brand-900 group-hover:opacity-100"
                  >
                    Kapak Yap
                  </button>
                )}
              </div>
            ))}

            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 text-brand-400 transition hover:border-accent-400 hover:text-accent-600">
              <ImageIcon className="h-7 w-7" />
              <span className="text-xs font-medium">Fotoğraf Ekle</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => fotoEkle(e.target.files)} />
            </label>
          </div>
        </Kart>

        {/* Video */}
        <Kart baslik="Tanıtım Videosu">
          {video ? (
            <div className="space-y-3">
              <video src={video.url} controls className="max-h-64 w-full rounded-xl bg-black" />
              <button
                type="button"
                onClick={() => setVideo(null)}
                className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-500"
              >
                <TrashIcon className="h-4 w-4" />
                Videoyu kaldır
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 py-8 text-brand-400 transition hover:border-accent-400 hover:text-accent-600">
              <ImageIcon className="h-7 w-7" />
              <span className="text-sm font-medium">Video Yükle</span>
              <input type="file" accept="video/*" className="hidden" onChange={(e) => videoEkle(e.target.files)} />
            </label>
          )}
        </Kart>

        {/* Temel bilgiler */}
        <Kart baslik="Temel Bilgiler">
          <Alan label="İlan Başlığı *">
            <input required value={form.baslik} onChange={(e) => set("baslik", e.target.value)} className="filtre-input" />
          </Alan>

          <div className="grid gap-4 sm:grid-cols-2">
            <Alan label="Fiyat (₺) *">
              <input required type="number" value={form.fiyat} onChange={(e) => set("fiyat", e.target.value)} className="filtre-input" />
            </Alan>
            <Alan label="Durum *">
              <select value={form.durum} onChange={(e) => set("durum", e.target.value)} className="filtre-input">
                <option value="aktif">Aktif</option>
                <option value="rezerve">Rezerve</option>
                <option value="satildi">Satıldı</option>
              </select>
            </Alan>
          </div>

          <Alan label="Açıklama">
            <textarea value={form.aciklama} onChange={(e) => set("aciklama", e.target.value)} rows={5} className="filtre-input resize-y" />
          </Alan>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-brand-700">Rozetler</span>
            <div className="flex flex-wrap gap-2">
              {ROZET_SECENEKLERI.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => rozetDegistir(r)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    rozetler.includes(r)
                      ? "border-accent-500 bg-accent-500 text-brand-900"
                      : "border-brand-200 text-brand-600 hover:bg-brand-50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Kart>

        {/* Konum */}
        <Kart baslik="Konum">
          <div className="grid gap-4 sm:grid-cols-3">
            <Alan label="İl *">
              <input required value={form.il} onChange={(e) => set("il", e.target.value)} className="filtre-input" />
            </Alan>
            <Alan label="İlçe *">
              <input required value={form.ilce} onChange={(e) => set("ilce", e.target.value)} className="filtre-input" />
            </Alan>
            <Alan label="Mahalle">
              <input value={form.mahalle} onChange={(e) => set("mahalle", e.target.value)} className="filtre-input" />
            </Alan>
          </div>

          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-700">Harita Üzerinde Konum</span>
              {enlem !== undefined && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <LocationIcon className="h-3.5 w-3.5" /> İşaretlendi
                </span>
              )}
            </div>
            <div className="h-72 overflow-hidden rounded-xl border border-brand-200">
              <Harita
                enlem={enlem}
                boylam={boylam}
                secilebilir
                onSec={(lat, lng) => {
                  setEnlem(lat);
                  setBoylam(lng);
                }}
              />
            </div>
          </div>
        </Kart>

        {/* Özellikler */}
        <Kart baslik="Özellikler">
          <div className="grid gap-4 sm:grid-cols-3">
            {konutMu && (
              <>
                <Alan label="Oda Sayısı">
                  <input value={form.odaSayisi} onChange={(e) => set("odaSayisi", e.target.value)} className="filtre-input" />
                </Alan>
                <Alan label="Banyo Sayısı">
                  <input type="number" value={form.banyoSayisi} onChange={(e) => set("banyoSayisi", e.target.value)} className="filtre-input" />
                </Alan>
              </>
            )}
            <Alan label="Brüt m²">
              <input type="number" value={form.brutMetrekare} onChange={(e) => set("brutMetrekare", e.target.value)} className="filtre-input" />
            </Alan>
            <Alan label="Net m²">
              <input type="number" value={form.netMetrekare} onChange={(e) => set("netMetrekare", e.target.value)} className="filtre-input" />
            </Alan>
            {konutMu && (
              <>
                <Alan label="Bina Yaşı">
                  <input type="number" value={form.binaYasi} onChange={(e) => set("binaYasi", e.target.value)} className="filtre-input" />
                </Alan>
                <Alan label="Bulunduğu Kat">
                  <input value={form.bulunduguKat} onChange={(e) => set("bulunduguKat", e.target.value)} className="filtre-input" />
                </Alan>
                <Alan label="Kat Sayısı">
                  <input type="number" value={form.katSayisi} onChange={(e) => set("katSayisi", e.target.value)} className="filtre-input" />
                </Alan>
                <Alan label="Isıtma">
                  <input value={form.isitma} onChange={(e) => set("isitma", e.target.value)} className="filtre-input" />
                </Alan>
                <Alan label="Aidat (₺)">
                  <input type="number" value={form.aidat} onChange={(e) => set("aidat", e.target.value)} className="filtre-input" />
                </Alan>
              </>
            )}
          </div>

          {konutMu && (
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <input type="checkbox" checked={form.esyali} onChange={(e) => set("esyali", e.target.checked)} className="h-4 w-4 accent-accent-500" />
                Eşyalı
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <input type="checkbox" checked={form.krediyeUygun} onChange={(e) => set("krediyeUygun", e.target.checked)} className="h-4 w-4 accent-accent-500" />
                Krediye Uygun
              </label>
            </div>
          )}
        </Kart>

        {/* Detaylı özellikler */}
        <Kart baslik="Detaylı Özellikler">
          <div className="space-y-6">
            <CokluSecim baslik="Cephe" secenekler={cepheSecenekleri} secili={cephe} onChange={setCephe} />
            <CokluSecim baslik="Manzara" secenekler={manzaraSecenekleri} secili={manzara} onChange={setManzara} />
            <CokluSecim baslik="İç Özellikler" secenekler={icOzellikSecenekleri} secili={icOzellikler} onChange={setIcOzellikler} />
            <CokluSecim baslik="Dış Özellikler" secenekler={disOzellikSecenekleri} secili={disOzellikler} onChange={setDisOzellikler} />
          </div>
        </Kart>
      </div>

      {/* Sabit kaydet çubuğu */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-3">
          {hata && <span className="mr-auto text-sm font-medium text-red-600">{hata}</span>}
          <button
            type="button"
            onClick={() => router.push("/admin/ilanlar")}
            className="rounded-xl border border-brand-200 px-5 py-2.5 font-medium text-brand-700 transition hover:bg-brand-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={kaydediliyor}
            className="rounded-xl bg-accent-500 px-6 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {kaydediliyor ? "Kaydediliyor…" : duzenleme ? "Güncelle" : "Yayınla"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Kart({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 font-bold text-brand-800">{baslik}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Alan({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-700">{label}</label>
      {children}
    </div>
  );
}
