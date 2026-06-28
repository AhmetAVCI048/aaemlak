import Link from "next/link";
import { ornekIlanlar, type Ilan } from "@/lib/listings";
import HeroSlider from "@/components/HeroSlider";
import OneCikanlar from "@/components/OneCikanlar";
import KategoriSeridi from "@/components/KategoriSeridi";

export default function HomePage() {
  const aktif = ornekIlanlar.filter((i) => i.durum !== "satildi");

  // Öne çıkanlar: rozetli (Fırsat/Acil vb.) ilanlar önce; yoksa tüm aktifler
  const rozetliler = aktif.filter((i) => i.rozetler.length > 0);
  const oneCikanlar = rozetliler.length >= 3 ? rozetliler : aktif;

  // Kategori şeritleri — her birinin "Tümünü gör" linki ilgili filtreyi açar
  const seritler: { baslik: string; href: string; ilanlar: Ilan[] }[] = [
    {
      baslik: "Satılık Konutlar",
      href: "/ilanlar?tip=satilik&kategori=konut",
      ilanlar: aktif.filter((i) => i.tip === "satilik" && i.kategori === "konut"),
    },
    {
      baslik: "Kiralık İlanlar",
      href: "/ilanlar?tip=kiralik",
      ilanlar: aktif.filter((i) => i.tip === "kiralik"),
    },
    {
      baslik: "İş Yerleri",
      href: "/ilanlar?kategori=isyeri",
      ilanlar: aktif.filter((i) => i.kategori === "isyeri"),
    },
    {
      baslik: "Arsalar",
      href: "/ilanlar?kategori=arsa",
      ilanlar: aktif.filter((i) => i.kategori === "arsa"),
    },
  ];

  return (
    <>
      {/* Karşılama — otomatik geçişli görsel slaytı + arama */}
      <HeroSlider />

      {/* Öne çıkanlar — otomatik kayan şerit */}
      <section className="py-10">
        <div className="mx-auto mb-5 flex max-w-7xl items-end justify-between px-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-800">Öne Çıkan İlanlar</h2>
            <p className="text-brand-500">Portföyümüzden seçmeler</p>
          </div>
          <Link
            href="/ilanlar"
            className="shrink-0 font-semibold text-accent-600 hover:text-accent-500"
          >
            Tümünü gör →
          </Link>
        </div>
        <OneCikanlar ilanlar={oneCikanlar} />
      </section>

      {/* Kategori şeritleri — elle kaydırmalı */}
      <div className="divide-y divide-brand-100">
        {seritler.map((s) => (
          <KategoriSeridi key={s.baslik} baslik={s.baslik} href={s.href} ilanlar={s.ilanlar} />
        ))}
      </div>
    </>
  );
}
