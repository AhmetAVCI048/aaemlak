/*
  İlan veri modeli ve örnek (sahte) veriler.
  Şu an veriler bu dosyada sabit duruyor; 8. adımda Supabase'e taşıyacağız.
  Böylece üyelikler açılmadan tüm arayüzü kurup test edebiliyoruz.
*/

export type IlanTipi = "satilik" | "kiralik";
export type Kategori = "konut" | "isyeri" | "arsa" | "gunluk";
export type IlanDurumu = "aktif" | "rezerve" | "satildi";

export interface Ilan {
  id: string;
  baslik: string;
  aciklama: string;
  fiyat: number; // TL
  tip: IlanTipi;
  kategori: Kategori;
  altKategori?: string; // örn. "Daire", "Villa", "Müstakil Ev"
  durum: IlanDurumu;
  rozetler: string[]; // örn. ["Acil", "Fırsat"]

  // Konum
  il: string;
  ilce: string;
  mahalle: string;

  // Özellikler (konut için; diğer kategorilerde bazıları boş olabilir)
  odaSayisi?: string; // "3+1"
  banyoSayisi?: number;
  brutMetrekare?: number;
  netMetrekare?: number;
  binaYasi?: number;
  bulunduguKat?: string;
  katSayisi?: number;
  isitma?: string;
  aidat?: number;
  esyali?: boolean;
  krediyeUygun?: boolean;

  // Detaylı özellikler (çoklu seçim listeleri)
  cephe?: string[];
  icOzellikler?: string[];
  disOzellikler?: string[];
  manzara?: string[];

  gorseller: string[]; // ilk görsel kapak fotoğrafıdır
  video?: string; // tanıtım videosu (URL)

  // Konum — harita pini ve yol tarifi için (madde 4)
  enlem?: number; // latitude
  boylam?: number; // longitude

  olusturmaTarihi: string; // ISO tarih
}

