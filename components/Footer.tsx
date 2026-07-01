import Link from "next/link";
import { getAyarlar } from "@/lib/ayarlar";
import LogoMark from "./LogoMark";
import { InstagramIcon, WhatsAppIcon, PhoneIcon, LocationIcon } from "./icons";

export default async function Footer() {
  const a = await getAyarlar();
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <LogoMark className="mb-3 h-16 w-auto text-white" />
          <p className="text-sm text-brand-300">{a.tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Hızlı Bağlantılar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ilanlar" className="transition hover:text-accent-400">Tüm İlanlar</Link></li>
            <li><Link href="/hakkimda" className="transition hover:text-accent-400">Hakkımda</Link></li>
            <li><Link href="/iletisim" className="transition hover:text-accent-400">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">İletişim</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${a.whatsapp}`} className="flex items-center gap-2 transition hover:text-accent-400">
                <PhoneIcon className="h-4 w-4" /> {a.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 shrink-0" /> {a.address}
            </li>
            <li className="flex items-center gap-3 pt-1">
              <a href={a.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-accent-400">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={`https://wa.me/${a.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition hover:text-accent-400">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-4 text-center text-xs text-brand-400">
        © {new Date().getFullYear()} {a.brandName}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
