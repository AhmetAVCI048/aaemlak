import { iletisimContent } from "@/lib/content";
import { whatsappLink } from "@/lib/site-config";
import { getAyarlar } from "@/lib/ayarlar";
import {
  PhoneIcon,
  WhatsAppIcon,
  InstagramIcon,
  LocationIcon,
} from "@/components/icons";

export const metadata = { title: "İletişim" };

export default async function IletisimPage() {
  const c = iletisimContent;
  const a = await getAyarlar();

  const iletisimKartlari = [
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      baslik: "Telefon",
      deger: a.phone,
      href: `tel:${a.whatsapp}`,
      renk: "bg-brand-800",
    },
    {
      icon: <WhatsAppIcon className="h-6 w-6" />,
      baslik: "WhatsApp",
      deger: "Mesaj gönder",
      href: whatsappLink("Merhaba, bilgi almak istiyorum.", a.whatsapp),
      renk: "bg-green-600",
    },
    {
      icon: <InstagramIcon className="h-6 w-6" />,
      baslik: "Instagram",
      deger: "Takip et",
      href: a.instagram,
      renk: "bg-pink-600",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="font-semibold text-accent-600">{c.altBaslik}</p>
      <h1 className="mt-1 text-3xl font-bold text-brand-800">{c.baslik}</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {iletisimKartlari.map((k) => (
          <a
            key={k.baslik}
            href={k.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${k.renk}`}>
              {k.icon}
            </span>
            <div>
              <div className="font-semibold text-brand-800">{k.baslik}</div>
              <div className="text-sm text-brand-500">{k.deger}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand-800">Bilgiler</h2>
          <ul className="space-y-3 text-brand-600">
            <li className="flex items-start gap-3">
              <LocationIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
              <span>{a.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 shrink-0 text-accent-600" />
              <span>{a.phone}</span>
            </li>
            <li className="text-sm text-brand-400">{a.calismaSaatleri}</li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100 shadow-sm">
          <iframe
            src={c.haritaEmbed}
            className="h-full min-h-[260px] w-full"
            loading="lazy"
            title="Harita"
          />
        </div>
      </div>
    </div>
  );
}
