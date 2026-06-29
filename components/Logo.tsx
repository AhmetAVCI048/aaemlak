"use client";

import { useState } from "react";
import LogoMark from "./LogoMark";

/*
  Başlıktaki logo. Gerçek logo dosyası `public/logo.png` varsa onu gösterir;
  yoksa (ör. dosya henüz eklenmemişse) vektörel logoya düşer — yani hiç bozulmaz.
  Açık zeminde kullanılır.
*/
export default function Logo({ className }: { className?: string }) {
  const [hata, setHata] = useState(false);

  if (hata) {
    return <LogoMark className={`${className ?? ""} text-brand-900`} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="AA Emlak — Ahmet Avcı Real Estate"
      className={className}
      onError={() => setHata(true)}
    />
  );
}
