"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function GirisPage() {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState(false);

  // ŞİMDİLİK SAHTE GİRİŞ: gerçek doğrulama Supabase Auth ile eklenecek.
  const girisYap = (e: React.FormEvent) => {
    e.preventDefault();
    setYukleniyor(true);
    setTimeout(() => router.push("/admin"), 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Logo className="mx-auto mb-3 h-20 w-auto text-white" />
          <p className="text-sm text-brand-400">Yönetim Paneli Girişi</p>
        </div>

        <form
          onSubmit={girisYap}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-xl"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-700">
              E-posta
            </label>
            <input
              type="email"
              required
              defaultValue="admin@aaemlak.com"
              className="filtre-input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-700">
              Şifre
            </label>
            <input type="password" required defaultValue="123456" className="filtre-input" />
          </div>
          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full rounded-xl bg-accent-500 px-4 py-3 font-semibold text-brand-900 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {yukleniyor ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>

          <p className="rounded-lg bg-brand-50 p-3 text-center text-xs text-brand-400">
            Demo aşaması: Şimdilik şifre kontrolü yok, doğrudan girebilirsiniz.
            Gerçek giriş Supabase bağlanınca aktif olacak.
          </p>
        </form>
      </div>
    </div>
  );
}
