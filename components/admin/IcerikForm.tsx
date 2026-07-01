"use client";

import { useState } from "react";
import type { Ayarlar } from "@/lib/ayarlar";
import { supabaseTarayici } from "@/lib/supabase/client";
import { AdminAlan } from "./BasitForm";
import { PlusIcon, TrashIcon } from "@/components/icons";

export default function IcerikForm({ baslangic }: { baslangic: Ayarlar }) {
  const [altBaslik, setAltBaslik] = useState(baslangic.hakkimdaAltBaslik);
  const [metin, setMetin] = useState(baslangic.hakkimdaParagraflar.join("\n\n"));
  const [kartlar, setKartlar] = useState(baslangic.hakkimdaKartlar);
  const [calismaSaatleri, setCalismaSaatleri] = useState(baslangic.calismaSaatleri);
  const [durum, setDurum] = useState<"" | "kaydediliyor" | "ok" | "hata">("");

  const kartGuncelle = (i: number, alan: "sayi" | "etiket", deger: string) =>
    setKartlar((k) => k.map((x, idx) => (idx === i ? { ...x, [alan]: deger } : x)));
  const kartEkle = () => setKartlar((k) => [...k, { sayi: "", etiket: "" }]);
  const kartSil = (i: number) => setKartlar((k) => k.filter((_, idx) => idx !== i));

  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    setDurum("kaydediliyor");
    const sb = supabaseTarayici();
    if (!sb) {
      setDurum("ok");
      return;
    }
    const veri: Ayarlar = {
      ...baslangic,
      hakkimdaAltBaslik: altBaslik,
      hakkimdaParagraflar: metin.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      hakkimdaKartlar: kartlar,
      calismaSaatleri,
    };
    const { error } = await sb.from("ayarlar").upsert({ id: 1, veri });
    setDurum(error ? "hata" : "ok");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-800">Sayfa İçerikleri</h1>
      <p className="mt-1 text-sm text-brand-500">
        Hakkımda ve İletişim sayfalarındaki metinleri buradan güncelleyin.
      </p>

      <form onSubmit={kaydet} className="mt-6 space-y-6">
        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">Hakkımda Sayfası</h2>
          <div className="space-y-4">
            <AdminAlan label="Üst Başlık (slogan)">
              <input value={altBaslik} onChange={(e) => setAltBaslik(e.target.value)} className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="Tanıtım Metni (paragrafları boş satırla ayırın)">
              <textarea value={metin} onChange={(e) => setMetin(e.target.value)} rows={8} className="filtre-input resize-y" />
            </AdminAlan>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-brand-800">Hakkımda Kartları</h2>
            <button
              type="button"
              onClick={kartEkle}
              className="flex items-center gap-1.5 rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
            >
              <PlusIcon className="h-4 w-4" /> Kart Ekle
            </button>
          </div>
          <div className="space-y-3">
            {kartlar.map((kart, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="w-28">
                  <label className="mb-1 block text-xs font-medium text-brand-500">Sayı</label>
                  <input value={kart.sayi} onChange={(e) => kartGuncelle(i, "sayi", e.target.value)} placeholder="10+" className="filtre-input" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-brand-500">Etiket</label>
                  <input value={kart.etiket} onChange={(e) => kartGuncelle(i, "etiket", e.target.value)} placeholder="Yıllık Tecrübe" className="filtre-input" />
                </div>
                <button
                  type="button"
                  onClick={() => kartSil(i)}
                  className="mb-0.5 rounded-lg border border-red-200 p-2.5 text-red-600 transition hover:bg-red-50"
                  aria-label="Kartı sil"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">İletişim Sayfası</h2>
          <AdminAlan label="Çalışma Saatleri">
            <input value={calismaSaatleri} onChange={(e) => setCalismaSaatleri(e.target.value)} className="filtre-input" />
          </AdminAlan>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={durum === "kaydediliyor"}
            className="rounded-xl bg-accent-500 px-6 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {durum === "kaydediliyor" ? "Kaydediliyor…" : "Kaydet"}
          </button>
          {durum === "ok" && <span className="text-sm font-semibold text-green-600">✓ Kaydedildi</span>}
          {durum === "hata" && <span className="text-sm font-semibold text-red-600">Kaydedilemedi (ayarlar tablosu kuruldu mu?)</span>}
        </div>
      </form>
    </div>
  );
}
