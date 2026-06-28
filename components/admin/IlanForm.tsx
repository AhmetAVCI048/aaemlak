"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  type Ilan,
  type IlanTipi,
  type Kategori,
  type IlanDurumu,
  kategoriEtiketleri,
} from "@/lib/listings";
import Harita from "@/components/Harita";
import { ImageIcon, TrashIcon, LocationIcon } from "@/components/icons";

const ROZET_SECENEKLERI = ["Acil", "Fırsat", "Fiyat Düştü", "Yeni"];

export default function IlanForm({ ilan }: { ilan?: Ilan }) {
  const router = useRouter();
  const duzenleme = Boolean(ilan);

  const [form, setForm] = useState({
    baslik: ilan?.baslik ?? "",
    aciklama: ilan?.aciklama ?? "",
    tip: (ilan?.tip ?? "satilik") as IlanTipi,
    kategori: (ilan?.kategori ?? "konut") as Kategori,
    durum: (ilan?.durum ?? "aktif") as IlanDurumu,
    fiyat: ilan?.fiyat?.toString() ?? "",
    il: ilan?.il ?? "",
    ilce: ilan?.ilce ?? "",
    mahalle: ilan?.mahalle ?? "",
    odaSayisi: ilan?.odaSayisi ?? "",
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
  const [gorseller, setGorseller] = useState<string[]>(ilan?.gorseller ?? []);
  const [video, setVideo] = useState<string>(ilan?.video ?? "");
  const [enlem, setEnlem] = useState<number | undefined>(ilan?.enlem);
  const [boylam, setBoylam] = useState<number | undefined>(ilan?.boylam);
  const [kaydedildi, setKaydedildi] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const rozetDegistir = (r: string) =>
    setRozetler((list) =>
      list.includes(r) ? list.filter((x) => x !== r) : [...list, r]
    );

  // Fotoğraf seçimi — şimdilik tarayıcıda önizleme. Supabase/Cloudinary bağlanınca
  // dosyalar gerçekten yüklenecek.
  const fotoEkle = (files: FileList | null) => {
    if (!files) return;
    const yeni = Array.from(files).map((f) => URL.createObjectURL(f));
    setGorseller((g) => [...g, ...yeni]);
  };

  const fotoSil = (url: string) =>
    setGorseller((g) => g.filter((x) => x !== url));

  // Seçilen fotoğrafı listenin başına alır → kapak yapar.
  const kapakYap = (url: string) =>
    setGorseller((g) => [url, ...g.filter((x) => x !== url)]);

  const videoEkle = (files: FileList | null) => {
    if (files && files[0]) setVideo(URL.createObjectURL(files[0]));
  };

  const kaydet = (e: React.FormEvent) => {
    e.preventDefault();
    // DEMO: gerçek kayıt Supabase bağlanınca yapılacak. Şimdilik onay gösteriyoruz.
    console.log("Kaydedilecek ilan:", {
      ...form,
      rozetler,
      gorseller,
      video,
      enlem,
      boylam,
    });
    setKaydedildi(true);
    setTimeout(() => router.push("/admin/ilanlar"), 1200);
  };

  return (
    <form onSubmit={kaydet} className="pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-800">
          {duzenleme ? "İlanı Düzenle" : "Yeni İlan Ekle"}
        </h1>
        <p className="text-sm text-brand-500">
          Alanları doldurun, en altta kaydedin. Yıldızlı (*) alanlar zorunludur.
        </p>
      </div>

      <div className="space-y-6">
        {/* Fotoğraflar */}
        <Kart baslik="Fotoğraflar" ipucu="İlk fotoğraf kapak olarak kullanılır. Net ve aydınlık fotoğraflar daha çok ilgi çeker.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gorseller.map((g, i) => (
              <div key={g} className="group relative aspect-square overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
                <Image src={g} alt="" fill sizes="160px" className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-md bg-accent-500 px-2 py-0.5 text-xs font-bold text-brand-900">
                    Kapak
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => fotoSil(g)}
                  className="absolute right-1.5 top-1.5 rounded-md bg-red-600 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Fotoğrafı sil"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => kapakYap(g)}
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
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => fotoEkle(e.target.files)}
              />
            </label>
          </div>
        </Kart>

        {/* Video */}
        <Kart baslik="Tanıtım Videosu" ipucu="İsteğe bağlı. Kısa bir gezinti videosu ilgiyi ciddi şekilde artırır.">
          {video ? (
            <div className="space-y-3">
              <video src={video} controls className="max-h-64 w-full rounded-xl bg-black" />
              <button
                type="button"
                onClick={() => setVideo("")}
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
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => videoEkle(e.target.files)}
              />
            </label>
          )}
        </Kart>

        {/* Temel bilgiler */}
        <Kart baslik="Temel Bilgiler">
          <Alan label="İlan Başlığı *">
            <input
              required
              value={form.baslik}
              onChange={(e) => set("baslik", e.target.value)}
              placeholder="örn. Deniz Manzaralı Lüks 3+1 Daire"
              className="filtre-input"
            />
          </Alan>

          <div className="grid gap-4 sm:grid-cols-3">
            <Alan label="İlan Tipi *">
              <select value={form.tip} onChange={(e) => set("tip", e.target.value)} className="filtre-input">
                <option value="satilik">Satılık</option>
                <option value="kiralik">Kiralık</option>
              </select>
            </Alan>
            <Alan label="Kategori *">
              <select value={form.kategori} onChange={(e) => set("kategori", e.target.value)} className="filtre-input">
                {(Object.keys(kategoriEtiketleri) as Kategori[]).map((k) => (
                  <option key={k} value={k}>{kategoriEtiketleri[k]}</option>
                ))}
              </select>
            </Alan>
            <Alan label="Durum *">
              <select value={form.durum} onChange={(e) => set("durum", e.target.value)} className="filtre-input">
                <option value="aktif">Aktif</option>
                <option value="rezerve">Rezerve</option>
                <option value="satildi">Satıldı</option>
              </select>
            </Alan>
          </div>

          <Alan label="Fiyat (₺) *">
            <input
              required
              type="number"
              value={form.fiyat}
              onChange={(e) => set("fiyat", e.target.value)}
              placeholder="örn. 8500000"
              className="filtre-input"
            />
          </Alan>

          <Alan label="Açıklama">
            <textarea
              value={form.aciklama}
              onChange={(e) => set("aciklama", e.target.value)}
              rows={5}
              placeholder="Evin öne çıkan özelliklerini, çevresini ve avantajlarını yazın…"
              className="filtre-input resize-y"
            />
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
              <input required value={form.il} onChange={(e) => set("il", e.target.value)} placeholder="İzmir" className="filtre-input" />
            </Alan>
            <Alan label="İlçe *">
              <input required value={form.ilce} onChange={(e) => set("ilce", e.target.value)} placeholder="Karşıyaka" className="filtre-input" />
            </Alan>
            <Alan label="Mahalle">
              <input value={form.mahalle} onChange={(e) => set("mahalle", e.target.value)} placeholder="Bostanlı" className="filtre-input" />
            </Alan>
          </div>

          {/* Harita pini (madde 4) */}
          <div className="pt-2">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-700">
                Harita Üzerinde Konum
              </span>
              {enlem !== undefined && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <LocationIcon className="h-3.5 w-3.5" /> Konum işaretlendi
                </span>
              )}
            </div>
            <p className="mb-2 text-xs text-brand-400">
              Haritaya tıklayarak evin tam yerini işaretleyin. Pini sürükleyerek
              ince ayar yapabilirsiniz.
            </p>
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
        <Kart baslik="Özellikler" ipucu="Konut dışı ilanlarda (arsa, iş yeri) ilgisiz alanları boş bırakabilirsiniz.">
          <div className="grid gap-4 sm:grid-cols-3">
            <Alan label="Oda Sayısı">
              <input value={form.odaSayisi} onChange={(e) => set("odaSayisi", e.target.value)} placeholder="3+1" className="filtre-input" />
            </Alan>
            <Alan label="Brüt m²">
              <input type="number" value={form.brutMetrekare} onChange={(e) => set("brutMetrekare", e.target.value)} placeholder="145" className="filtre-input" />
            </Alan>
            <Alan label="Net m²">
              <input type="number" value={form.netMetrekare} onChange={(e) => set("netMetrekare", e.target.value)} placeholder="130" className="filtre-input" />
            </Alan>
            <Alan label="Bina Yaşı">
              <input type="number" value={form.binaYasi} onChange={(e) => set("binaYasi", e.target.value)} placeholder="0 (sıfır)" className="filtre-input" />
            </Alan>
            <Alan label="Bulunduğu Kat">
              <input value={form.bulunduguKat} onChange={(e) => set("bulunduguKat", e.target.value)} placeholder="5. Kat" className="filtre-input" />
            </Alan>
            <Alan label="Kat Sayısı">
              <input type="number" value={form.katSayisi} onChange={(e) => set("katSayisi", e.target.value)} placeholder="8" className="filtre-input" />
            </Alan>
            <Alan label="Isıtma">
              <input value={form.isitma} onChange={(e) => set("isitma", e.target.value)} placeholder="Doğalgaz (Kombi)" className="filtre-input" />
            </Alan>
            <Alan label="Aidat (₺)">
              <input type="number" value={form.aidat} onChange={(e) => set("aidat", e.target.value)} placeholder="1500" className="filtre-input" />
            </Alan>
          </div>

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
        </Kart>
      </div>

      {/* Sabit kaydet çubuğu */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          {kaydedildi ? (
            <span className="text-sm font-semibold text-green-600">
              ✓ Kaydedildi! Yönlendiriliyorsunuz…
            </span>
          ) : (
            <span className="text-sm text-brand-400">Değişiklikleri kaydetmeyi unutmayın</span>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/ilanlar")}
              className="rounded-xl border border-brand-200 px-5 py-2.5 font-medium text-brand-700 transition hover:bg-brand-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-accent-500 px-6 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400"
            >
              {duzenleme ? "Güncelle" : "Yayınla"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function Kart({
  baslik,
  ipucu,
  children,
}: {
  baslik: string;
  ipucu?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-bold text-brand-800">{baslik}</h2>
      {ipucu && <p className="mb-4 mt-0.5 text-xs text-brand-400">{ipucu}</p>}
      <div className={`space-y-4 ${ipucu ? "" : "mt-4"}`}>{children}</div>
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
