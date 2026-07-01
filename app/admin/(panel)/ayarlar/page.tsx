import { getAyarlar } from "@/lib/ayarlar";
import AyarlarForm from "@/components/admin/AyarlarForm";

export default async function AyarlarPage() {
  const ayarlar = await getAyarlar();
  return <AyarlarForm baslangic={ayarlar} />;
}
