import Link from "next/link";
import Image from "next/image";
import {
  type Ilan,
  fiyatFormatla,
  tipEtiketleri,
  kategoriEtiketleri,
} from "@/lib/listings";
import { LocationIcon } from "./icons";

/* İlan kartı — listeleme sayfasında ve anasayfada kullanılır. */
export default function IlanKart({ ilan }: { ilan: Ilan }) {
  const kapak = ilan.gorseller[0];

  return (
    <Link
      href={`/ilanlar/${ilan.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
        {kapak && (
          <Image
            src={kapak}
            alt={ilan.baslik}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        {/* Sol üst rozetler: satılık/kiralık + durum */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-800/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {tipEtiketleri[ilan.tip]}
          </span>
          {ilan.durum === "satildi" && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              SATILDI
            </span>
          )}
          {ilan.durum === "rezerve" && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              REZERVE
            </span>
          )}
        </div>

        {/* Sağ üst özel rozetler (Acil, Fırsat) */}
        {ilan.rozetler.length > 0 && (
          <div className="absolute right-3 top-3 flex flex-wrap gap-2">
            {ilan.rozetler.map((r) => (
              <span
                key={r}
                className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-brand-900"
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-400">
          {kategoriEtiketleri[ilan.kategori]}
        </span>
        <h3 className="mb-2 line-clamp-2 font-semibold text-brand-800 group-hover:text-brand-900">
          {ilan.baslik}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-sm text-brand-500">
          <LocationIcon className="h-4 w-4 shrink-0" />
          <span>
            {ilan.ilce}, {ilan.il}
          </span>
        </div>

        {/* Özet özellikler */}
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-brand-600">
          {ilan.odaSayisi && (
            <span className="rounded-md bg-brand-50 px-2 py-1">{ilan.odaSayisi}</span>
          )}
          {ilan.brutMetrekare && (
            <span className="rounded-md bg-brand-50 px-2 py-1">{ilan.brutMetrekare} m²</span>
          )}
          {ilan.binaYasi !== undefined && (
            <span className="rounded-md bg-brand-50 px-2 py-1">
              {ilan.binaYasi === 0 ? "Sıfır" : `${ilan.binaYasi} yaşında`}
            </span>
          )}
        </div>

        <div className="mt-auto text-xl font-bold text-brand-900">
          {fiyatFormatla(ilan.fiyat)}
          {ilan.tip === "kiralik" && (
            <span className="text-sm font-normal text-brand-400"> /ay</span>
          )}
        </div>
      </div>
    </Link>
  );
}
