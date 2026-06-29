import { Suspense } from "react";
import IlanlarClient from "@/components/IlanlarClient";
import { tumIlanlar } from "@/lib/ilanlar-db";

export const metadata = { title: "İlanlar" };

export default async function IlanlarPage() {
  const ilanlar = await tumIlanlar();
  return (
    <Suspense fallback={<div className="p-8 text-center text-brand-400">Yükleniyor…</div>}>
      <IlanlarClient ilanlar={ilanlar} />
    </Suspense>
  );
}
