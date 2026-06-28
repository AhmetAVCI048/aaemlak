"use client";

import { useState } from "react";

/* Admin'deki basit "kaydet" durumunu yöneten küçük yardımcı.
   Şimdilik gerçek kayıt yok; Supabase bağlanınca buraya kayıt çağrısı eklenecek. */
export function useDemoKayit() {
  const [kaydedildi, setKaydedildi] = useState(false);
  const kaydet = (e: React.FormEvent, veri?: unknown) => {
    e.preventDefault();
    if (veri) console.log("Kaydedilecek:", veri);
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2500);
  };
  return { kaydedildi, kaydet };
}

export function KaydetCubugu({ kaydedildi, etiket = "Kaydet" }: { kaydedildi: boolean; etiket?: string }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <button
        type="submit"
        className="rounded-xl bg-accent-500 px-6 py-2.5 font-semibold text-brand-900 transition hover:bg-accent-400"
      >
        {etiket}
      </button>
      {kaydedildi && (
        <span className="text-sm font-semibold text-green-600">✓ Kaydedildi</span>
      )}
    </div>
  );
}

export function AdminAlan({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-700">{label}</label>
      {children}
    </div>
  );
}
