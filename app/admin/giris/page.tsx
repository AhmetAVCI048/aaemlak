"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoMark from "@/components/LogoMark";
import { supabaseTarayici } from "@/lib/supabase/client";

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");
    setYukleniyor(true);

    const sb = supabaseTarayici();
    if (!sb) {
      // Supabase yapılandırılmadıysa demo girişi
      router.push("/admin");
      return;
    }

    const { error } = await sb.auth.signInWithPassword({ email, password: sifre });
    if (error) {
      setHata("E-posta veya şifre hatalı.");
      setYukleniyor(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <LogoMark className="mx-auto mb-3 h-20 w-auto text-white" />
          <p className="text-sm text-brand-400">Yönetim Paneli Girişi</p>
        </div>

        <form onSubmit={girisYap} className="space-y-4 rounded-2xl bg-white p-6 shadow-xl">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-700">E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="filtre-input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-700">Şifre</label>
            <input
              type="password"
              required
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              className="filtre-input"
            />
          </div>

          {hata && (
            <p className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
              {hata}
            </p>
          )}

          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full rounded-xl bg-accent-500 px-4 py-3 font-semibold text-brand-900 transition hover:bg-accent-400 disabled:opacity-60"
          >
            {yukleniyor ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
