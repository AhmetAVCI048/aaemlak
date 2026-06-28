"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import {
  kategoriEtiketleri,
  type Kategori,
  type IlanTipi,
} from "@/lib/listings";
import { SearchIcon } from "./icons";

// Bodrum / lüks konut temalı büyük görseller — otomatik geçiş yapar.
const slaytlar = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80",
];

export default function HeroSlider() {
  const router = useRouter();
  const [aktif, setAktif] = useState(0);
  const [tip, setTip] = useState<IlanTipi | "">("");
  const [kategori, setKategori] = useState<Kategori | "">("");
  const [konum, setKonum] = useState("");

  // Görseller her 5 saniyede bir yumuşak geçişle değişir
  useEffect(() => {
    const t = setInterval(() => {
      setAktif((a) => (a + 1) % slaytlar.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const ara = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (tip) p.set("tip", tip);
    if (kategori) p.set("kategori", kategori);
    if (konum.trim()) p.set("konum", konum.trim());
    router.push(`/ilanlar${p.toString() ? `?${p}` : ""}`);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Kayan görseller (crossfade) */}
      {slaytlar.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === aktif ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Karartma katmanı (yazılar okunsun) */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/40 to-brand-900/70" />

      {/* İçerik */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-3xl text-3xl font-bold text-white drop-shadow-lg sm:text-5xl">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-brand-100 drop-shadow sm:text-lg">
          Satılık ve kiralık konut, villa, iş yeri ve arsa ilanlarını keşfedin.
        </p>

        {/* Arama kutusu */}
        <form
          onSubmit={ara}
          className="mt-8 w-full max-w-3xl rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur sm:p-4"
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.4fr_auto]">
            <select
              value={tip}
              onChange={(e) => setTip(e.target.value as IlanTipi | "")}
              className="filtre-input"
              aria-label="İlan tipi"
            >
              <option value="">Satılık / Kiralık</option>
              <option value="satilik">Satılık</option>
              <option value="kiralik">Kiralık</option>
            </select>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value as Kategori | "")}
              className="filtre-input"
              aria-label="Kategori"
            >
              <option value="">Tüm Kategoriler</option>
              {(Object.keys(kategoriEtiketleri) as Kategori[]).map((k) => (
                <option key={k} value={k}>
                  {kategoriEtiketleri[k]}
                </option>
              ))}
            </select>

            <input
              value={konum}
              onChange={(e) => setKonum(e.target.value)}
              placeholder="İl, ilçe veya mahalle"
              className="filtre-input"
              aria-label="Konum"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400"
            >
              <SearchIcon className="h-5 w-5" />
              Ara
            </button>
          </div>
        </form>

        {/* Slayt noktaları */}
        <div className="mt-6 flex gap-2">
          {slaytlar.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              aria-label={`Görsel ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === aktif ? "w-6 bg-accent-500" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
