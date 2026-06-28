"use client";

import { useEffect, useRef, useState } from "react";
import { type Ilan } from "@/lib/listings";
import IlanKart from "./IlanKart";

/*
  Öne çıkan ilanlar — adımlı (kart kart) otomatik ilerleyen carousel.
  Her 2.5 saniyede bir kart kayar; sona gelince kesintisiz başa döner.
  Görünen kart sayısı: mobil 1, sm 2, md 3, lg 4, masaüstü (xl) 5.
*/

function gorunenSayi(genislik: number): number {
  if (genislik >= 1280) return 5;
  if (genislik >= 1024) return 4;
  if (genislik >= 768) return 3;
  if (genislik >= 640) return 2;
  return 1;
}

export default function OneCikanlar({ ilanlar }: { ilanlar: Ilan[] }) {
  const [perView, setPerView] = useState(5);
  const [index, setIndex] = useState(0);
  const [gecisli, setGecisli] = useState(true);
  const duraklat = useRef(false);

  useEffect(() => {
    const guncelle = () => {
      setPerView(gorunenSayi(window.innerWidth));
      setIndex(0);
    };
    guncelle();
    window.addEventListener("resize", guncelle);
    return () => window.removeEventListener("resize", guncelle);
  }, []);

  // Tüm kartlar zaten ekrana sığıyorsa kaydırmaya gerek yok
  const kaydirmali = ilanlar.length > perView;

  useEffect(() => {
    if (!kaydirmali) return;
    const t = setInterval(() => {
      if (!duraklat.current) setIndex((i) => i + 1);
    }, 2500);
    return () => clearInterval(t);
  }, [kaydirmali, perView]);

  // Sona (klon bölgesine) gelince geçişsiz şekilde başa sar
  const onGecisBitti = () => {
    if (index >= ilanlar.length) {
      setGecisli(false);
      setIndex(0);
    }
  };
  useEffect(() => {
    if (!gecisli) {
      // bir sonraki kareye geçişi tekrar aç
      const r = requestAnimationFrame(() => setGecisli(true));
      return () => cancelAnimationFrame(r);
    }
  }, [gecisli]);

  if (ilanlar.length === 0) return null;

  // Kesintisiz döngü için baştan perView kadar kart klonlanır
  const dizi = kaydirmali ? [...ilanlar, ...ilanlar.slice(0, perView)] : ilanlar;
  const kartGenislik = 100 / perView;

  return (
    <div
      className="mx-auto max-w-7xl overflow-hidden px-4"
      onMouseEnter={() => (duraklat.current = true)}
      onMouseLeave={() => (duraklat.current = false)}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * kartGenislik}%)`,
          transition: gecisli ? "transform 600ms ease" : "none",
        }}
        onTransitionEnd={onGecisBitti}
      >
        {dizi.map((ilan, i) => (
          <div
            key={`${ilan.id}-${i}`}
            className="shrink-0 px-2.5 py-2"
            style={{ flexBasis: `${kartGenislik}%` }}
          >
            <IlanKart ilan={ilan} />
          </div>
        ))}
      </div>
    </div>
  );
}
