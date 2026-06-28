"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useDemoKayit, KaydetCubugu, AdminAlan } from "@/components/admin/BasitForm";

export default function AyarlarPage() {
  const { kaydedildi, kaydet } = useDemoKayit();

  const [v, setV] = useState({
    brandName: siteConfig.brandName,
    tagline: siteConfig.tagline,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsappRaw,
    instagram: siteConfig.instagram,
    email: siteConfig.email,
    address: siteConfig.address,
  });
  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-800">İletişim Bilgileri</h1>
      <p className="mt-1 text-sm text-brand-500">
        Burada yaptığınız değişiklikler sitenin üst barında, altbilgisinde ve iletişim
        sayfasında otomatik güncellenecek.
      </p>

      <form onSubmit={(e) => kaydet(e, v)} className="mt-6 space-y-6">
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
              <input value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+90 555 000 00 00" className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="WhatsApp Numarası (başında 90, boşluksuz)">
              <input value={v.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="905550000000" className="filtre-input" />
            </AdminAlan>
            <AdminAlan label="Instagram Adresi">
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

        <KaydetCubugu kaydedildi={kaydedildi} />
      </form>
    </div>
  );
}
