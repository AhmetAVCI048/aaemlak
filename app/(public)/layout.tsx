import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

/* Herkese açık site düzeni — başlık + altbilgi burada. Admin bunları görmez. */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
