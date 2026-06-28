import { Suspense } from "react";
import IlanlarClient from "@/components/IlanlarClient";

export const metadata = { title: "İlanlar" };

export default function IlanlarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-brand-400">Yükleniyor…</div>}>
      <IlanlarClient />
    </Suspense>
  );
}
