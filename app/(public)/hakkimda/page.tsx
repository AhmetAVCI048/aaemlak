import { hakkimdaContent } from "@/lib/content";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/icons";

export const metadata = { title: "Hakkımda" };

export default function HakkimdaPage() {
  const c = hakkimdaContent;
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.danismanFoto}
          alt={siteConfig.danismanAdi}
          className="h-40 w-40 shrink-0 rounded-2xl object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <p className="font-semibold text-accent-600">{c.altBaslik}</p>
          <h1 className="mt-1 text-3xl font-bold text-brand-800">{c.baslik}</h1>
          <p className="mt-2 text-lg font-semibold text-brand-700">{siteConfig.danismanAdi}</p>
          <p className="text-sm text-brand-500">{siteConfig.danismanUnvan}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {c.istatistikler.map((s) => (
          <div
            key={s.etiket}
            className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm"
          >
            <div className="text-2xl font-bold text-brand-900 sm:text-3xl">{s.sayi}</div>
            <div className="text-xs text-brand-500 sm:text-sm">{s.etiket}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-brand-600">
        {c.paragraflar.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-brand-800 p-6 text-center sm:p-8">
        <h2 className="text-xl font-bold text-white">Bir sorunuz mu var?</h2>
        <p className="mt-1 text-brand-200">Hemen iletişime geçin, memnuniyetle yardımcı olayım.</p>
        <a
          href={whatsappLink("Merhaba, sizinle görüşmek istiyorum.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp'tan Yazın
        </a>
      </div>
    </div>
  );
}
