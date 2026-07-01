import { whatsappLink } from "@/lib/site-config";
import { getAyarlar } from "@/lib/ayarlar";
import { WhatsAppIcon, PhoneIcon } from "./icons";

/*
  Ekranda yüzen, kaydırınca sabit kalan WhatsApp ve Ara balonları.
  Her sayfada görünür; üzerine gelince etiket açılır.
*/
export default async function FloatingContact() {
  const a = await getAyarlar();
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={whatsappLink("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.", a.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:w-auto hover:gap-2 hover:px-5 hover:bg-green-500"
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0" />
        <span className="hidden whitespace-nowrap font-semibold group-hover:inline">
          WhatsApp
        </span>
      </a>
      <a
        href={`tel:${a.whatsapp}`}
        aria-label="Ara"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white shadow-lg transition hover:w-auto hover:gap-2 hover:px-5 hover:bg-brand-700"
      >
        <PhoneIcon className="h-6 w-6 shrink-0" />
        <span className="hidden whitespace-nowrap font-semibold group-hover:inline">
          Hemen Ara
        </span>
      </a>
    </div>
  );
}
