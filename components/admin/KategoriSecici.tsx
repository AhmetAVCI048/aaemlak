"use client";

import { kategoriAgaci } from "@/lib/categories";
import { type Kategori, type IlanTipi } from "@/lib/listings";

/* Adım adım kategori seçimi: Kategori → Durum → Tür (sahibinden tarzı). */
export default function KategoriSecici({
  kategori,
  tip,
  altKategori,
  onKategori,
  onTip,
  onAltKategori,
}: {
  kategori: Kategori;
  tip: IlanTipi;
  altKategori: string;
  onKategori: (k: Kategori) => void;
  onTip: (t: IlanTipi) => void;
  onAltKategori: (a: string) => void;
}) {
  const kategoriler = Object.keys(kategoriAgaci) as Kategori[];
  const turler = kategoriAgaci[kategori].turler;

  return (
    <div>
      {/* Seçim özeti */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-sm font-medium text-accent-600">
        <span>Emlak</span>
        <span className="text-brand-300">›</span>
        <span>{kategoriAgaci[kategori].label}</span>
        <span className="text-brand-300">›</span>
        <span>{tip === "satilik" ? "Satılık" : "Kiralık"}</span>
        {altKategori && (
          <>
            <span className="text-brand-300">›</span>
            <span>{altKategori}</span>
          </>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Kategori */}
        <Sutun baslik="Kategori">
          {kategoriler.map((k) => (
            <Secenek
              key={k}
              secili={kategori === k}
              onClick={() => onKategori(k)}
            >
              {kategoriAgaci[k].label}
            </Secenek>
          ))}
        </Sutun>

        {/* Durum (Satılık/Kiralık) */}
        <Sutun baslik="Durum">
          <Secenek secili={tip === "satilik"} onClick={() => onTip("satilik")}>
            Satılık
          </Secenek>
          <Secenek secili={tip === "kiralik"} onClick={() => onTip("kiralik")}>
            Kiralık
          </Secenek>
        </Sutun>

        {/* Tür (alt kategori) */}
        <Sutun baslik="Tür">
          {turler.map((t) => (
            <Secenek
              key={t}
              secili={altKategori === t}
              onClick={() => onAltKategori(t)}
            >
              {t}
            </Secenek>
          ))}
        </Sutun>
      </div>
    </div>
  );
}

function Sutun({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-200">
      <div className="border-b border-brand-100 bg-brand-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-brand-500">
        {baslik}
      </div>
      <div className="max-h-56 overflow-y-auto">{children}</div>
    </div>
  );
}

function Secenek({
  secili,
  onClick,
  children,
}: {
  secili: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-3 py-2 text-left text-sm transition ${
        secili
          ? "bg-accent-500 font-semibold text-brand-900"
          : "text-brand-700 hover:bg-brand-50"
      }`}
    >
      {children}
    </button>
  );
}
