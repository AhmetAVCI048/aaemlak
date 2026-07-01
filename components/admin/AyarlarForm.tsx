"use client";

import { useState } from "react";
import type { Ayarlar } from "@/lib/ayarlar";
import { supabaseTarayici } from "@/lib/supabase/client";
import { AdminAlan } from "./BasitForm";

export default function AyarlarForm({ baslangic }: { baslangic: Ayarlar }) {
  const [v, setV] = useState({
    brandName: baslangic.brandName,
    tagline: baslangic.tagline,
    phone: baslangic.phone,
    whatsapp: baslangic.whatsapp,
    instagram: baslangic.instagram,
    email: baslangic.email,
    address: baslangic.address,
  });
  const [durum, setDurum] = useState<"" | "kaydediliyor" | "ok" | "hata">("");
  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));

  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    setDurum("kaydediliyor");
    const sb = supabaseTarayici();
    if (!sb) {
      setDurum("ok");
      return;
    }
    // İçerik alanlarını korumak için mevcut ayarlarla birleştir
    const veri: Ayarlar = { ...baslangic, ...v };
    const { error } = await sb.from("ayarlar").upsert({ id: 1, veri });
    setDurum(error ? "hata" : "ok");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-800">İletişim Bilgileri</h1>
      <p className="mt-1 text-sm text-brand-500">
        Buradaki değişiklikler sitenin üst barında, altbilgisinde ve iletişim
        sayfasında otomatik güncellenir.
      </p>

      <form onSubmit={kaydet} className="mt-6 space-y-6">
        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">Marka</h2>
          <div className="space-y-4">
            <AdminAlan label="İşletme Adı">
              <input value={v.brandName} onChange={(e) => set("brandName", e.target.value)} className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="Slogan">
              <input value={v.tagline} onChange={(e) => set("tagline", e.target.value)} className="filtre-input" />
            </AdminAlan>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">İletişim</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminAlan label="Telefon (görünen)">
              <input value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+90 532 000 00 00" className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="WhatsApp / Arama numarası (başında 90, boşluksuz)">
              <input value={v.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="905320000000" className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="Instagram adresi">
              <input value={v.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/..." className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="E-posta">
              <input value={v.email} onChange={(e) => set("email", e.target.value)} className="filtre-input" />
            </AdminAlan>
          </div>
          <div className="mt-4">
            <AdminAlan label="Adres">
              <input value={v.address} onChange={(e) => set("address", e.target.value)} className="filtre-input" />
            </AdminAlan>
          </div>
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
