import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ilanGetir,
  fiyatFormatla,
  tipEtiketleri,
  kategoriEtiketleri,
  type Ilan,
} from "@/lib/listings";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import IlanGaleri from "@/components/IlanGaleri";
import Harita from "@/components/Harita";
import { WhatsAppIcon, LocationIcon, PhoneIcon } from "@/components/icons";

type Props = { params: Promise<{ id: string }> };

// WhatsApp/Instagram'da link paylaşıldığında çıkacak önizleme kartı (madde 1)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ilan = ilanGetir(id);
  if (!ilan) return { title: "İlan bulunamadı" };

  const baslik = `${ilan.baslik} — ${fiyatFormatla(ilan.fiyat)}`;
  return {
    title: ilan.baslik,
    description: ilan.aciklama.slice(0, 150),
    openGraph: {
      title: baslik,
      description: `${ilan.ilce}, ${ilan.il} • ${kategoriEtiketleri[ilan.kategori]}`,
      images: ilan.gorseller[0] ? [{ url: ilan.gorseller[0] }] : [],
    },
  };
}

export default async function IlanDetayPage({ params }: Props) {
  const { id } = await params;
  const ilan = ilanGetir(id);
  if (!ilan) notFound();

  // "Hemen mesaj at" için hazır WhatsApp mesajı (madde 6)
  const mesaj = `Merhaba, web sitenizdeki şu ilanla ilgileniyorum:

🏠 ${ilan.baslik}
🔖 İlan No: ${ilan.id}
💰 Fiyat: ${fiyatFormatla(ilan.fiyat)}${ilan.tip === "kiralik" ? " /ay" : ""}
📍 Konum: ${ilan.mahalle}, ${ilan.ilce}/${ilan.il}

Detaylı bilgi alabilir miyim?`;

  const ozellikler = ozellikListesi(ilan);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 text-sm text-brand-400">
        <a href="/ilanlar" className="hover:text-accent-600">
          İlanlar
        </a>{" "}
        / <span className="text-brand-600">{ilan.baslik}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Sol: galeri + açıklama */}
        <div>
          <IlanGaleri gorseller={ilan.gorseller} video={ilan.video} baslik={ilan.baslik} />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-800 px-3 py-1 text-sm font-semibold text-white">
              {tipEtiketleri[ilan.tip]}
            </span>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
              {kategoriEtiketleri[ilan.kategori]}
            </span>
            {ilan.rozetler.map((r) => (
              <span
                key={r}
                className="rounded-full bg-accent-500 px-3 py-1 text-sm font-bold text-brand-900"
              >
                {r}
              </span>
            ))}
            {ilan.durum === "rezerve" && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                REZERVE
              </span>
            )}
            {ilan.durum === "satildi" && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                SATILDI
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-brand-900 sm:text-3xl">
            {ilan.baslik}
          </h1>
          <div className="mt-2 flex items-center gap-1 text-brand-500">
            <LocationIcon className="h-5 w-5" />
            {ilan.mahalle}, {ilan.ilce} / {ilan.il}
          </div>

          {/* Özellik tablosu */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand-100 bg-brand-100 sm:grid-cols-3">
            {ozellikler.map((o) => (
              <div key={o.label} className="bg-white p-4">
                <div className="text-xs text-brand-400">{o.label}</div>
                <div className="font-semibold text-brand-800">{o.value}</div>
              </div>
            ))}
          </div>

          {/* Açıklama metni */}
          <div className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-brand-800">Açıklama</h2>
            <p className="whitespace-pre-line leading-relaxed text-brand-600">
              {ilan.aciklama}
            </p>
          </div>

          {/* Konum haritası + yol tarifi (madde 4) */}
          {ilan.enlem !== undefined && ilan.boylam !== undefined && (
            <div className="mt-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-brand-800">Konum</h2>
                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${ilan.enlem},${ilan.boylam}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    <LocationIcon className="h-4 w-4" />
                    Yol Tarifi Al
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${ilan.enlem},${ilan.boylam}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                  >
                    Haritada Aç
                  </a>
                </div>
              </div>
              <div className="h-80 overflow-hidden rounded-2xl border border-brand-100">
                <Harita enlem={ilan.enlem} boylam={ilan.boylam} />
              </div>
            </div>
          )}
        </div>

        {/* Sağ: fiyat + iletişim kutusu (sticky) */}
        <aside className="h-fit lg:sticky lg:top-32">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <div className="text-sm text-brand-400">Fiyat</div>
            <div className="text-3xl font-bold text-brand-900">
              {fiyatFormatla(ilan.fiyat)}
              {ilan.tip === "kiralik" && (
                <span className="text-base font-normal text-brand-400"> /ay</span>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {/* Hemen mesaj at — hazır WhatsApp mesajı */}
              <a
                href={whatsappLink(mesaj)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white transition hover:bg-green-500"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hemen Mesaj At
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 px-4 py-3.5 font-semibold text-white transition hover:bg-brand-700"
              >
                <PhoneIcon className="h-5 w-5" />
                Hemen Ara
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-brand-400">
              İlan No: {ilan.id}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Detay sayfasındaki özellik tablosunu hazırlar (boş alanları atlar). */
function ozellikListesi(ilan: Ilan): { label: string; value: string }[] {
  const list: { label: string; value: string }[] = [];
  const ekle = (label: string, value?: string | number) => {
    if (value !== undefined && value !== "") list.push({ label, value: String(value) });
  };

  ekle("Oda Sayısı", ilan.odaSayisi);
  ekle("Brüt m²", ilan.brutMetrekare);
  ekle("Net m²", ilan.netMetrekare);
  if (ilan.binaYasi !== undefined)
    ekle("Bina Yaşı", ilan.binaYasi === 0 ? "Sıfır" : `${ilan.binaYasi}`);
  ekle("Bulunduğu Kat", ilan.bulunduguKat);
  ekle("Kat Sayısı", ilan.katSayisi);
  ekle("Isıtma", ilan.isitma);
  if (ilan.aidat !== undefined) ekle("Aidat", `${ilan.aidat} ₺`);
  if (ilan.esyali !== undefined) ekle("Eşyalı", ilan.esyali ? "Evet" : "Hayır");
  if (ilan.krediyeUygun !== undefined)
    ekle("Krediye Uygun", ilan.krediyeUygun ? "Evet" : "Hayır");

  return list;
}
