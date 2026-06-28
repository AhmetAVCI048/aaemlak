"use client";

import { useState } from "react";
import Image from "next/image";

type Medya =
  | { tur: "foto"; src: string }
  | { tur: "video"; src: string };

/* İlan detay galerisi — büyük kapak + tıklanabilir küçük görseller, video desteğiyle. */
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
  const seciliMedya = medyalar[aktif];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-900">
        {seciliMedya?.tur === "foto" && (
          <Image
            src={seciliMedya.src}
            alt={`${baslik} — görsel ${aktif + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
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
                  {/* oynat ikonu */}
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
