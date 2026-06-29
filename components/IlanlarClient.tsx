"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  type Ilan,
  type IlanTipi,
  type Kategori,
  kategoriEtiketleri,
} from "@/lib/listings";
import IlanKart from "./IlanKart";
import { SearchIcon } from "./icons";

const ODA_SECENEKLERI = ["1+1", "2+1", "3+1", "4+1", "5+1"];

export default function IlanlarClient({ ilanlar }: { ilanlar: Ilan[] }) {
  const params = useSearchParams();

  const [tip, setTip] = useState<IlanTipi | "">((params.get("tip") as IlanTipi) || "");
  const [kategori, setKategori] = useState<Kategori | "">(
    (params.get("kategori") as Kategori) || ""
  );
  const [minFiyat, setMinFiyat] = useState("");
  const [maxFiyat, setMaxFiyat] = useState("");
  const [oda, setOda] = useState("");
  const [maxYas, setMaxYas] = useState("");
  const [konum, setKonum] = useState(params.get("konum") || "");
  const [siralama, setSiralama] = useState<"yeni" | "ucuz" | "pahali">("yeni");

  // Bir ilanın filtrelere uyup uymadığı; "haric" verilen filtreyi atlar
  // (böylece o filtrenin seçenek dağarcığını diğerlerine göre hesaplayabiliriz).
  const gecer = (i: Ilan, haric: string): boolean => {
    if (haric !== "tip" && tip && i.tip !== tip) return false;
    if (haric !== "kategori" && kategori && i.kategori !== kategori) return false;
    if (haric !== "fiyat" && minFiyat && i.fiyat < Number(minFiyat)) return false;
    if (haric !== "fiyat" && maxFiyat && i.fiyat > Number(maxFiyat)) return false;
    if (haric !== "oda" && oda && i.odaSayisi !== oda) return false;
    if (haric !== "yas" && maxYas && (i.binaYasi === undefined || i.binaYasi > Number(maxYas)))
      return false;
    if (haric !== "konum" && konum) {
      const q = konum.toLocaleLowerCase("tr");
      const yer = `${i.il} ${i.ilce} ${i.mahalle}`.toLocaleLowerCase("tr");
      if (!yer.includes(q)) return false;
    }
    return true;
  };

  const sonuclar = useMemo(() => {
    const list = ilanlar.filter((i) => gecer(i, ""));
    return [...list].sort((a, b) => {
      if (siralama === "ucuz") return a.fiyat - b.fiyat;
      if (siralama === "pahali") return b.fiyat - a.fiyat;
      return b.olusturmaTarihi.localeCompare(a.olusturmaTarihi);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tip, kategori, minFiyat, maxFiyat, oda, maxYas, konum, siralama]);

  // Diğer filtrelere göre uygun seçenekler (faceted daraltma)
  const mevcutTip = useMemo(
    () => (["satilik", "kiralik"] as IlanTipi[]).filter((t) =>
      ilanlar.some((i) => i.tip === t && gecer(i, "tip"))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [kategori, minFiyat, maxFiyat, oda, maxYas, konum]
  );
  const mevcutKategori = useMemo(
    () => (Object.keys(kategoriEtiketleri) as Kategori[]).filter((k) =>
      ilanlar.some((i) => i.kategori === k && gecer(i, "kategori"))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tip, minFiyat, maxFiyat, oda, maxYas, konum]
  );
  const mevcutOda = useMemo(
    () => ODA_SECENEKLERI.filter((o) =>
      ilanlar.some((i) => i.odaSayisi === o && gecer(i, "oda"))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tip, kategori, minFiyat, maxFiyat, maxYas, konum]
  );

  const filtreleriTemizle = () => {
    setTip("");
    setKategori("");
    setMinFiyat("");
    setMaxFiyat("");
    setOda("");
    setMaxYas("");
    setKonum("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-brand-800">İlanlar</h1>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filtre paneli */}
        <aside className="h-fit rounded-2xl border border-brand-100 bg-white p-5 shadow-sm lg:sticky lg:top-32">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-brand-800">Filtrele</h2>
            <button
              onClick={filtreleriTemizle}
              className="text-sm text-accent-600 hover:text-accent-500"
            >
              Temizle
            </button>
          </div>

          <div className="space-y-4">
            <Field label="Konum">
              <input
                type="text"
                placeholder="İl, ilçe veya mahalle"
                value={konum}
                onChange={(e) => setKonum(e.target.value)}
                className="filtre-input"
              />
            </Field>

            <Field label="İlan Tipi">
              <select
                value={tip}
                onChange={(e) => setTip(e.target.value as IlanTipi | "")}
                className="filtre-input"
              >
                <option value="">Tümü</option>
                <option value="satilik" disabled={!mevcutTip.includes("satilik")}>Satılık</option>
                <option value="kiralik" disabled={!mevcutTip.includes("kiralik")}>Kiralık</option>
              </select>
            </Field>

            <Field label="Kategori">
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as Kategori | "")}
                className="filtre-input"
              >
                <option value="">Tümü</option>
                {(Object.keys(kategoriEtiketleri) as Kategori[]).map((k) => (
                  <option key={k} value={k} disabled={!mevcutKategori.includes(k)}>
                    {kategoriEtiketleri[k]}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Fiyat Aralığı (₺)">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="En az"
                  value={minFiyat}
                  onChange={(e) => setMinFiyat(e.target.value)}
                  className="filtre-input"
                />
                <input
                  type="number"
                  placeholder="En çok"
                  value={maxFiyat}
                  onChange={(e) => setMaxFiyat(e.target.value)}
                  className="filtre-input"
                />
              </div>
            </Field>

            <Field label="Oda Sayısı">
              <select
                value={oda}
                onChange={(e) => setOda(e.target.value)}
                className="filtre-input"
              >
                <option value="">Farketmez</option>
                {ODA_SECENEKLERI.map((o) => (
                  <option key={o} value={o} disabled={!mevcutOda.includes(o)}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Maksimum Bina Yaşı">
              <input
                type="number"
                placeholder="örn. 10"
                value={maxYas}
                onChange={(e) => setMaxYas(e.target.value)}
                className="filtre-input"
              />
            </Field>
          </div>
        </aside>

        {/* Sonuçlar */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-brand-500">
              <span className="font-semibold text-brand-800">{sonuclar.length}</span> ilan
              bulundu
            </p>
            <select
              value={siralama}
              onChange={(e) => setSiralama(e.target.value as typeof siralama)}
              className="rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm"
            >
              <option value="yeni">En Yeni</option>
              <option value="ucuz">Fiyat (Artan)</option>
              <option value="pahali">Fiyat (Azalan)</option>
            </select>
          </div>

          {sonuclar.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 py-20 text-center">
              <SearchIcon className="mb-3 h-10 w-10 text-brand-300" />
              <p className="font-semibold text-brand-700">Sonuç bulunamadı</p>
              <p className="text-sm text-brand-400">Filtreleri değiştirmeyi deneyin.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sonuclar.map((ilan) => (
                <IlanKart key={ilan.id} ilan={ilan} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-700">{label}</label>
      {children}
    </div>
  );
}
