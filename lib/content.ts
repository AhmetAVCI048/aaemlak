/*
  Hakkımda ve İletişim sayfalarının düzenlenebilir içerikleri.
  Şimdilik buradan yönetiliyor; admin panel bağlandığında bu metinler
  veritabanından gelecek ve kuzenin panelden düzenleyebilecek.
*/
export const hakkimdaContent = {
  baslik: "Hakkımda",
  altBaslik: "Güvenilir emlak danışmanlığı",
  paragraflar: [
    "Yılların verdiği tecrübeyle, alıcı ve satıcıyı en doğru şekilde buluşturuyorum. Amacım sadece bir mülk satmak değil; sizin için en doğru kararı vermenize yardımcı olmak.",
    "Bölgedeki gayrimenkul piyasasına hâkimiyetim sayesinde, hem yatırımlık hem de oturum amaçlı en uygun seçenekleri sizin için titizlikle seçiyorum.",
    "Şeffaflık, dürüstlük ve müşteri memnuniyeti çalışma prensiplerimin temelidir. Her aşamada yanınızdayım.",
  ],
  istatistikler: [
    { sayi: "10+", etiket: "Yıllık Tecrübe" },
    { sayi: "500+", etiket: "Mutlu Müşteri" },
    { sayi: "300+", etiket: "Tamamlanan Satış" },
  ],
};

export const iletisimContent = {
  baslik: "İletişim",
  altBaslik: "Bize ulaşın, size yardımcı olalım",
  calismaSaatleri: "Pazartesi - Cumartesi: 09:00 - 19:00",
  // İleride harita için: Google Maps embed linki buraya
  haritaEmbed:
    "https://www.google.com/maps?q=Izmir&output=embed",
};
