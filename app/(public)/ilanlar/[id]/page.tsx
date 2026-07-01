import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  fiyatFormatla,
  tipEtiketleri,
  kategoriEtiketleri,
} from "@/lib/listings";
import { ilanGetirDb, tumIlanlar } from "@/lib/ilanlar-db";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { getAyarlar } from "@/lib/ayarlar";
import IlanGaleri from "@/components/IlanGaleri";
import IlanDetayTabs from "@/components/IlanDetayTabs";
import DanismanFoto from "@/components/DanismanFoto";
import IlanKart from "@/components/IlanKart";
import {
  WhatsAppIcon,
  LocationIcon,
  PhoneIcon,
  InstagramIcon,
} from "@/components/icons";

type Props = { params: Promise<{ id: string }> };

// WhatsApp/Instagram'da link paylaşıldığında çıkacak önizleme kartı
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ilan = await ilanGetirDb(id);
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
  const ilan = await ilanGetirDb(id);
  if (!ilan) notFound();

  // "Hemen mesaj at" için hazır WhatsApp mesajı
  const mesaj = `Merhaba, web sitenizdeki şu ilanla ilgileniyorum:

İlan: ${ilan.baslik}
İlan No: ${ilan.ilanNo ?? ilan.id}
Fiyat: ${fiyatFormatla(ilan.fiyat)}${ilan.tip === "kiralik" ? " /ay" : ""}
Konum: ${ilan.mahalle}, ${ilan.ilce}/${ilan.il}

Detaylı bilgi alabilir miyim?`;

  const ilanUrl = `${siteConfig.siteUrl}/ilanlar/${ilan.id}`;
  const a = await getAyarlar();

  // Benzer ilanlar: aynı kategori, kendisi hariç
  const hepsi = await tumIlanlar();
  const benzer = hepsi
    .filter((i) => i.id !== ilan.id && i.kategori === ilan.kategori)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Konum kırıntısı */}
      <nav className="mb-4 text-sm text-brand-400">
        <Link href="/ilanlar" className="hover:text-accent-600">İlanlar</Link>
        {" / "}
        <Link href={`/ilanlar?konum=${encodeURIComponent(ilan.il)}`} className="hover:text-accent-600">{ilan.il}</Link>
        {" / "}
        <Link href={`/ilanlar?konum=${encodeURIComponent(ilan.ilce)}`} className="hover:text-accent-600">{ilan.ilce}</Link>
        {ilan.mahalle && <> {" / "} <span className="text-brand-600">{ilan.mahalle}</span></>}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Sol: galeri + bilgiler */}
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
              <span key={r} className="rounded-full bg-accent-500 px-3 py-1 text-sm font-bold text-brand-900">
                {r}
              </span>
            ))}
            {ilan.durum === "rezerve" && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">REZERVE</span>
            )}
            {ilan.durum === "satildi" && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">SATILDI</span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-brand-900 sm:text-3xl">{ilan.baslik}</h1>
          <div className="mt-2 flex items-center gap-1 text-brand-500">
            <LocationIcon className="h-5 w-5" />
            {ilan.mahalle}, {ilan.ilce} / {ilan.il}
          </div>

          {/* Sekmeler: İlan Bilgileri / Açıklama / Konum */}
          <IlanDetayTabs ilan={ilan} />
        </div>

        {/* Sağ: fiyat + danışman kartı */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-32">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <div className="text-sm text-brand-400">Fiyat</div>
            <div className="text-3xl font-bold text-brand-900">
              {fiyatFormatla(ilan.fiyat)}
              {ilan.tip === "kiralik" && (
                <span className="text-base font-normal text-brand-400"> /ay</span>
              )}
            </div>

            {/* Danışman */}
            <div className="mt-5 flex items-center gap-3 border-t border-brand-100 pt-5">
              <DanismanFoto src={siteConfig.danismanFoto} ad={siteConfig.danismanAdi} />
              <div>
                <div className="font-bold text-brand-800">{siteConfig.danismanAdi}</div>
                <div className="text-xs text-brand-500">{siteConfig.danismanUnvan}</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <a
                href={whatsappLink(mesaj, a.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white transition hover:bg-green-500"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Hemen Mesaj At
              </a>
              <a
                href={`tel:${a.whatsapp}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 px-4 py-3.5 font-semibold text-white transition hover:bg-brand-700"
              >
                <PhoneIcon className="h-5 w-5" />
                Hemen Ara
              </a>
            </div>

            {/* Paylaş */}
            <div className="mt-5 border-t border-brand-100 pt-4">
              <div className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-brand-400">
                İlanı Paylaş
              </div>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${ilan.baslik} — ${ilanUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp'ta paylaş"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-green-600 hover:text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ilanUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook'ta paylaş"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-blue-600 hover:text-white"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={a.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition hover:bg-pink-600 hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Benzer ilanlar */}
      {benzer.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-bold text-brand-800">Benzer İlanlar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benzer.map((b) => (
              <IlanKart key={b.id} ilan={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
