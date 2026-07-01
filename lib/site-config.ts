/*
  Site geneli ayarlar ve iletişim bilgileri.
  GEÇİCİ değerlerdir — ileride bunlar admin panelden düzenlenebilir hale gelecek.
  WhatsApp/telefon numarasını uluslararası formatta (başında 90, boşluksuz) yaz.
*/
export const siteConfig = {
  brandName: "AA Emlak",
  tagline: "Bodrum'da hayalinizdeki eve bir adım daha yakın",
  siteUrl: "https://aaemlak.com",
  danismanAdi: "Ahmet Avcı",
  danismanUnvan: "Gayrimenkul Danışmanı",
  danismanFoto: "/poz.jpeg",

  // İletişim — bunları Ahmet Avcı'nın gerçek bilgileriyle değiştir
  phone: "+90 532 454 02 48",
  phoneRaw: "905324540248", // tel: ve wa.me linkleri için boşluksuz hali
  whatsappRaw: "905324540248",
  instagram: "https://instagram.com/aaemlak",
  email: "iletisim@aaemlak.com",

  address: "Bodrum / Muğla",
} as const;

/** wa.me linki üretir; opsiyonel hazır mesaj metni ekler. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
