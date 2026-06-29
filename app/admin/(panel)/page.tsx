import Link from "next/link";
import { tipEtiketleri } from "@/lib/listings";
import { tumIlanlar } from "@/lib/ilanlar-db";
import { PlusIcon, ListIcon, FileIcon, SettingsIcon } from "@/components/icons";

export default async function AdminDashboard() {
  const ilanlar = await tumIlanlar();
  const toplam = ilanlar.length;
  const satilik = ilanlar.filter((i) => i.tip === "satilik").length;
  const kiralik = ilanlar.filter((i) => i.tip === "kiralik").length;
  const aktif = ilanlar.filter((i) => i.durum === "aktif").length;

  const istatistik = [
    { etiket: "Toplam İlan", deger: toplam, renk: "text-brand-800" },
    { etiket: "Aktif İlan", deger: aktif, renk: "text-green-600" },
    { etiket: "Satılık", deger: satilik, renk: "text-brand-600" },
    { etiket: "Kiralık", deger: kiralik, renk: "text-accent-600" },
  ];

  const hizliIslem = [
    { href: "/admin/ilanlar/yeni", label: "Yeni İlan Ekle", icon: PlusIcon },
    { href: "/admin/ilanlar", label: "İlanları Yönet", icon: ListIcon },
    { href: "/admin/icerik", label: "Sayfaları Düzenle", icon: FileIcon },
    { href: "/admin/ayarlar", label: "İletişim Bilgileri", icon: SettingsIcon },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-800">Hoş geldiniz 👋</h1>
      <p className="mt-1 text-brand-500">Bugün ne yapmak istersiniz?</p>

      {/* İstatistik kartları */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {istatistik.map((s) => (
          <div key={s.etiket} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className={`text-3xl font-bold ${s.renk}`}>{s.deger}</div>
            <div className="mt-1 text-sm text-brand-500">{s.etiket}</div>
          </div>
        ))}
      </div>

      {/* Hızlı işlemler */}
      <h2 className="mb-3 mt-8 font-bold text-brand-800">Hızlı İşlemler</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {hizliIslem.map((h) => {
          const Icon = h.icon;
          return (
            <Link
              key={h.href}
              href={h.href}
              className="flex flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-accent-400 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-brand-800">{h.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Son ilanlar */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-bold text-brand-800">Son Eklenen İlanlar</h2>
        <Link href="/admin/ilanlar" className="text-sm font-semibold text-accent-600 hover:text-accent-500">
          Tümünü gör →
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
        {ilanlar.slice(0, 4).map((ilan) => (
          <Link
            key={ilan.id}
            href={`/admin/ilanlar/${ilan.id}/duzenle`}
            className="flex items-center justify-between border-b border-brand-50 px-5 py-3 transition last:border-b-0 hover:bg-brand-50"
          >
            <div className="min-w-0">
              <div className="truncate font-medium text-brand-800">{ilan.baslik}</div>
              <div className="text-xs text-brand-400">
                {ilan.ilce}, {ilan.il} • {tipEtiketleri[ilan.tip]}
              </div>
            </div>
            <span className="ml-3 shrink-0 text-sm font-semibold text-accent-600">Düzenle</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
