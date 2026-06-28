"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import {
  DashboardIcon,
  ListIcon,
  PlusIcon,
  FileIcon,
  SettingsIcon,
  LogoutIcon,
  EyeIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

const menu = [
  { href: "/admin", label: "Panel", icon: DashboardIcon, exact: true },
  { href: "/admin/ilanlar", label: "İlanlarım", icon: ListIcon },
  { href: "/admin/ilanlar/yeni", label: "Yeni İlan Ekle", icon: PlusIcon },
  { href: "/admin/icerik", label: "Sayfa İçerikleri", icon: FileIcon },
  { href: "/admin/ayarlar", label: "İletişim Bilgileri", icon: SettingsIcon },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const aktifMi = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Mobil üst bar */}
      <div className="flex items-center justify-between border-b border-brand-100 bg-white px-4 py-3 lg:hidden">
        <span className="font-bold text-brand-800">Yönetim Paneli</span>
        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 text-brand-800 hover:bg-brand-50">
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sol menü */}
        <aside
          className={`${
            open ? "block" : "hidden"
          } fixed inset-x-0 top-[57px] z-40 border-b border-brand-100 bg-brand-900 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0`}
        >
          <div className="flex h-full flex-col p-4">
            <div className="mb-6 hidden items-center gap-3 px-2 pt-2 lg:flex">
              <Logo className="h-12 w-auto text-white" />
              <div className="text-xs font-medium text-brand-400">Yönetim Paneli</div>
            </div>

            <nav className="space-y-1">
              {menu.map((m) => {
                const Icon = m.icon;
                const active = aktifMi(m.href, m.exact);
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-accent-500 text-brand-900"
                        : "text-brand-200 hover:bg-brand-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {m.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-1 border-t border-brand-800 pt-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-200 transition hover:bg-brand-800 hover:text-white"
              >
                <EyeIcon className="h-5 w-5 shrink-0" />
                Siteyi Görüntüle
              </Link>
              <Link
                href="/admin/giris"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-950/40 hover:text-red-200"
              >
                <LogoutIcon className="h-5 w-5 shrink-0" />
                Çıkış Yap
              </Link>
            </div>
          </div>
        </aside>

        {/* İçerik */}
        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
