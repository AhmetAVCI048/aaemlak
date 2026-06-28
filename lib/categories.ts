/*
  Adımlı kategori ağacı (sahibinden tarzı) ve detaylı özellik seçenekleri.
  Admin formundaki kategori seçimi ve özellik kutuları buradan beslenir.
*/
import type { Kategori } from "./listings";

// Kategori → o kategorinin alt türleri (Daire, Villa, Müstakil Ev...)
export const kategoriAgaci: Record<Kategori, { label: string; turler: string[] }> = {
  konut: {
    label: "Konut",
    turler: [
      "Daire",
      "Rezidans",
      "Müstakil Ev",
      "Villa",
      "Yazlık",
      "Çiftlik Evi",
      "Köşk & Konak",
      "Yalı",
      "Yalı Dairesi",
      "Dağ Evi",
    ],
  },
  isyeri: {
    label: "İş Yeri",
    turler: [
      "Dükkan & Mağaza",
      "Ofis",
      "Plaza Ofis",
      "Depo & Antrepo",
      "Atölye",
      "Kafe & Bar",
      "Restoran",
      "Komple Bina",
    ],
  },
  arsa: {
    label: "Arsa",
    turler: [
      "Konut İmarlı",
      "Ticari İmarlı",
      "Villa İmarlı",
      "Tarla",
      "Bağ & Bahçe",
      "Zeytinlik",
    ],
  },
  gunluk: {
    label: "Günlük Kiralık",
    turler: ["Daire", "Villa", "Yazlık", "Apart & Pansiyon", "Bungalov"],
  },
};

// Detaylı özellik kutuları (çoklu seçim)
export const cepheSecenekleri = ["Batı", "Doğu", "Güney", "Kuzey"];

export const icOzellikSecenekleri = [
  "Ankastre Mutfak",
  "Akıllı Ev",
  "Alarm (Hırsız)",
  "Amerikan Kapı",
  "Balkon",
  "Barbekü",
  "Beyaz Eşya",
  "Boyalı",
  "Bulaşık Makinesi",
  "Çamaşır Odası",
  "Çelik Kapı",
  "Duşakabin",
  "Ebeveyn Banyosu",
  "Fiber İnternet",
  "Giyinme Odası",
  "Gömme Dolap",
  "Görüntülü Diyafon",
  "Isıcam",
  "Jakuzi",
  "Kiler",
  "Klima",
  "Küvet",
  "Laminat Zemin",
  "Mobilyalı",
  "Parke Zemin",
  "Seramik Zemin",
  "Set Üstü Ocak",
  "Şömine",
  "Teras",
  "Vestiyer",
  "Yüz Tanıma & Parmak İzi",
];

export const disOzellikSecenekleri = [
  "Asansör",
  "Açık Otopark",
  "Kapalı Otopark",
  "Bahçe",
  "Açık Yüzme Havuzu",
  "Kapalı Yüzme Havuzu",
  "Çocuk Oyun Parkı",
  "Güvenlik",
  "Jeneratör",
  "Kapıcı",
  "Spor Salonu",
  "Sauna",
  "Tenis Kortu",
  "Site İçerisinde",
  "Yangın Merdiveni",
];

export const manzaraSecenekleri = [
  "Deniz",
  "Doğa",
  "Şehir",
  "Göl",
  "Boğaz",
  "Park & Yeşil Alan",
];
