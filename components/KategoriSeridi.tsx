import Link from "next/link";
import { type Ilan } from "@/lib/listings";
import IlanKart from "./IlanKart";

/*
  Elle kaydırılan kategori şeridi. Başlık + "Tümünü gör" linki, altında yatay
  kaydırmalı kartlar. "Tümünü gör" linki /ilanlar sayfasına ilgili filtrelerle gider.
*/
export default function KategoriSeridi({
  baslik,
  ilanlar,
  href,
}: {
  baslik: string;
  ilanlar: Ilan[];
  href: string;
}) {
  if (ilanlar.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold text-brand-800 sm:text-2xl">{baslik}</h2>
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-accent-600 hover:text-accent-500"
        >
          Tümünü gör →
        </Link>
      </div>

      <div className="yatay-kaydir flex snap-x gap-5 overflow-x-auto pb-3">
        {ilanlar.map((ilan) => (
          <div
            key={ilan.id}
            className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[44vw] lg:w-[31%]"
          >
            <IlanKart ilan={ilan} />
          </div>
        ))}
      </div>
    </section>
  );
}
