import { getAyarlar } from "@/lib/ayarlar";
import IcerikForm from "@/components/admin/IcerikForm";

export default async function IcerikPage() {
  const ayarlar = await getAyarlar();
  return <IcerikForm baslangic={ayarlar} />;
}