export const ornekIlanlar: Ilan[] = [
  {
    id: "1",
    baslik: "Deniz Manzaralı Lüks 3+1 Daire",
    aciklama:
      "Sahile yürüme mesafesinde, full deniz manzaralı, sıfır binada lüks daire. Geniş balkon, ankastre mutfak ve kapalı otopark mevcuttur. Site içerisinde 7/24 güvenlik, yüzme havuzu ve fitness salonu bulunmaktadır.",
    fiyat: 8500000,
    tip: "satilik",
    kategori: "konut",
    altKategori: "Daire",
    durum: "aktif",
    rozetler: ["Fırsat"],
    il: "İzmir",
    ilce: "Karşıyaka",
    mahalle: "Bostanlı",
    odaSayisi: "3+1",
    banyoSayisi: 2,
    brutMetrekare: 145,
    netMetrekare: 130,
    binaYasi: 0,
    bulunduguKat: "5. Kat",
    katSayisi: 8,
    isitma: "Doğalgaz (Kombi)",
    aidat: 1500,
    esyali: false,
    krediyeUygun: true,
    cephe: ["Güney", "Batı"],
    icOzellikler: ["Ankastre Mutfak", "Klima", "Ebeveyn Banyosu", "Çelik Kapı", "Balkon"],
    disOzellikler: ["Asansör", "Kapalı Otopark", "Güvenlik", "Açık Yüzme Havuzu"],
    manzara: ["Deniz"],
    gorseller: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80",
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    enlem: 38.4569,
    boylam: 27.095,
    olusturmaTarihi: "2026-06-20",
  },
  {
    id: "2",
    baslik: "Merkezde Kiralık Ferah 2+1",
    aciklama:
      "Şehir merkezinde, metroya 3 dakika yürüme mesafesinde, aydınlık ve ferah 2+1 daire. Yeni boyalı, kullanıma hazır. Çevresinde okul, hastane ve alışveriş merkezi bulunmaktadır.",
    fiyat: 22000,
    tip: "kiralik",
    kategori: "konut",
    durum: "aktif",
    rozetler: ["Acil"],
    il: "İzmir",
    ilce: "Konak",
    mahalle: "Alsancak",
    odaSayisi: "2+1",
    brutMetrekare: 95,
    netMetrekare: 85,
    binaYasi: 8,
    bulunduguKat: "3. Kat",
    katSayisi: 5,
    isitma: "Merkezi (Pay Ölçer)",
    aidat: 750,
    esyali: true,
    krediyeUygun: false,
    gorseller: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    ],
    enlem: 38.4365,
    boylam: 27.1428,
    olusturmaTarihi: "2026-06-22",
  },
  {
    id: "3",
    baslik: "Yatırımlık Sıfır 1+1 Stüdyo Daire",
    aciklama:
      "Üniversiteye yakın, yüksek kira getirili, yatırımlık sıfır stüdyo daire. Akıllı ev sistemleri ve ankastre beyaz eşya dahildir.",
    fiyat: 3200000,
    tip: "satilik",
    kategori: "konut",
    durum: "rezerve",
    rozetler: [],
    il: "İzmir",
    ilce: "Buca",
    mahalle: "Tınaztepe",
    odaSayisi: "1+1",
    brutMetrekare: 60,
    netMetrekare: 52,
    binaYasi: 0,
    bulunduguKat: "2. Kat",
    katSayisi: 6,
    isitma: "Doğalgaz (Kombi)",
    aidat: 600,
    esyali: false,
    krediyeUygun: true,
    gorseller: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
    olusturmaTarihi: "2026-06-18",
  },
  {
    id: "4",
    baslik: "Cadde Üzeri Devren Kiralık Dükkan",
    aciklama:
      "İşlek cadde üzerinde, yüksek vitrinli, her türlü ticari faaliyete uygun dükkan. Yoğun yaya trafiği mevcuttur.",
    fiyat: 45000,
    tip: "kiralik",
    kategori: "isyeri",
    durum: "aktif",
    rozetler: [],
    il: "İzmir",
    ilce: "Bornova",
    mahalle: "Merkez",
    brutMetrekare: 80,
    netMetrekare: 75,
    binaYasi: 12,
    bulunduguKat: "Zemin",
    isitma: "Klima",
    krediyeUygun: false,
    gorseller: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    ],
    olusturmaTarihi: "2026-06-15",
  },
  {
    id: "5",
    baslik: "İmarlı Satılık Arsa",
    aciklama:
      "Konut imarlı, yola cepheli, müstakil tapulu satılık arsa. Yatırım için ideal konumda.",
    fiyat: 5750000,
    tip: "satilik",
    kategori: "arsa",
    durum: "aktif",
    rozetler: ["Fırsat"],
    il: "İzmir",
    ilce: "Urla",
    mahalle: "Zeytinalanı",
    brutMetrekare: 500,
    krediyeUygun: true,
    gorseller: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    ],
    olusturmaTarihi: "2026-06-10",
  },
  {
    id: "6",
    baslik: "Bahçeli Müstakil 4+1 Villa",
    aciklama:
      "Doğayla iç içe, özel bahçeli, çift garajlı müstakil villa. Şömineli salon, ebeveyn banyolu yatak odası ve geniş teras mevcuttur.",
    fiyat: 14500000,
    tip: "satilik",
    kategori: "konut",
    durum: "aktif",
    rozetler: [],
    il: "İzmir",
    ilce: "Çeşme",
    mahalle: "Alaçatı",
    odaSayisi: "4+1",
    brutMetrekare: 240,
    netMetrekare: 210,
    binaYasi: 3,
    bulunduguKat: "Müstakil",
    katSayisi: 2,
    isitma: "Yerden Isıtma",
    aidat: 0,
    esyali: false,
    krediyeUygun: true,
    gorseller: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    ],
    enlem: 38.281,
    boylam: 26.376,
    olusturmaTarihi: "2026-06-25",
  },
];

/** Para birimini Türk Lirası formatında gösterir: 8500000 -> "8.500.000 ₺" */
export function fiyatFormatla(fiyat: number): string {
  return new Intl.NumberFormat("tr-TR").format(fiyat) + " ₺";
}

export function ilanGetir(id: string): Ilan | undefined {
  return ornekIlanlar.find((i) => i.id === id);
}

export const kategoriEtiketleri: Record<Kategori, string> = {
  konut: "Konut",
  isyeri: "İş Yeri",
  arsa: "Arsa",
  gunluk: "Günlük Kiralık",
};

export const tipEtiketleri: Record<IlanTipi, string> = {
  satilik: "Satılık",
  kiralik: "Kiralık",
};
