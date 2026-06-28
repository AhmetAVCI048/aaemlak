"use client";

import { useState } from "react";
import { hakkimdaContent, iletisimContent } from "@/lib/content";
import { useDemoKayit, KaydetCubugu, AdminAlan } from "@/components/admin/BasitForm";
import { PlusIcon, TrashIcon } from "@/components/icons";

export default function IcerikPage() {
  const { kaydedildi, kaydet } = useDemoKayit();

  const [hakkimda, setHakkimda] = useState(hakkimdaContent.paragraflar.join("\n\n"));
  const [altBaslik, setAltBaslik] = useState(hakkimdaContent.altBaslik);
  const [kartlar, setKartlar] = useState(hakkimdaContent.istatistikler);
  const [calismaSaatleri, setCalismaSaatleri] = useState(iletisimContent.calismaSaatleri);

  const kartGuncelle = (i: number, alan: "sayi" | "etiket", deger: string) =>
    setKartlar((k) => k.map((x, idx) => (idx === i ? { ...x, [alan]: deger } : x)));

  const kartEkle = () =>
    setKartlar((k) => [...k, { sayi: "", etiket: "" }]);

  const kartSil = (i: number) =>
    setKartlar((k) => k.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-800">Sayfa İçerikleri</h1>
      <p className="mt-1 text-sm text-brand-500">
        Hakkımda ve İletişim sayfalarındaki metinleri buradan güncelleyebilirsiniz.
      </p>

      <form
        onSubmit={(e) => kaydet(e, { altBaslik, hakkimda, kartlar, calismaSaatleri })}
        className="mt-6 space-y-6"
      >
        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">Hakkımda Sayfası</h2>
          <div className="space-y-4">
            <AdminAlan label="Üst Başlık (slogan)">
              <input
                value={altBaslik}
                onChange={(e) => setAltBaslik(e.target.value)}
                className="filtre-input"
              />
            </AdminAlan>
            <AdminAlan label="Tanıtım Metni (paragrafları boş satırla ayırın)">
              <textarea
                value={hakkimda}
                onChange={(e) => setHakkimda(e.target.value)}
                rows={8}
                className="filtre-input resize-y"
              />
            </AdminAlan>
          </div>
        </section>

        {/* Hakkımda istatistik kartları (madde 3) */}
        <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="font-bold text-brand-800">Hakkımda Kartları</h2>
            <button
              type="button"
              onClick={kartEkle}
              className="flex items-center gap-1.5 rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
            >
              <PlusIcon className="h-4 w-4" /> Kart Ekle
            </button>
          </div>
          <p className="mb-4 text-xs text-brand-400">
            Örnek: “10+ Yıllık Tecrübe”, “500+ Mutlu Müşteri”. Sayı ve etiketi siz belirlersiniz.
          </p>

          <div className="space-y-3">
            {kartlar.map((kart, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="w-28">
                  <label className="mb-1 block text-xs font-medium text-brand-500">Sayı</label>
                  <input
                    value={kart.sayi}
                    onChange={(e) => kartGuncelle(i, "sayi", e.target.value)}
                    placeholder="10+"
                    className="filtre-input"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-brand-500">Etiket</label>
                  <input
                    value={kart.etiket}
                    onChange={(e) => kartGuncelle(i, "etiket", e.target.value)}
                    placeholder="Yıllık Tecrübe"
                    className="filtre-input"
                  />
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
            <input
              value={calismaSaatleri}
              onChange={(e) => setCalismaSaatleri(e.target.value)}
              className="filtre-input"
            />
          </AdminAlan>
        </section>

        <KaydetCubugu kaydedildi={kaydedildi} />
      </form>
    </div>
  );
}
