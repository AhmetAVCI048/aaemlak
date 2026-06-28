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

// Bodrum / lüks konut temalı premium görseller — otomatik geçiş yapar.
const slaytlar = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
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
    <section className="relative min-h-[620px] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/45 to-brand-900/75" />

      {/* İçerik */}
      <div className="relative mx-auto flex min-h-[620px] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-brand-100 drop-shadow sm:text-lg">
          Seçkin mülkler, doğru yatırımlar ve size özel çözümler.
        </p>

        {/* Cam (glassmorphism) arama paneli */}
        <form
          onSubmit={ara}
          className="mt-8 w-full max-w-3xl rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-5"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <select
              value={tip}
              onChange={(e) => setTip(e.target.value as IlanTipi | "")}
              className="cam-input"
              aria-label="İlan durumu"
            >
              <option value="">Satılık / Kiralık</option>
              <option value="satilik">Satılık</option>
              <option value="kiralik">Kiralık</option>
            </select>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value as Kategori | "")}
              className="cam-input"
              aria-label="Emlak tipi"
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
              className="cam-input md:col-span-2"
              aria-label="Konum"
            />
          </div>

          <button
            type="submit"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-semibold text-brand-900 transition hover:bg-accent-400"
          >
            <SearchIcon className="h-5 w-5" />
            İlanları Bul
          </button>
        </form>
      </div>
    </section>
  );
}
