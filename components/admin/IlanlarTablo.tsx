"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  type Ilan,
  fiyatFormatla,
  tipEtiketleri,
  kategoriEtiketleri,
} from "@/lib/listings";
import { EditIcon, TrashIcon, PlusIcon } from "@/components/icons";

const durumStil: Record<Ilan["durum"], { etiket: string; sinif: string }> = {
  aktif: { etiket: "Aktif", sinif: "bg-green-100 text-green-700" },
  rezerve: { etiket: "Rezerve", sinif: "bg-orange-100 text-orange-700" },
  satildi: { etiket: "Satıldı", sinif: "bg-red-100 text-red-700" },
};

export default function IlanlarTablo({ baslangic }: { baslangic: Ilan[] }) {
  const [ilanlar, setIlanlar] = useState(baslangic);
  const [silinecek, setSilinecek] = useState<Ilan | null>(null);

  // Sahte silme: şimdilik sadece ekrandan kaldırır. Supabase bağlanınca kalıcı olacak.
  const sil = () => {
    if (silinecek) setIlanlar((l) => l.filter((i) => i.id !== silinecek.id));
    setSilinecek(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-800">İlanlarım</h1>
          <p className="text-sm text-brand-500">{ilanlar.length} ilan</p>
        </div>
        <Link
          href="/admin/ilanlar/yeni"
          className="flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Yeni İlan</span>
        </Link>
      </div>

      <div className="space-y-3">
        {ilanlar.map((ilan) => {
          const d = durumStil[ilan.durum];
          return (
            <div
              key={ilan.id}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-3 shadow-sm"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-100">
                {ilan.gorseller[0] && (
                  <Image src={ilan.gorseller[0]} alt="" fill sizes="80px" className="object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${d.sinif}`}>
                    {d.etiket}
                  </span>
                  <span className="text-xs text-brand-400">
                    {tipEtiketleri[ilan.tip]} • {kategoriEtiketleri[ilan.kategori]}
                  </span>
                </div>
                <div className="mt-0.5 truncate font-medium text-brand-800">{ilan.baslik}</div>
                <div className="text-sm font-semibold text-brand-600">
                  {fiyatFormatla(ilan.fiyat)}
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/ilanlar/${ilan.id}/duzenle`}
                  className="flex items-center gap-1.5 rounded-lg border border-brand-200 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
                >
                  <EditIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Düzenle</span>
                </Link>
                <button
                  onClick={() => setSilinecek(ilan)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Sil</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Silme onayı */}
      {silinecek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-brand-800">İlanı sil?</h3>
            <p className="mt-2 text-sm text-brand-500">
              <strong>{silinecek.baslik}</strong> ilanını silmek istediğinize emin misiniz?
              Bu işlem geri alınamaz.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSilinecek(null)}
                className="flex-1 rounded-xl border border-brand-200 px-4 py-2.5 font-medium text-brand-700 transition hover:bg-brand-50"
              >
                Vazgeç
              </button>
              <button
                onClick={sil}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-500"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
