"use client";

import dynamic from "next/dynamic";

// Leaflet yalnızca tarayıcıda çalışır; bu yüzden sunucu render'ını kapatıyoruz.
const HaritaIc = dynamic(() => import("./HaritaIc"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-brand-100 text-sm text-brand-400">
      Harita yükleniyor…
    </div>
  ),
});

export default function Harita(props: {
  enlem?: number;
  boylam?: number;
  secilebilir?: boolean;
  onSec?: (enlem: number, boylam: number) => void;
}) {
  return <HaritaIc {...props} />;
}
