"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import Logo from "./Logo";
import {
  WhatsAppIcon,
  PhoneIcon,
  InstagramIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilanlar", label: "İlanlar" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Üst yardımcı bar — Instagram / WhatsApp / Ara (madde 3) */}
      <div className="bg-brand-900 text-brand-100 text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="hidden items-center gap-2 transition hover:text-accent-400 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span>{siteConfig.phone}</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href={whatsappLink("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 font-medium text-white transition hover:bg-green-500"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1.5 font-medium text-brand-900 transition hover:bg-accent-400"
              aria-label="Ara"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Ara</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ana navigasyon */}
      <div className="border-b border-brand-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.brandName}>
            <Logo className="h-12 w-auto text-brand-900" />
          </Link>

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 font-medium text-brand-700 transition hover:bg-brand-50 hover:text-brand-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobil menü butonu */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-brand-800 hover:bg-brand-50 md:hidden"
            aria-label="Menü"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobil açılır menü */}
        {menuOpen && (
          <nav className="border-t border-brand-100 bg-white px-4 py-2 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-3 font-medium text-brand-700 transition hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
