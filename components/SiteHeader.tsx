"use client";

import Link from "next/link";
import { useState } from "react";
import { whatsappLink } from "@/lib/site-config";
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

// Instagram'ın kendi marka gradyanı
const instaGradient = "bg-[linear-gradient(45deg,#feda75,#d62976,#4f5bd5)]";

export default function SiteHeader({
  brandName,
  whatsapp,
  instagram,
}: {
  brandName: string;
  whatsapp: string;
  instagram: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Link href="/" aria-label={brandName}>
          <Logo className="h-12 w-auto text-brand-900 md:h-16" />
        </Link>

        {/* Masaüstü: menü + iletişim butonları */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-1">
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
          <div className="flex items-center gap-2">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-medium text-white transition hover:opacity-90 ${instaGradient}`}
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="hidden lg:inline">Instagram</span>
            </a>
            <a
              href={whatsappLink("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.", whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-2 font-medium text-white transition hover:bg-green-500"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${whatsapp}`}
              aria-label="Ara"
              className="flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-2 font-medium text-brand-900 transition hover:bg-accent-400"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden lg:inline">Ara</span>
            </a>
          </div>
        </div>

        {/* Mobil: Instagram / WhatsApp / Ara + menü */}
        <div className="flex items-center gap-1.5 md:hidden">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`rounded-full p-2 text-white ${instaGradient}`}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={whatsappLink("Merhaba, ilanlarınız hakkında bilgi almak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-full bg-green-600 p-2 text-white transition hover:bg-green-500"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a
            href={`tel:${whatsapp}`}
            aria-label="Ara"
            className="rounded-full bg-accent-500 p-2 text-brand-900 transition hover:bg-accent-400"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-brand-800 hover:bg-brand-50"
            aria-label="Menü"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
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
    </header>
  );
}
