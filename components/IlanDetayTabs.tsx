"use client";

import { useState } from "react";
import {
  type Ilan,
  fiyatFormatla,
  tipEtiketleri,
  kategoriEtiketleri,
} from "@/lib/listings";
import Harita from "./Harita";
import { LocationIcon } from "./icons";

type Sekme = "bilgiler" | "aciklama" | "konum";

export default function IlanDetayTabs({ ilan }: { ilan: Ilan }) {
  const [sekme, setSekme] = useState<Sekme>("bilgiler");
  const haritaVar = ilan.enlem !== undefined && ilan.boylam !== undefined;

  const satirlar = bilgiSatirlari(ilan);

  const sekmeler: { id: Sekme; etiket: string }[] = [
    { id: "bilgiler", etiket: "İlan Bilgileri" },
    { id: "aciklama", etiket: "Açıklama" },
    { id: "konum", etiket: "Konum" },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white">
      {/* Sekme başlıkları */}
      <div className="flex border-b border-brand-100">
        {sekmeler.map((s) => (
          <button
            key={s.id}
            onClick={() => setSekme(s.id)}
            className={`flex-1 px-4 py-3.5 text-sm font-semibold transition sm:text-base ${
              sekme === s.id
                ? "border-b-2 border-accent-500 text-brand-900"
                : "text-brand-500 hover:bg-brand-50"
            }`}
          >
            {s.etiket}
          </button>
        ))}
      </div>

      <div className="p-1 sm:p-2">
        {/* İlan Bilgileri — alt alta tablo + detaylı özellikler */}
        {sekme === "bilgiler" && (
          <div>
            <table className="w-full text-sm">
              <tbody>
                {satirlar.map((s, i) => (
                  <tr key={s.label} className={i % 2 === 0 ? "bg-brand-50/60" : ""}>
                    <td className="w-2/5 px-4 py-3 font-medium text-brand-500">{s.label}</td>
                    <td className="px-4 py-3 font-semibold text-brand-800">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-5 p-4">
              <OzellikGrubu baslik="Cephe" liste={ilan.cephe} />
              <OzellikGrubu baslik="Manzara" liste={ilan.manzara} />
              <OzellikGrubu baslik="İç Özellikler" liste={ilan.icOzellikler} />
              <OzellikGrubu baslik="Dış Özellikler" liste={ilan.disOzellikler} />
            </div>
          </div>
        )}

        {/* Açıklama */}
        {sekme === "aciklama" && (
          <div className="p-4">
            <p className="whitespace-pre-line leading-relaxed text-brand-600">
              {ilan.aciklama || "Bu ilan için açıklama girilmemiş."}
            </p>
          </div>
        )}

        {/* Konum */}
        {sekme === "konum" && (
          <div className="p-4">
            {haritaVar ? (
              <>
                <div className="mb-3 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${ilan.enlem},${ilan.boylam}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    <LocationIcon className="h-4 w-4" />
                    Yol Tarifi Al
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${ilan.enlem},${ilan.boylam}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                  >
                    Haritada Aç
                  </a>
                </div>
                <div className="h-80 overflow-hidden rounded-xl border border-brand-100">
                  <Harita enlem={ilan.enlem} boylam={ilan.boylam} />
                </div>
              </>
            ) : (
              <p className="py-6 text-center text-sm text-brand-400">
                Bu ilan için harita konumu girilmemiş.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Detaylı özellikleri etiket grubu olarak gösterir (boşsa hiç çıkmaz). */
function OzellikGrubu({ baslik, liste }: { baslik: string; liste?: string[] }) {
  if (!liste || liste.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-brand-800">{baslik}</h3>
      <div className="flex flex-wrap gap-2">
        {liste.map((o) => (
          <span
            key={o}
            className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm text-brand-700"
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Detay tablosundaki satırları hazırlar (boş alanları atlar). */
function bilgiSatirlari(ilan: Ilan): { label: string; value: string }[] {
  const list: { label: string; value: string }[] = [];
  const ekle = (label: string, value?: string | number) => {
    if (value !== undefined && value !== "") list.push({ label, value: String(value) });
  };

  ekle("İlan No", ilan.id);
  ekle("İlan Tarihi", new Date(ilan.olusturmaTarihi).toLocaleDateString("tr-TR"));
  ekle(
    "Emlak Tipi",
    `${tipEtiketleri[ilan.tip]} ${ilan.altKategori ?? kategoriEtiketleri[ilan.kategori]}`
  );
  ekle(
    "Fiyat",
    `${fiyatFormatla(ilan.fiyat)}${ilan.tip === "kiralik" ? " /ay" : ""}`
  );
  ekle("m² (Brüt)", ilan.brutMetrekare);
  ekle("m² (Net)", ilan.netMetrekare);
  ekle("Oda Sayısı", ilan.odaSayisi);
  ekle("Banyo Sayısı", ilan.banyoSayisi);
  if (ilan.binaYasi !== undefined)
    ekle("Bina Yaşı", ilan.binaYasi === 0 ? "0 (Oturuma Hazır)" : `${ilan.binaYasi}`);
  ekle("Bulunduğu Kat", ilan.bulunduguKat);
  ekle("Kat Sayısı", ilan.katSayisi);
  ekle("Isıtma", ilan.isitma);
  if (ilan.aidat !== undefined) ekle("Aidat (TL)", ilan.aidat === 0 ? "Yok" : `${ilan.aidat}`);
  if (ilan.esyali !== undefined) ekle("Eşyalı", ilan.esyali ? "Evet" : "Hayır");
  if (ilan.krediyeUygun !== undefined)
    ekle("Krediye Uygun", ilan.krediyeUygun ? "Evet" : "Hayır");
  ekle("Konum", `${ilan.mahalle}, ${ilan.ilce} / ${ilan.il}`);

  return list;
}
