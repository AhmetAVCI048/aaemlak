"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "./icons";

type Medya =
  | { tur: "foto"; src: string }
  | { tur: "video"; src: string };

/* İlan detay galerisi — büyük kapak + küçük görseller, video ve tam ekran lightbox ile. */
export default function IlanGaleri({
  gorseller,
  video,
  baslik,
}: {
  gorseller: string[];
  video?: string;
  baslik: string;
}) {
  const medyalar: Medya[] = [
    ...gorseller.map((src) => ({ tur: "foto" as const, src })),
    ...(video ? [{ tur: "video" as const, src: video }] : []),
  ];

  const [aktif, setAktif] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const seciliMedya = medyalar[aktif];

  // Lightbox sadece fotoğraflar arasında gezer
  const fotoIndeksleri = medyalar
    .map((m, i) => (m.tur === "foto" ? i : -1))
    .filter((i) => i >= 0);

  const sonraki = () => {
    const yer = fotoIndeksleri.indexOf(aktif);
    const next = fotoIndeksleri[(yer + 1) % fotoIndeksleri.length];
    setAktif(next);
  };
  const onceki = () => {
    const yer = fotoIndeksleri.indexOf(aktif);
    const prev =
      fotoIndeksleri[(yer - 1 + fotoIndeksleri.length) % fotoIndeksleri.length];
    setAktif(prev);
  };

  // Klavye okları + ESC
  useEffect(() => {
    if (!lightbox) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") sonraki();
      else if (e.key === "ArrowLeft") onceki();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  // Dokunmatik kaydırma
  const [touchX, setTouchX] = useState<number | null>(null);
  const touchEnd = (x: number) => {
    if (touchX === null) return;
    const fark = x - touchX;
    if (Math.abs(fark) > 50) (fark < 0 ? sonraki : onceki)();
    setTouchX(null);
  };

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-900">
        {seciliMedya?.tur === "foto" && (
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="group h-full w-full cursor-zoom-in"
            aria-label="Fotoğrafı büyüt"
          >
            <Image
              src={seciliMedya.src}
              alt={`${baslik} — görsel ${aktif + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition group-hover:scale-105"
            />
          </button>
        )}
        {seciliMedya?.tur === "video" && (
          <video
            src={seciliMedya.src}
            controls
            className="h-full w-full bg-black object-contain"
          />
        )}
      </div>

      {medyalar.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {medyalar.map((m, i) => (
            <button
              key={`${m.tur}-${m.src}`}
              onClick={() => setAktif(i)}
              className={`relative aspect-square overflow-hidden rounded-lg transition ${
                i === aktif ? "ring-2 ring-accent-500" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={m.tur === "video" ? "Video" : `Görsel ${i + 1}`}
            >
              {m.tur === "foto" ? (
                <Image src={m.src} alt="" fill sizes="120px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-brand-800 text-white">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Tam ekran lightbox */}
      {lightbox && seciliMedya?.tur === "foto" && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(false)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => touchEnd(e.changedTouches[0].clientX)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
            aria-label="Kapat"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onceki();
            }}
            className="absolute left-3 rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25 sm:left-6"
            aria-label="Önceki"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="relative mx-14 h-[80vh] w-full max-w-5xl sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={seciliMedya.src}
              alt={`${baslik} — görsel`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sonraki();
            }}
            className="absolute right-3 rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25 sm:right-6"
            aria-label="Sonraki"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white">
            {fotoIndeksleri.indexOf(aktif) + 1} / {fotoIndeksleri.length}
          </div>
        </div>
      )}
    </div>
  );
}
