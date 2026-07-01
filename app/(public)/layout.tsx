import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getAyarlar } from "@/lib/ayarlar";

/* Herkese açık site düzeni — başlık + altbilgi burada. Admin bunları görmez. */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ayarlar = await getAyarlar();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        brandName={ayarlar.brandName}
        whatsapp={ayarlar.whatsapp}
        instagram={ayarlar.instagram}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
